import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import "./Suggestions.css";
import { getMoodColor } from "../utils/helpers";

export default function Suggestions() {
  const navigate = useNavigate();
  const mood = localStorage.getItem("lastMood") || "Okay";
  const bgColor = getMoodColor(mood);

  const [suggestionsByMood, setSuggestionsByMood] = useState({});

  useEffect(() => {
    fetch("http://localhost:4000/suggestions") // match port from server.js
      .then((res) => res.json())
      .then((data) => {
        setSuggestionsByMood(data);
      })
      .catch((err) => {
        console.error("Failed to fetch suggestions:", err);
      });
  }, []);

  const suggestions = suggestionsByMood[mood] || suggestionsByMood["Okay"];

  return (
    <PageWrapper>
      <main className="suggestions-container">
        <Navbar />
        <h2 className="suggestions-title">Suggestions</h2>

        <div className="suggestions-list">
          {Array.isArray(suggestions) && suggestions.length > 0 ? (
            suggestions.map((text, idx) => (
              <div
                key={idx}
                className="suggestion-box"
                style={{ backgroundColor: bgColor }}
              >
                {text}
              </div>
            ))
          ) : (
            <p className="suggestions-loading">Loading suggestions...</p>
          )}
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
