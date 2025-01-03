// src/App.js
import { useState } from "react";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import Logo from "@/assets/logo.png";

function Sidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Array of sidebar items
  const sidebarItems = [
    {
      name: "Home",
      icon: <AiOutlineHome />,
      action: () => console.log("Home clicked"),
    },
    {
      name: "Profile",
      icon: <AiOutlineUser />,
      action: () => console.log("Profile clicked"),
    },
    {
      name: "Settings",
      icon: <AiOutlineSetting />,
      action: () => console.log("Settings clicked"),
    },
    {
      name: "Student",
      icon: <AiOutlineUser />,
      action: () => console.log("Student clicked"),
    },
    {
      name: "Parent",
      icon: <AiOutlineUser />,
      action: () => console.log("Parent clicked"),
    },
    {
      name: "Teacher",
      icon: <AiOutlineUser />,
      action: () => console.log("Teacher clicked"),
    },
    {
      name: "Library",
      icon: <AiOutlineHome />,
      action: () => console.log("Library clicked"),
    },
    {
      name: "Hostel",
      icon: <AiOutlineHome />,
      action: () => console.log("Hostel clicked"),
    },
    {
      name: "Admin",
      icon: <AiOutlineUser />,
      action: () => console.log("Admin clicked"),
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 bg-card  w-full p-6 border-[1px_0px_0px_0px_white]">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-40 cursor-pointer" />
        </div>
        <div className="relative">
          <img
            src={Logo}
            alt="Profile"
            className="h-8 w-8 cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-card rounded shadow-lg z-10">
              <button className="block px-4 py-2 w-full text-left hover:bg-muted">
                View Profile
              </button>
              <button className="block px-4 py-2 w-full text-left hover:bg-muted">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

    
        {/* Sidebar */}
        <div className="flex flex-1 relative">
          
          <div
            className={`h-full bg-card  transition-all duration-300 shadow-[1px_0px_0px_0px_white] ${
              sidebarCollapsed ? "w-16" : "w-48"
            } flex flex-col`}
          >
            <ul className="mt-4 flex-1">
              {sidebarItems.map((item, index) => (
                <li key={item.name} className="mb-4 flex items-center relative">
                  {index === 0 && (
                    <button
                      className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-1 rounded-full shadow"
                      onClick={toggleSidebar}
                    >
                      {sidebarCollapsed ? ">" : "<"}
                    </button>
                  )}
                  <button
                    onClick={item.action}
                    className="flex items-center p-2 w-full hover:bg-muted transition duration-150"
                  >
                    {item.icon}
                    {!sidebarCollapsed && (
                      <span className="ml-4">{item.name}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Profile Card */}
          <div
            className={`absolute bottom-4 left-0 px-4 ${
              sidebarCollapsed ? "w-16" : "w-48" 
            } bg-card shadow-lg transition-all duration-300 flex items-center space-x-4 p-4 rounded-lg`}
          >
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg" 
              alt="User"
              className="w-16 h-16 rounded-full object-cover"
            />
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-lg">Rajneesh Rana</span>
                <span className="text-sm text-gray-500">Male</span>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 bg-background text-foreground ml-4">
            <h1 className="text-2xl font-bold">Dashboard Content Here</h1>
          </div>
        </div>

    
      </div>
   
  );
}

export default Sidebar;
