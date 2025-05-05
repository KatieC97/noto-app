import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Suggestions.css";

export default function Suggestions() {
  const navigate = useNavigate();
  const [lastMood, setLastMood] = useState("Okay"); // fallback

  useEffect(() => {
    const storedMood = localStorage.getItem("lastMood");
    if (storedMood) {
      setLastMood(storedMood);
    }
  }, []);

  const suggestionsByMood = {
    Great: [
      "Write down three things you're grateful for",
      "Send a kind message to someone you care about",
      "Capture this feeling in a journal or photo",
    ],
    Okay: [
      "Journal one good thing about today",
      "Take a mindful walk or stretch",
      "Practice deep breathing for one minute",
    ],
    Sad: [
      "Write about what you're feeling without judgment",
      "Hold a comforting object or warm drink",
      "Try a 5-4-3-2-1 grounding exercise",
    ],
    Angry: [
      "Take 10 slow, steady breaths",
      "Go outside for a few minutes of fresh air",
      "Try box breathing: in-4, hold-4, out-4, hold-4",
    ],
  };

  const backgroundColors = {
    Great: "#C08497",
    Okay: "#FFCAD4",
    Sad: "#B0D0D3",
    Angry: "#F7AF9D",
  };

  const suggestions = suggestionsByMood[lastMood] || suggestionsByMood["Okay"];
  const bgColor = backgroundColors[lastMood] || "#FFCAD4";

  return (
    <main className="suggestions-container">
      <Navbar />
      <h2 className="suggestions-title">Suggestions</h2>

      <div className="suggestions-list">
        {suggestions.map((text, idx) => (
          <div
            key={idx}
            className="suggestion-box"
            style={{ backgroundColor: bgColor }}
          >
            {text}
          </div>
        ))}
      </div>

      <p className="history-note">
        Want to reflect on past check-ins?{" "}
        <button className="history-link" onClick={() => navigate("/history")}>
          View your Mood History
        </button>
      </p>
    </main>
  );
}
