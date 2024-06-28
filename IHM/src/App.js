import React, { useState } from "react";
import { LayoutDashboard, Sun, SnowflakeIcon, Palette, JoystickIcon, LineChartIcon, MapIcon } from "lucide-react"; 
import Sidebar, { SidebarItem } from "./components/Sidebar.js"; 
import DashboardView from "./view/DashboardView.js"; 
import ControlPanelView from "./view/ControlPanelView.js"; 
import LineDetectionView from "./view/LineDetectionView.js"; 
import MapEditorView from "./view/MapEditorView.js"; 

function App() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "ControlPanel":
        return <ControlPanelView />;
      case "LineDetection":
        return <LineDetectionView />;
      case "MapEditor":
        return <MapEditorView />;
      case "Dashboard":
      default:
        return <DashboardView />;
    }
  };

  const changeActive = (text) => {
    setActiveComponent(text);
  }

  return (
    <>
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={activeComponent === "Dashboard"} onClick={() => changeActive("Dashboard")} />
          <SidebarItem icon={<JoystickIcon size={20} />} text="Control Panel" active={activeComponent === "ControlPanel"} onClick={() => changeActive("ControlPanel")} />
          <SidebarItem icon={<LineChartIcon size={20} />} text="Line Detection" active={activeComponent === "LineDetection"} onClick={() => changeActive("LineDetection")} />
          <SidebarItem icon={<MapIcon size={20} />} text="Map Editor" active={activeComponent === "MapEditor"} onClick={() => changeActive("MapEditor")} />
        </Sidebar>
        <div className="w-5/6 p-5">
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default App;
