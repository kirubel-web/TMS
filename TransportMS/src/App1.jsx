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
import Home from "./homepages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function SidebarItems() {
  const location = useLocation();

  const items = [
    { icon: <LayoutDashboard size={20} />, text: "Dashboard", linkTo: "/" },
    { icon: <Headset size={20} />, text: "Dispatch", linkTo: "/dispatch" },
    { icon: <Users size={20} />, text: "Customers", linkTo: "/customers" },
    { icon: <CarFront size={20} />, text: "Vehicles", linkTo: "/vehicles" },
    { icon: <FileUser size={20} />, text: "Drivers", linkTo: "/drivers" },
    { icon: <BaggageClaim size={20} />, text: "Loads", linkTo: "/loads" },
    { icon: <IconRoute size={20} />, text: "Routes", linkTo: "/routepages" },
    {
      icon: <ChartLine size={20} />,
      text: "Statistics",
      linkTo: "/statistics",
    },
  ];

  const settingsItems = [
    { icon: <Settings size={20} />, text: "Settings", linkTo: "/settings" },
    { icon: <LifeBuoy size={20} />, text: "Help", linkTo: "/help" },
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

function MainContent() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex-1 overflow-y-auto p-6">
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/dispatch" element={<Dispatch />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/loads" element={<Loads />} />
          <Route path="/routepages" element={<RoutePage />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarItems />
        </Sidebar>
        <MainContent />
      </div>
    </Router>
  );
}

export default App;
