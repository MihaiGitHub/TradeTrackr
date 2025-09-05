import React, { useState } from "react";
import Header from "../../components/header/header.component";
import Sidebar from "../../components/sidebar/sidebar.component";
import Content from "../../components/content/content.component";

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
