import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/noto-logo.png";
import "../App.css";

function Splash() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/check-in");
  };

  return (
    <main className="splash-container">
      <img src={logo} alt="Noto logo" className="splash-logo" />
      <p className="splash-tagline">Your daily mood check-in.</p>
      <button className="splash-button" onClick={handleStart}>
        Get Started
      </button>
    </main>
  );
}

export default Splash;
