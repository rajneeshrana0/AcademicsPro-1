
import React from "react";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 h-full  ">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 bg-background flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
       
          {children} 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;