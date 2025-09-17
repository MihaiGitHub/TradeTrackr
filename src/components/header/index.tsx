import React from "react";
import { Link } from "react-router-dom";
import DropdownNotification from "../dropdown/Notification";
import DropdownProfile from "../dropdown/Profile";

const Header: React.FC = () => {
  return (
    <div id="header" className="app-header" data-bs-theme="">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo"></span> <b>Trade</b> Trackr
        </Link>
      </div>

      <div className="navbar-nav">
        <DropdownNotification />
        <DropdownProfile />
      </div>
    </div>
  );
};

export default Header;
