// /app/layout.tsx
import React from "react";
import { SidebarDemo } from "../components/Side";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
 
      <div className="flex">
        <SidebarDemo> 
      <main className="flex-1 p-8">{children}</main> 
    </SidebarDemo>
      </div>
    
  );
};

export default MainLayout;
