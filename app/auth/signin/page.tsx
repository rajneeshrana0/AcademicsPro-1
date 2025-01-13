// app/auth/signin/page.tsx
"use client";

import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import Link from "next/link";
// import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const password = passwordRef.current?.value;

      if (!password || !email) {
        console.error("Email and password are required");
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
       
      });

      if (result?.error) {
        console.error(result.error);
      } else {
        console.log("Sign-in successful!");
        // You might want to add additional redirection logic here based on the user's role
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-36">
        {/* <Navbar /> */}
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 glow"
            >
              Login
            </button>
          </form>
          <div className="mt-4 flex justify-between text-sm">
            <Link href="/forgot-password">
              <button className="underline text-accent-foreground hover:text-accent">
                Forgot Password?
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}