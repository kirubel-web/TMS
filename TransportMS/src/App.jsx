import {
  LayoutDashboard,
  Users,
  CarFront,
  FileUser,
  BaggageClaim,
  Route as IconRoute,
  Headset,
  LifeBuoy,
  Settings,
  ChartLine,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import Header from "./components/Header";
import "./index.css";
import Profile from "./pages/Profile";
import Customers from "./pages/Customers";
import Vehicles from "./pages/Vehicles";
import Dispatch from "./pages/Dispatch";
import Drivers from "./pages/Drivers";
import Loads from "./pages/Loads";
import RoutePage from "./pages/RoutePage";
import Statistics from "./pages/Statistics";
import Help from "./pages/Help";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CustomerPage from "./pages/CustomerPage";
import SignUp from "./pages/SignupPage";
import NewAcount from "./pages/NewAcountPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function SidebarItems() {
  const location = useLocation();

  const items = [
    {
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      linkTo: "/dash/dashboard",
    },
    { icon: <Headset size={20} />, text: "Dispatch", linkTo: "/dash/dispatch" },
    { icon: <Users size={20} />, text: "Customers", linkTo: "/dash/customers" },
    {
      icon: <CarFront size={20} />,
      text: "Vehicles",
      linkTo: "/dash/vehicles",
    },
    { icon: <FileUser size={20} />, text: "Drivers", linkTo: "/dash/drivers" },
    { icon: <BaggageClaim size={20} />, text: "Loads", linkTo: "/dash/loads" },
    {
      icon: <IconRoute size={20} />,
      text: "Routes",
      linkTo: "/dash/routepages",
    },
    {
      icon: <ChartLine size={20} />,
      text: "Statistics",
      linkTo: "/dash/statistics",
    },
  ];

  const settingsItems = [
    {
      icon: <Settings size={20} />,
      text: "Settings",
      linkTo: "/dash/settings",
    },
    { icon: <LifeBuoy size={20} />, text: "Help", linkTo: "/dash/help" },
  ];

  return (
    <>
      {items.map((item) => (
        <SidebarItem
          key={item.text}
          icon={item.icon}
          text={item.text}
          linkTo={item.linkTo}
          active={location.pathname === item.linkTo}
        />
      ))}
      <hr className="my-3" />
      {settingsItems.map((item) => (
        <SidebarItem
          key={item.text}
          icon={item.icon}
          text={item.text}
          linkTo={item.linkTo}
          active={location.pathname === item.linkTo}
        />
      ))}
    </>
  );
}

function DashboardContent() {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarItems />
      </Sidebar>
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="/dispatch" element={<Dispatch />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/loads" element={<Loads />} />
            <Route path="/routepages" element={<RoutePage />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/newacount" element={<NewAcount />} />

        <Route path="/dash/*" element={<DashboardContent />} />
      </Routes>
    </Router>
  );
}

export default App;
