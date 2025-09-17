import React from "react";
import { Link } from "react-router-dom";

type SidebarMinifyBtnProps = {
  appSidebarMinify: Boolean;
  setAppSidebarMinify: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarMinifyBtn: React.FC<SidebarMinifyBtnProps> = ({
  appSidebarMinify,
  setAppSidebarMinify,
}) => {
  const toggleAppSidebarMinify = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setAppSidebarMinify(!appSidebarMinify);
    if (localStorage) {
      localStorage.appSidebarMinify = !appSidebarMinify;
    }
  };

  return (
    <div className="menu">
      <div className="menu-item d-flex">
        <Link
          to="/"
          className="app-sidebar-minify-btn ms-auto"
          onClick={toggleAppSidebarMinify}
        >
          <i className="fa fa-angle-double-left"></i>
        </Link>
      </div>
    </div>
  );
};

export default SidebarMinifyBtn;
