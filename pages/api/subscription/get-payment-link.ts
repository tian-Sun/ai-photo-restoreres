import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email || !session.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const basePaymentLink = process.env.DODO_PRO_PLAN_PAYMENT_LINK;
    if (!basePaymentLink) {
      return res.status(500).json({ error: 'Payment link is not configured on the server.' });
    }

    const paymentLinkWithParams = new URL(basePaymentLink);
    paymentLinkWithParams.searchParams.set('email', session.user.email);
    paymentLinkWithParams.searchParams.set('metadata_userId', session.user.id);
    paymentLinkWithParams.searchParams.set('redirect_url', `${req.headers.origin || 'http://localhost:3000'}/payment-success`);

    return res.status(200).json({ url: paymentLinkWithParams.toString() });

  } catch (error: any) {
    console.error('Get payment link error:', error);
    return res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
}