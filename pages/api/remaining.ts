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
  const key = `user_daily_usage:${identifier}:${bucket}`;

  // 获取当前使用量
  const currentUsage = Number(await redis?.get(key)) || 0;
  console.log('===== Usage Debug Info =====');
  console.log('User:', identifier);
  console.log('Current Time Bucket:', bucket);
  console.log('Redis Key:', key);
  console.log('Current Usage:', currentUsage);

  // 计算剩余次数（最大2次）
  const remainingGenerations = Math.max(0, 2 - currentUsage);
  console.log('Remaining Generations:', remainingGenerations);

  // 计算到下一个重置时间的剩余时间
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const diff = tomorrow.getTime() - Date.now();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  console.log('Time until reset:', `${hours}h ${minutes}m`);
  console.log('========================');

  return res.status(200).json({ remainingGenerations, hours, minutes });
}
