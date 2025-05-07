import React from "react";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import SidebarProfile from "./sidebar-profile.component";
import SidebarNav from "./sidebar-nav.component";

const Sidebar: React.FC = () => {
  return (
    <React.Fragment>
      <div id="sidebar" className={"app-sidebar"} data-bs-theme={"dark"}>
        <PerfectScrollbar
          className="app-sidebar-content"
          options={{ suppressScrollX: true }}
        >
          <SidebarProfile />
          <SidebarNav />
        </PerfectScrollbar>
      </div>
      <div className="app-sidebar-bg" data-bs-theme={""}></div>
      <div className="app-sidebar-mobile-backdrop">
        <Link to="/" className="stretched-link"></Link>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
