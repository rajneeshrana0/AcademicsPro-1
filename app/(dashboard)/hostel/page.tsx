"use client"
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div>
      <h1> Hostel Admin Page</h1>
      {session ? (
      <p className="text-2xl font-bold">Welcome, {session.user?.email}</p>
    ) : (
      <p>Please sign in to register a new admin.</p>
    )}
    </div>
  );
}