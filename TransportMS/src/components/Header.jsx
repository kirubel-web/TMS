import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  LifeBuoy,
  Bell,
  User,
  LogOut,

} from "lucide-react";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Additional logic to apply the theme, e.g., toggling a CSS class on <body>
  };
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <header className="flex items-center justify-end bg-gray-100 p-4 shadow-md">
      {/* Icons and Buttons */}
      <div className="flex items-left space-x-6 text-black dark:text-white-900">
        {/* Help Center */}
        <Link
          to="/dash/help"
          className="flex items-center space-x-1 hover:text-green-500"
        >
          <HelpCircle size={20} />
          <span>Help Center</span>
        </Link>

        {/* Support */}
        <Link
          to="/dash/support"
          className="flex items-center space-x-1 hover:text-green-500"
        >
          <LifeBuoy size={20} />
          <span>Support</span>
        </Link>

        {/* Notifications */}
        <Link
          to="/dash/notifications"
          className="flex items-center space-x-1 hover:text-green-500"
        >
          <Bell size={20} />
          <span>Notifications</span>
        </Link>

        {/* Profile */}
        <Link
          to="/dash/profile"
          className="flex items-center space-x-1 hover:text-blue-500"
        >
          <User size={20} />
          <span>Profile</span>
        </Link>

       

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 hover:text-blue-500"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
