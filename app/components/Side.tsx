"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { useSession } from "next-auth/react"; // Import useSession from NextAuth
import Image from "next/image";
import { cn } from "../components/lib/utils";
import Logo from "@/public/logo.png";
import Dashboard from "./Dashboard";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();  // Fetch the session data from NextAuth
  const [open, setOpen] = useState(false);

  // Define links for different roles
  const sidebarLinks = {
    superadmin: [
      {
        label: "Dashboard",
        href: "/superadmin",
        icon: <IconBrandTabler className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
      {
        label: "Settings",
        href: "/superadmin/",
        icon: <IconSettings className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
      {
        label: "Register Admin",
        href: "/superadmin/register-admin",
        icon: <IconSettings className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
      {
        label: "Register School",
        href: "/superadmin/register-school",
        icon: <IconArrowLeft className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
      {
        label: "Profile",
        href: "/superadmin/profile",
        icon: <IconArrowLeft className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
    ],
    admin: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: <IconBrandTabler className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
      {
        label: "Settings",
        href: "#",
        icon: <IconSettings className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
      {
        label: "Logout",
        href: "#",
        icon: <IconArrowLeft className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
    ],
    teacher: [
      {
        label: "Dashboard",
        href: "/teacher",
        icon: <IconBrandTabler className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
      {
        label: "Profile",
        href: "/teacher/profile",
        icon: <IconUserBolt className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
      {
        label: "Logout",
        href: "#",
        icon: <IconArrowLeft className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
    ],
    student: [
      {
        label: "Dashboard",
        href: "/student",
        icon: <IconBrandTabler className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
      {
        label: "Profile",
        href: "/student/profile",
        icon: <IconUserBolt className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
      {
        label: "Logout",
        href: "#",
        icon: <IconArrowLeft className="text-primary-foreground h-5 w-5 flex-shrink-0" />
      },
    ],
  };

  // Handle session loading state
  if (status === "loading") {
    return <div>Loading...</div>; 
  }

  
  const userRole = session?.user?.role 
  const links = sidebarLinks[userRole] 

  return (
    <div className={cn("bg-background text-foreground flex flex-col md:flex-row w-screen h-screen max-w-none mx-0 border border-neutral-200 overflow-hidden")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 h-full bg-background text-foreground">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-background text-foreground">
            {open ? <Logos /> : <Logos />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx: React.Key | null | undefined) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: session?.user?.name || "User",
                href: "#",
                icon: (
                  <Image
                    src={session?.user?.image || "https://via.placeholder.com/50"}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="User Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard>{children}</Dashboard>
    </div>
  );
}

export const Logos = () => {
  return <Image src={Logo} alt="Company Logo" width={150} />;
};
