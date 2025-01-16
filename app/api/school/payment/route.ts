import { NextResponse } from 'next/server';
import prisma from '@/db';

export const POST = async (req: Request) => {
  try {
    // Parse the incoming request body as JSON
    const { schoolId, stripeApiKey, razorpayKey } = await req.json();

    if (!schoolId) {
      return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
    }

    // admin can be  the payment gateway configuration for the given school
    const updatedGateway = await prisma.schoolPaymentGateway.upsert({
      where: { schoolId },
      update: { stripeApiKey, razorpayKey },
      create: { schoolId, stripeApiKey, razorpayKey },
    });

    return NextResponse.json(updatedGateway, { status: 200 });
  } catch (error) {
    console.error('Error updating payment gateway:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
