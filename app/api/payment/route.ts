import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db';
import Razorpay from 'razorpay';
import Stripe from 'stripe';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { schoolId, amount, currency, paymentGateway } = req.body;

  if (!schoolId || !amount || !currency || !paymentGateway) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Fetch API keys for the school
    const gatewayConfig = await prisma.schoolPaymentGateway.findUnique({
      where: { schoolId },
    });

    if (!gatewayConfig) {
      return res.status(404).json({ error: 'Payment gateway not configured for this school' });
    }

    let paymentResponse;

    if (paymentGateway === 'razorpay' && gatewayConfig.razorpayKey) {
      // Razorpay Payment
      const razorpay = new Razorpay({
        key_id: gatewayConfig.razorpayKey,
        key_secret: process.env.RAZORPAY_SECRET, // Store a common secret if needed
      });

      paymentResponse = await razorpay.orders.create({
        amount: amount * 100,
        currency,
      });
    } else if (paymentGateway === 'stripe' && gatewayConfig.stripeApiKey) {
      // Stripe Payment
      const stripe = new Stripe(gatewayConfig.stripeApiKey, { apiVersion: '2024-12-18.acacia' });

      paymentResponse = await stripe.paymentIntents.create({
        amount: amount * 100, 
        currency,
      });
    } else {
      return res.status(400).json({ error: 'Invalid payment gateway or API key not configured' });
    }

    return res.status(200).json(paymentResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to process payment' });
  }
};
