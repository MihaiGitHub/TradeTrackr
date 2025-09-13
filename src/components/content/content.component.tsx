import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Content: React.FC = () => {
  const location = useLocation();

  return (
    <div
      className={`app-content ${location.pathname === "/profile" ? "p-0" : ""}`}
    >
      <Outlet />
    </div>
  );
};

export default Content;
