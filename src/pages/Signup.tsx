import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/config";
import axios from "axios";

function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null); 

  async function signup(event: React.FormEvent) {
    event.preventDefault(); // Prevents page reload

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

  await axios.post(BACKEND_URL + "signup",{
      
        username,
        password
      
    })

    alert("Signup successful");
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center p-36">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <form onSubmit={signup}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium" htmlFor="username">
                Username
              </label>
              <Input
                type="text"
                id="username"
                ref={usernameRef} 
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium" htmlFor="password">
                Password
              </label>
              <Input
                type="password"
                id="password"
                ref={passwordRef} 
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 glow"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-sm">
            <Link to="/login" className="underline text-accent-foreground hover:text-accent">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
