import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MoodCheckIn.css";
import Navbar from "../components/Navbar";
import notoLogo from "../assets/noto-logo.png";
import { useNavigate } from "react-router-dom";

export default function MoodCheckIn() {
  const [variant, setVariant] = useState("");
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  useEffect(() => {
    const savedVariant = localStorage.getItem("abVariant");
    if (savedVariant) {
      setVariant(savedVariant);
      logAnalyticsEvent("Loaded AB Variant", { variant: savedVariant });
    } else {
      const newVariant = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem("abVariant", newVariant);
      setVariant(newVariant);
      logAnalyticsEvent("Assigned AB Variant", { variant: newVariant });
    }
  }, []);

  function logAnalyticsEvent(eventName, data = {}) {
    console.log(`[Analytics] ${eventName}`, data);
  }

  function handleMoodClick(mood, color) {
    logAnalyticsEvent("Mood Selected", { mood, variant });
    localStorage.setItem("lastMood", mood);
    const moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    moodLogs.push({ mood, date: new Date().toISOString() });
    localStorage.setItem("moodLogs", JSON.stringify(moodLogs));

    toast(`Mood saved: ${mood}`, {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: {
        backgroundColor: color,
        color: "#fff",
        fontFamily: '"Montserrat Alternates", sans-serif',
        borderRadius: "10px",
        fontSize: "1rem",
      },
    });

    setTimeout(() => navigate("/add-note"), 1600);
  }

  return (
    <main className="mood-container">
      <Navbar />
      <img src={notoLogo} alt="Noto logo" className="mood-logo-large" />
      <p className="mood-date">{today}</p>
      <p className="mood-last-checkin">Last check-in: Yesterday</p>
      <h2 className="mood-question">How are you feeling?</h2>

      <div className="mood-button-group">
        <button
          className="mood-button"
          style={{ backgroundColor: "#C08497" }}
          onClick={() => handleMoodClick("Great", "#C08497")}
        >
          Great
        </button>
        <button
          className="mood-button"
          style={{ backgroundColor: "#FFCAD4" }}
          onClick={() => handleMoodClick("Okay", "#FFCAD4")}
        >
          Okay
        </button>
        <button
          className="mood-button"
          style={{ backgroundColor: "#B0D0D3" }}
          onClick={() => handleMoodClick("Sad", "#B0D0D3")}
        >
          Sad
        </button>
        <button
          className="mood-button"
          style={{ backgroundColor: "#F7AF9D" }}
          onClick={() => handleMoodClick("Angry", "#F7AF9D")}
        >
          Angry
        </button>
      </div>

      <ToastContainer />
    </main>
  );
}
