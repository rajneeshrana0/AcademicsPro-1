// /app/layout.tsx
"use client"
import Menu from "@/components/Menu";
import Navi from "@/components/Navi";
import Image from "next/image";
import Link from "next/link";
import React from "react";



const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (

      <div className="flex h-screen">

        {/* Left */}
        <div className="w-[14%] border border-r-2 md:w-[8%] lg:w-[16%] xl:w-[14%]">

          <Link href="/" className="flex items-center justify-center gap-2 lg:justify-start p-4"> 
          <Image
          src="/logo.png" alt="logo" width={200} height={200}
          />
          {/* <span className="hidden lg:block">Academics Pro</span> */}
          </Link>
          <Menu />
        </div>
        {/* Right  */}
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%]  bg-gradient-to-b from-primary/5 via-transparent to-primary/5 overflow-auto flex flex-col  ">
        <Navi />
        {children}

        </div>
       
      </div>


  );
};

export default MainLayout;

