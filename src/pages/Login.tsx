


import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '@/config';
import { useRef } from 'react';
import { Input } from "@/components/ui/input";
function Login() {

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin(event: React.FormEvent) {
    event.preventDefault(); // Prevents page reload

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    console.log(username, password);

    const response = await axios.post(BACKEND_URL + "login", {

      username,
      password

    })
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
      navigate("/student");

    alert("signin successful");
  }
  return (
    <>
      <div className='flex justify-center items-center p-36'>
        <Navbar />
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={signin}>
            {/* <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
              placeholder="Enter your email"
            />
          </div> */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium" htmlFor="username">
                Username
              </label>
              <Input
                type="username"
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
              <Input
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
            <Link to="/forgot-password" >
              <button

                className="underline text-accent-foreground hover:text-accent"
              >
                Forgot Password?
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;



