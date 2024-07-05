import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <Sidebar />
        <div className="main-content">
          {children} 
        </div>
      </div>
    </div>
  );
};

export default Layout;
