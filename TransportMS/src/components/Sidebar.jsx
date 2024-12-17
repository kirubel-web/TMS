import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import logo from "../assets/logo1.png";
import profile from "../assets/profile1.png";
import { createContext, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [user, setUser] = useState({ firstName: "", email: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      console.log("Token:", token);

      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/users/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setUser(response.data);
          console.log("User Data:", response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
          // Handle error appropriately - maybe set an error state
        }
      }
    };

    fetchProfile();
  }, []); // Empty dependency array for running once on mount

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-300 ${expanded ? "w-32" : "w-0"}`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <div className="h-6"></div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex items-center p-3">
          <img src={profile} alt="Profile" className="w-10 h-10 rounded-md" />
          <div
            className={`flex items-center overflow-hidden transition-all duration-300 ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <Link to="/dash/profile">
              <div className="leading-4">
                <h4 className="font-semibold">{user.firstName}</h4>
                <span className="text-xs text-gray-600">{user.email}</span>
              </div>
            </Link>
            <MoreVertical size={20} className="ml-2" />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, linkTo, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group 
                ${
                  active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "text-gray-600 hover:bg-indigo-50"
                }`}
    >
      <Link to={linkTo} className="flex items-center w-full">
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>

        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}
