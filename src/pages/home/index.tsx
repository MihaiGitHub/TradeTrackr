import React, { useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Content from "../../components/content";

const Home: React.FC = () => {
  const [appSidebarMinify, setAppSidebarMinify] = useState(false);

  return (
    <div
      className={
        (appSidebarMinify ? "app-sidebar-minified" : "") +
        " app-header-fixed app-sidebar-fixed"
      }
    >
      <Header />
      <Sidebar
        appSidebarMinify={appSidebarMinify}
        setAppSidebarMinify={setAppSidebarMinify}
      />
      <Content />
    </div>
  );
};

export default Home;
