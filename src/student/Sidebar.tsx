import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";
import AdminLogo from "@/assets/p.jpg";

function Sidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const sidebarItems = [
    {
      name: "Home",
      icon: <AiOutlineHome />,
      path: "/home",
    },
    {
      name: "Attendence",
      icon: <AiOutlineUser />,
      path: "/attendance",
    },
    {
      name: "Grades",
      icon: <AiOutlineSetting />,
      path: "/grades",
    },
    {
      name: "Library",
      icon: <AiOutlineUser />,
      path: "/library",
    },
    {
      name: "Fee Payment",
      icon: <AiOutlineUser />,
      path: "/fee-payment",
    },
    {
      name: "Learning Path",
      icon: <AiOutlineUser />,
      path: "/learning-path",
    },
    {
      name: "Transport",
      icon: <AiOutlineHome />,
      path: "/transport",
    },
    {
      name: "Store",
      icon: <AiOutlineUser />,
      path: "/store",
    },
    {
      name: "Chat-Room",
      icon: <AiOutlineHome />,
      path: "/chat-room",
    },
    {
      name: "Profile",
      icon: <AiOutlineHome />,
      path: "/profile",
    },
  ];

  return (
    <div className="h-screen grid grid-cols-[auto,1fr]">
      {/* Sidebar */}
      <div
        className={`bg-card h-full transition-all duration-300 shadow-[1px_0px_0px_0px_white] ${
          sidebarCollapsed ? "w-16" : "w-48"
        } overflow-hidden flex flex-col`}
      >
        {/* Sidebar Toggle Button */}
        <button
          className={`bg-primary text-white p-2 rounded-md m-2 ${
            sidebarCollapsed ? "ml-1" : "ml-auto"
          }`}
          onClick={toggleSidebar}
        >
          {sidebarCollapsed ? ">" : "<"}
        </button>

        {/* Sidebar Items */}
        <ul className="mt-4 flex-1">
          {sidebarItems.map((item) => (
            <li key={item.name} className="mb-4 flex items-center">
              <Link
                to={item.path}
                className="flex items-center p-2 w-full hover:bg-muted transition duration-150"
              >
                {item.icon}
                {!sidebarCollapsed && <span className="ml-4">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full ml-2">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-4 bg-card w-full p-6 shadow-[0px_1px_0px_0px_white] ">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="w-40 cursor-pointer" />
          </div>
          <div className="relative mr-8 flex gap-10 ">
            <span className="flex items-center">Welcome Rajneesh </span>
            <img
              src={AdminLogo}
              alt="Profile"
              className="h-10 w-10 cursor-pointer rounded-full "
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-16 mr-4 w-40 bg-card rounded z-10 shadow-[0px_1px_0px_0px_white] ">
                <button className="block px-4 py-2 w-full text-left hover:bg-muted">
                  View Profile
                </button>
                <button className="block px-4 py-2 w-full text-left hover:bg-muted">
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Content (This is where your routes will be rendered) */}
        <main className="flex-1 p-4 bg-background text-foreground mt-4 ml-4">
          {/* You'll need to use React Router's Route component to define 
              your routes and render the corresponding components here */}
        </main>
      </div>
    </div>
  );
}

export default Sidebar;