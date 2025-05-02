import React from "react";
import Header from "../../components/header.component";
import Sidebar from "../../components/sidebar/sidebar.component";
import Content from "../../components/content/content.component";

const Home = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Content />
    </div>
  );
};

export default Home;
