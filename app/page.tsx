"use client"
// import LandingPage from '@/components/landing/landingpage'
import { SessionProvider } from 'next-auth/react';
import { Analytics } from "@vercel/analytics/react";

export default function Home() {

  return (
    <SessionProvider>
      <main className='overflow-x-hidden h-full flex justify-center items-center '>

        <Analytics />
{/*         <LandingPage /> */}
        <h1 className="text-4xl bg-background text-foreground font-bold text-center flex justify-center items-center" > We are Facing Down Time Sorry 🙏 For inconvenience We are back 🔜 :) </h1>
      </main>
    </SessionProvider>
  );
}
