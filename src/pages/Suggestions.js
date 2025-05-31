import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import "./Suggestions.css";
import { getMoodColor } from "../utils/helpers";

export default function Suggestions() {
  const navigate = useNavigate();
  const mood = localStorage.getItem("lastMood") || "Okay";
  const bgColor = getMoodColor(mood);

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

  const suggestions = suggestionsByMood[mood] || suggestionsByMood["Okay"];

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}
