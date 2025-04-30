import React from "react";
import { Routes, Route } from "react-router-dom";
//import Header from "./components/header.component";
import Home from "./routes/home/home.component";
// import Sidebar from "./components/sidebar/sidebar.jsx";
// import Content from "./components/content/content.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* <Sidebar />
      <Content /> */}
    </div>
  );
}

export default App;
