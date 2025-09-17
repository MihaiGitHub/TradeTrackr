import React from "react";
import { Link } from "react-router-dom";

const SidebarProfile: React.FC = () => {
  return (
    <div className="menu">
      <div className="menu-profile">
        <Link
          to="/"
          //   onClick={handleProfileExpand}
          className="menu-profile-link"
        >
          <div className="menu-profile-cover with-shadow"></div>
          <div className="menu-profile-image menu-profile-image-icon bg-gray-900 text-gray-600">
            <i className="fa fa-user"></i>
          </div>
          <div className="menu-profile-info">
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">Account: 5643334567</div>
            </div>
            <small>Last login: 04/03/2025</small>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarProfile;
