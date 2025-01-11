// SidebarItems.jsx
import React from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

const getSidebarItems = (userRole: string) => {
  if (userRole === "admin") {
    return [
      {
        label: "Dashboard",
        href: "/admin",
        icon: <IconBrandTabler className="h-5 w-5" />,
      },
      {
        label: "Manage Users",
        href: "/admin/users",
        icon: <IconUserBolt className="h-5 w-5" />,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: <IconSettings className="h-5 w-5" />,
      },
      {
        label: "Logout",
        href: "#",
        icon: <IconArrowLeft className="h-5 w-5" />,
      },
    ];
  } else if (userRole === "student") {
    return [
      {
        label: "Dashboard",
        href: "/student",
        icon: <IconBrandTabler className="h-5 w-5" />,
      },
      {
        label: "Profile",
        href: "/student/profile",
        icon: <IconUserBolt className="h-5 w-5" />,
      },
      {
        label: "Settings",
        href: "#",
        icon: <IconSettings className="h-5 w-5" />,
      },
      {
        label: "Logout",
        href: "#",
        icon: <IconArrowLeft className="h-5 w-5" />,
      },
    ];
  } else {
    
    return [];
  }
};

export default getSidebarItems;