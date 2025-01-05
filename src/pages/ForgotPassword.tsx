import { Navbar } from "@/components/Navbar/Navbar";
import { Link } from "react-router-dom";

function ForgotPassword() {
    return (

      <div  className='flex justify-center items-center p-36'>
        <Navbar />
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 glow"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-4 text-sm">
          <Link to= "/login" >
          <button
            // onClick={() => setCurrentPage('login')}
            className="underline text-accent-foreground hover:text-accent"
          >
            Back to Login
          </button>
          </Link>
        </div>
      </div>
      </div>
    );
  }
  
  export default ForgotPassword;
  