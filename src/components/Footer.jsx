// src/components/Footer.jsx
import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Trailer. All rights reserved.</p>
      <ul className="footer-links">
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
