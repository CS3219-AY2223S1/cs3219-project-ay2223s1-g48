import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { width } from "@mui/system";
import { useState } from "react";
import Logo from "../Images/logo.svg";

const Navbar = (props) => {
  console.log(props.children);
  return (
    <nav className="navbar">
      <img src={Logo} alt="logo" id="logo-nav" />
      <div className="navbar-nav">{props.children}</div>
    </nav>
  );
};

export default Navbar;
