import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ user, onLogout, onShowLogin, onShowSignup }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo"> LOGO</h1>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        {!user ? (
          <>
            <button className="nav-btn" onClick={onShowLogin}>Login</button>
            <button className="nav-btn" onClick={onShowSignup}>Sign Up</button>
          </>
        ) : (
          <button className="nav-btn" onClick={onLogout}>Logout</button>
        )}
        <a href="#contact"><button className="nav-btn">  Contact Us</button> </a>
      </div>
    </nav>
  );
};

export default Navbar;
