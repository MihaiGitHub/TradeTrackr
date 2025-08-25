import React from "react";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import SidebarMinifyBtn from "./sidebar-minify-btn.component";
import SidebarProfile from "./sidebar-profile.component";
import SidebarNav from "./sidebar-nav.component";

type SidebarProps = {
  appSidebarMinify: Boolean;
  setAppSidebarMinify: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({
  appSidebarMinify,
  setAppSidebarMinify,
}) => {
  return (
    <React.Fragment>
      <div id="sidebar" className={"app-sidebar"} data-bs-theme={"dark"}>
        <PerfectScrollbar
          className="app-sidebar-content"
          options={{ suppressScrollX: true }}
        >
          <SidebarProfile />
          <SidebarNav />
          <SidebarMinifyBtn
            appSidebarMinify={appSidebarMinify}
            setAppSidebarMinify={setAppSidebarMinify}
          />
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
