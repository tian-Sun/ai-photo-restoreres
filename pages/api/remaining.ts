import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../utils/redis';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if user is logged in
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(500).json('Login to upload.');
  }

  // Query the redis database by email to get the number of generations left
  const identifier = session.user.email;
  const bucket = Math.floor(Date.now() / (24 * 60 * 60 * 1000));

  // 获取当前使用量
  const currentUsage = Number(await redis?.get(`@upstash/ratelimit:${identifier}:${bucket}`)) || 0;
  console.log('Current usage for user:', identifier, 'is:', currentUsage);

  // 计算剩余次数（最大2次）
  const remainingGenerations = Math.max(0, 2 - currentUsage);
  console.log('Remaining generations:', remainingGenerations);

  // 计算重置时间
  const resetDate = new Date();
  resetDate.setHours(19, 0, 0, 0);
  if (resetDate.getTime() < Date.now()) {
    resetDate.setDate(resetDate.getDate() + 1);
  }
  const diff = Math.abs(resetDate.getTime() - new Date().getTime());
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  return res.status(200).json({ remainingGenerations, hours, minutes });
}
