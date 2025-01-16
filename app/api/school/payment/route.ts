import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { schoolId, stripeApiKey, razorpayKey } = req.body;

    if (!schoolId) {
      return res.status(400).json({ error: 'School ID is required' });
    }

    const updatedGateway = await prisma.schoolPaymentGateway.upsert({
      where: { schoolId },
      update: { stripeApiKey, razorpayKey },
      create: { schoolId, stripeApiKey, razorpayKey },
    });

    return res.status(200).json(updatedGateway);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
