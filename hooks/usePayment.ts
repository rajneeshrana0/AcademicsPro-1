import { useState } from 'react';

type PaymentResponse = unknown;

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (
    schoolId: string,
    amount: number,
    currency: string,
    paymentGateway: 'stripe' | 'razorpay'
  ): Promise<PaymentResponse | null> => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolId, amount, currency, paymentGateway }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const data = await response.json();
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return { processPayment, isProcessing, error };
};
