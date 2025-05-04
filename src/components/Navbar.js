import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import notoIcon from "../assets/noto-icon.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="navbar">
      <img
        src={notoIcon}
        alt="Menu"
        className="navbar-logo"
        onClick={toggleMenu}
      />
      {isOpen && (
        <div className="navbar-menu" ref={menuRef}>
          <Link to="/check-in" onClick={() => setIsOpen(false)}>
            Mood Check-In
          </Link>
          <Link to="/add-note" onClick={() => setIsOpen(false)}>
            Add Note
          </Link>
          <Link to="/history" onClick={() => setIsOpen(false)}>
            Mood History
          </Link>
          <Link to="/suggestions" onClick={() => setIsOpen(false)}>
            Suggestions
          </Link>
        </div>
      )}
    </nav>
  );
}
