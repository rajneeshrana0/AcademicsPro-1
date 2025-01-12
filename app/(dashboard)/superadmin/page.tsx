"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

const RegisterAdmin = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role: "ADMIN",
          createdBy: session?.user?.email,
        }),
      });

      // Check if the response is ok before trying to parse it
      const text = await res.text();
      if (res.ok) {
        const data = text ? JSON.parse(text) : {};
        console.log(data);
        alert("Admin registered successfully!");
      } else {
        const errorData = text ? JSON.parse(text) : { message: 'Unknown error occurred' };
        alert(errorData.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to register admin, please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Register Admin</button>
    </form>
  );
};

export default RegisterAdmin;
