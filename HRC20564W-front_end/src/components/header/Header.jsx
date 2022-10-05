import React from "react";
import "./Header.css";
import companylogo from "../../asset/company-logo.svg";
import logo from "../../asset/logo.svg";

function Header() {
  return (
    <div className="header">
      <div className="header-top">
        <img src={companylogo} className="companylogo" alt="companylogo" />
        <img src={logo} className="logo" alt="logo" />
      </div>
    </div>
  );
}

export default Header;
