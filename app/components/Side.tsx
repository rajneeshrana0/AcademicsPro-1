"use client";
import React, {  useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";


import Image from "next/image";
import { cn } from "../components/lib/utils";
import Logo from "@/public/logo.png";
import Dashboard from "./Dashboard";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Dashboard",
      href: "/student",
      icon: (
        <IconBrandTabler className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/student/profile",
      icon: (
        <IconUserBolt className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        " bg-background text-foreground flex flex-col md:flex-row w-screen h-screen max-w-none mx-0 border border-neutral-200 overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 h-full bg-background text-foreground">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-background text-foreground">
            {open ? <Logos /> : <Logos />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Rajneesh Rana",
                href: "#",
                icon: (
                  <Image
                    src="https://instagram.fixc5-2.fna.fbcdn.net/v/t51.2885-19/466658865_445017861632974_7579874338268965121_n.jpg?_nc_ht=instagram.fixc5-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=tPAvaFmkvN8Q7kNvgGlMBgU&_nc_gid=fd3df19724424a9b833a2074f22adf54&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AYCoqjCG2ZF21mnr5cfggwvDARNDB9q3l-KF7tYImdV2rQ&oe=67888F91&_nc_sid=7d3ac5"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard> 
        {children} 
      </Dashboard>
    </div>
  );
}

export const Logos = () => {
  return (

    <Image
      src={Logo}
      alt="Company Logo"
      width={200}

    />


  );
};




