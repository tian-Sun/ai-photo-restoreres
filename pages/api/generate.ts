import { Ratelimit } from '@upstash/ratelimit';
import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../utils/redis';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

interface ResponseData {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

// Create a new ratelimiter, that allows 2 requests per day
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(2, '24 h'),
      analytics: true,
      prefix: '@upstash/ratelimit',
      ephemeralCache: false
    })
  : undefined;

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log('API Request received:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });

  // 设置 CORS 头部
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }

  // 检查 HTTP 方法
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Please use POST.'
    });
  }

  try {
    console.log('Checking session...');
    // Check if user is logged in
    const session = await getServerSession(req, res, authOptions);
    console.log('Session:', session);

    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        error: 'Login to upload.'
      });
    }

    // Rate Limiting by user email
    if (ratelimit) {
      console.log('Checking rate limit for user:', session.user.email);
      const identifier = session.user.email;
      const bucket = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
      
      // 先检查当前使用量
      const currentUsage = await redis?.get(`user_daily_usage:${identifier}:${bucket}`);
      console.log('Current usage:', currentUsage);
      
      if (Number(currentUsage) >= 2) {
        const resetDate = new Date();
        resetDate.setHours(19, 0, 0, 0);
        if (resetDate.getTime() < Date.now()) {
          resetDate.setDate(resetDate.getDate() + 1);
        }
        const diff = Math.abs(resetDate.getTime() - new Date().getTime());
        const hours = Math.floor(diff / 1000 / 60 / 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);

        return res.status(429).json({
          success: false,
          error: `No more generations left for the day.`
        });
      }

      // 增加使用计数
      await redis?.incr(`user_daily_usage:${identifier}:${bucket}`);
      await redis?.expire(`user_daily_usage:${identifier}:${bucket}`, 24 * 60 * 60); // 24小时后过期
      
      const newUsage = await redis?.get(`user_daily_usage:${identifier}:${bucket}`);
      console.log('New usage after increment:', newUsage);
      
      if (Number(newUsage) > 2) {
        return res.status(429).json({
          success: false,
          error: 'No more generations left for the day.'
        });
      }

      const remaining = 2 - Number(newUsage);
      res.setHeader('X-RateLimit-Limit', 2);
      res.setHeader('X-RateLimit-Remaining', remaining);
    }

    // 检查请求体是否包含必要的数据
    if (!req.body || !req.body.imageUrl) {
      return res.status(400).json({
        success: false,
        error: 'Missing imageUrl in request body'
      });
    }

    console.log('Starting image restoration process...');
    const imageUrl = req.body.imageUrl;
    
    if (!process.env.REPLICATE_API_KEY) {
      console.error('REPLICATE_API_KEY is not set');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    // POST request to Replicate to start the image restoration generation process
    console.log('Sending request to Replicate API...');
    let startResponse = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + process.env.REPLICATE_API_KEY,
      },
      body: JSON.stringify({
        version:
          '9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3',
        input: { img: imageUrl, version: 'v1.4', scale: 2 },
      }),
    });

    console.log('Replicate API response status:', startResponse.status);
    let jsonStartResponse = await startResponse.json();
    console.log('Replicate API response:', jsonStartResponse);
    
    if (!startResponse.ok) {
      console.error('Replicate API error:', jsonStartResponse);
      return res.status(500).json({
        success: false,
        error: 'Failed to start image restoration process'
      });
    }

    let endpointUrl = jsonStartResponse.urls.get;

    // GET request to get the status of the image restoration process & return the result when it's ready
    let restoredImage: string | null = null;
    while (!restoredImage) {
      // Loop in 1s intervals until the alt text is ready
      console.log('Polling for result...');
      let finalResponse = await fetch(endpointUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + process.env.REPLICATE_API_KEY,
        },
      });

      console.log('Poll response status:', finalResponse.status);
      if (!finalResponse.ok) {
        console.error('Failed to get restoration status');
        return res.status(500).json({
          success: false,
          error: 'Failed to get restoration status'
        });
      }

      let jsonFinalResponse = await finalResponse.json();
      console.log('Poll response:', jsonFinalResponse);

      if (jsonFinalResponse.status === 'succeeded') {
        restoredImage = jsonFinalResponse.output;
      } else if (jsonFinalResponse.status === 'failed') {
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (!restoredImage) {
      return res.status(500).json({
        success: false,
        error: 'Failed to restore image'
      });
    }

    console.log('Image restoration completed successfully');
    return res.status(200).json({
      success: true,
      data: restoredImage
    });
  } catch (error) {
    console.error('Error in generate API:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
