import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

interface WebhookEvent {
  id: string;
  type: string;
  data: {
    order_id: string;
    payment_id: string;
    status: string;
    amount: number;
    currency: string;
    created_at: string;
    [key: string]: any;
  };
  created_at: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔔 Webhook received:', {
      method: req.method,
      headers: req.headers,
      body: req.body,
      timestamp: new Date().toISOString()
    });

    // 验证webhook签名
    const signature = req.headers['x-dodo-signature'] as string;
    const webhookSecret = process.env.DODO_WEBHOOK_SECRET;
    
    if (!signature || !webhookSecret) {
      console.error('❌ Missing signature or webhook secret');
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    // 验证签名
    const payload = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('❌ Invalid webhook signature');
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const event: WebhookEvent = req.body;
    console.log('✅ Webhook signature verified, processing event:', event.type);

    // 根据事件类型处理
    switch (event.type) {
      case 'payment.succeeded':
        await handlePaymentSucceeded(event);
        break;
      
      case 'payment.failed':
        await handlePaymentFailed(event);
        break;
      
      case 'subscription.created':
        await handleSubscriptionCreated(event);
        break;
      
      case 'subscription.updated':
        await handleSubscriptionUpdated(event);
        break;
      
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(event);
        break;
      
      default:
        console.log('⚠️ Unknown event type:', event.type);
    }

    // 返回成功响应
    res.status(200).json({ received: true });

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

// 处理支付成功
async function handlePaymentSucceeded(event: WebhookEvent) {
  console.log('💰 Payment succeeded:', event.data);
  
  // TODO: 更新用户订阅状态
  // TODO: 增加用户使用次数
  // TODO: 发送确认邮件
}

// 处理支付失败
async function handlePaymentFailed(event: WebhookEvent) {
  console.log('❌ Payment failed:', event.data);
  
  // TODO: 更新支付状态
  // TODO: 发送失败通知
}

// 处理订阅创建
async function handleSubscriptionCreated(event: WebhookEvent) {
  console.log('📅 Subscription created:', event.data);
  
  // TODO: 创建订阅记录
  // TODO: 更新用户权限
}

// 处理订阅更新
async function handleSubscriptionUpdated(event: WebhookEvent) {
  console.log('🔄 Subscription updated:', event.data);
  
  // TODO: 更新订阅信息
}

// 处理订阅取消
async function handleSubscriptionCancelled(event: WebhookEvent) {
  console.log('🚫 Subscription cancelled:', event.data);
  
  // TODO: 取消订阅
  // TODO: 降级用户权限
} 