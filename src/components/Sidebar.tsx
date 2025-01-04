import { useState } from "react";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import Logo from "@/assets/logo.png";
import AdminLogo from '@/assets/p.jpg'

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
              <button
                onClick={item.action}
                className="flex items-center p-2 w-full hover:bg-muted transition duration-150"
              >
                {item.icon}
                {!sidebarCollapsed && <span className="ml-4">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full ml-2">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-4 bg-card w-full p-6 shadow-[0px_1px_0px_0px_white]  ">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="w-40 cursor-pointer" />
          </div>
          <div className="relative mr-8 flex gap-10  ">
            <span className="flex items-center">Welcome Rajneesh </span>
            <img
              src={AdminLogo}
              alt="Profile"
              className="h-10 w-10 cursor-pointer rounded-full "
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-16 mr-4 w-40 bg-card rounded  z-10  shadow-[0px_1px_0px_0px_white]  ">
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

        {/* Content */}
        <main className="flex-1 p-4 bg-background text-foreground mt-4 ml-4">
          <h1 className="text-2xl font-bold">Dashboard Content Here</h1>
        </main>
      </div>
      
    </div>
  );
}

export default Sidebar;