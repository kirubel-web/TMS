import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  LifeBuoy,
  Bell,
  User,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
          to="/help"
          className="flex items-center space-x-1 hover:text-green-500"
        >
          <HelpCircle size={20} />
          <span>Help Center</span>
        </Link>

        {/* Support */}
        <Link
          to="/support"
          className="flex items-center space-x-1 hover:text-green-500"
        >
          <LifeBuoy size={20} />
          <span>Support</span>
        </Link>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="flex items-center space-x-1 hover:text-green-500"
        >
          <Bell size={20} />
          <span>Notifications</span>
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className="flex items-center space-x-1 hover:text-blue-500"
        >
          <User size={20} />
          <span>Profile</span>
        </Link>

        {/* Day/Night Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center space-x-1 hover:text-blue-500"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span>{isDarkMode ? "Day" : "Night"}</span>
        </button>

        {/* Logout */}
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
