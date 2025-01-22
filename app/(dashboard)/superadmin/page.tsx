"use client";
import { useSession } from "next-auth/react";


const RegisterAdmin = () => {
  const { data: session,  } = useSession();
  

  return (

    <>
    {}
    {session ? (
      <p className="text-2xl font-bold">Welcome Back  {session.user?.name} 😊</p>
    ) : (
      <p>Please sign in to register a new admin.</p>
    )}
    
    
    <hr className="" />
   
    </>
  );
 
};

export default RegisterAdmin;
