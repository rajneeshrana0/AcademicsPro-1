"use client"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useRef } from 'react';
import Link from 'next/link';

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const signin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevents page reload

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    console.log(username, password);

    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem('token', jwt);
      alert('Signin successful');
      router.push('/student');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Signin failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center p-36 h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-background/45">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={signin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium" htmlFor="password">
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
          <Link href="/forgot-password" className="underline text-accent-foreground hover:text-accent">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;