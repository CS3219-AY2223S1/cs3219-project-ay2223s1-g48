import React from 'react';
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <h1>PeerPrep {props.params.username}</h1>
      <div className="links">
        <Link
          to="/login"
          style={{
            color: "white",
            backgroundColor: "#f1356d",
            borderRadius: "8px",
          }}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
