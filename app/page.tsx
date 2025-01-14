"use client"
import LandingPage from '@/./app/components/landing/landingpage'
import { SessionProvider } from 'next-auth/react';
import { Analytics } from "@vercel/analytics/react";

export default function Home() {

  return (
      <SessionProvider>
    <main className='overflow-x-hidden'>

    <Analytics />
    <LandingPage />
  </main>
      </SessionProvider>
  );
}
