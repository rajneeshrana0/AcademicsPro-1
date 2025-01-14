// /app/layout.tsx
"use client"
import React from "react";
import { SidebarDemo } from "../components/Side";
import { SessionProvider } from "next-auth/react";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
 <SessionProvider>
      <div className="flex">
        <SidebarDemo> 
      <main className="flex-1 p-8">{children}</main> 
    </SidebarDemo>
      </div>
      </SessionProvider>
    
  );
};

export default MainLayout;

