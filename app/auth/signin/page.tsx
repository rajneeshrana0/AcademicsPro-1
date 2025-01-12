// app/auth/signin/page.tsx
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Input } from "../../components/ui/input";
import  Link  from 'next/link'; 
import { Navbar } from "@/app/components/landing/Navbar/Navbar";
import { Footer } from "@/app/components/landing/Footer";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
     
      router.push("/superadmin"); 
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-36">
        <Navbar />
        
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Input
                type="password"
                id="password"
                className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 glow"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 flex justify-between text-sm">
            <Link href="/forgot-password">
              <button className="underline text-accent-foreground hover:text-accent">
                Forgot Password?
              </button>
            </Link>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
        <Footer />
      
    </>
  );
}
