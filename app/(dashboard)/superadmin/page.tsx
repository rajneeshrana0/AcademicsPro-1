"use client";
import { useSession } from "next-auth/react";


const RegisterAdmin = () => {
  const { data: session,  } = useSession();
  

  return (

    <>
    {}
    {session ? (
      <p className="text-2xl font-bold">Welcome, {session.user?.email}</p>
    ) : (
      <p>Please sign in to register a new admin.</p>
    )}
    
    <br />
    <br />
    <br />
    <hr className="" />
   
    </>
  );
 
};

export default RegisterAdmin;
