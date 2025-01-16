import { NextResponse } from 'next/server';
import prisma from '@/db';
import Razorpay from 'razorpay';
import Stripe from 'stripe';

// POST handler
export const POST = async (req: Request) => {
  try {
    // Parse the JSON body from the request
    const { schoolId, amount, currency, paymentGateway } = await req.json();

    // Validate the required fields
    if (!schoolId || !amount || !currency || !paymentGateway) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch the payment gateway configuration for the school
    const gatewayConfig = await prisma.schoolPaymentGateway.findUnique({
      where: { schoolId },
    });

    if (!gatewayConfig) {
      return NextResponse.json(
        { error: 'Payment gateway not configured for this school' },
        { status: 404 }
      );
    }

    let paymentResponse;

    // Handle Razorpay Payments
    if (paymentGateway === 'razorpay' && gatewayConfig.razorpayKey) {
      const razorpay = new Razorpay({
        key_id: gatewayConfig.razorpayKey,
        key_secret: process.env.RAZORPAY_SECRET!,
      });

      paymentResponse = await razorpay.orders.create({
        amount: amount * 100, // Razorpay requires the amount in paise
        currency,
      });
    }
    // Handle Stripe Payments
    else if (paymentGateway === 'stripe' && gatewayConfig.stripeApiKey) {
      const stripe = new Stripe(gatewayConfig.stripeApiKey, {
        apiVersion: '2024-12-18.acacia',
      });

      paymentResponse = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe requires the amount in cents
        currency,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid payment gateway or API key not configured' },
        { status: 400 }
      );
    }

    // Return the payment response
    return NextResponse.json(paymentResponse, { status: 200 });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
};
