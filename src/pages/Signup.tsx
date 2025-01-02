function Signup() {
  return (
    <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-card">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
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
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-sm">
        <button
          // onClick={() => setCurrentPage('login')}
          className="underline text-accent-foreground hover:text-accent"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Signup;