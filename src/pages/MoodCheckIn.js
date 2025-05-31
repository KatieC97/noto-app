import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MoodCheckIn.css";
import Navbar from "../components/Navbar";
import notoLogo from "../assets/noto-logo.png";
import { useNavigate } from "react-router-dom";
import { moods, getMoodColor } from "../utils/helpers";

export default function MoodCheckIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const savedVariant = localStorage.getItem("abVariant");
    const variant = savedVariant || (Math.random() < 0.5 ? "A" : "B");
    localStorage.setItem("abVariant", variant);
    console.log("[Analytics] AB Variant:", variant);
  }, []);

  function handleMoodClick(mood) {
    const today = new Date().toLocaleDateString("en-GB");

    const newEntry = {
      date: today,
      mood,
      note: "",
    };

    const existingEntries = JSON.parse(
      localStorage.getItem("moodEntries") || "[]"
    );

    const updated = existingEntries.filter((entry) => entry.date !== today);
    updated.push(newEntry);

    localStorage.setItem("moodEntries", JSON.stringify(updated));
    localStorage.setItem("lastMood", mood);

    toast(`Mood saved: ${mood}`, {
      position: "bottom-center",
      autoClose: 1600,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: {
        backgroundColor: getMoodColor(mood),
        color: "#fff",
        fontFamily: '"Montserrat Alternates", sans-serif',
        borderRadius: "10px",
        fontSize: "1rem",
      },
    });

    setTimeout(() => navigate("/add-note"), 1700);
  }

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <main className="mood-container">
      <Navbar />
      <img src={notoLogo} alt="Noto logo" className="mood-logo-large" />
      <p className="mood-date">{today}</p>
      <p className="mood-last-checkin">Last check-in: Yesterday</p>

      <h2 className="mood-question">How are you feeling today?</h2>

      <div className="mood-button-group">
        {moods.map((mood) => (
          <button
            key={mood}
            className="mood-button"
            style={{ backgroundColor: getMoodColor(mood) }}
            onClick={() => handleMoodClick(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      <ToastContainer />
    </main>
  );
}
