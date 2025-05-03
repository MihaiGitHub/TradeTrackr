import React from "react";
import { Link } from "react-router-dom";

function DropdownProfile() {
  return (
    <div className="navbar-item navbar-user dropdown">
      <a
        href="#/"
        className="navbar-link dropdown-toggle d-flex align-items-center"
        data-bs-toggle="dropdown"
      >
        <div className="image image-icon bg-gray-800 text-gray-600">
          <i className="fa fa-user"></i>
        </div>
        <span>
          <span className="d-none d-md-inline fw-bold">Adam Schwartz</span>
          <b className="caret"></b>
        </span>
      </a>
      <div className="dropdown-menu dropdown-menu-end me-1">
        <Link className="dropdown-item" to="profile">
          Edit Profile
        </Link>
        <Link className="dropdown-item" to="settings">
          Settings
        </Link>

        <div className="dropdown-divider"></div>
        <a href="#/" className="dropdown-item">
          Log Out
        </a>
      </div>
    </div>
  );
}

export default DropdownProfile;
