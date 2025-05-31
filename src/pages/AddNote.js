import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageWrapper from "../components/PageWrapper";
import Navbar from "../components/Navbar";
import notoLogo from "../assets/noto-logo.png";
import "./AddNote.css";

export default function AddNote() {
  const [note, setNote] = useState("");
  const [lastMood, setLastMood] = useState("Not checked in");
  const navigate = useNavigate();

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    if (entries.length > 0) {
      const last = entries[entries.length - 1];
      if (last?.mood) {
        setLastMood(last.mood);

        localStorage.setItem("lastMood", last.mood);
      }
    }
  }, []);

  const handleSaveNote = () => {
    const today = new Date().toLocaleDateString("en-GB", { weekday: "short" });

    const newEntry = {
      date: today,
      mood: lastMood,
      note,
    };

    const existing = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    localStorage.setItem(
      "moodEntries",
      JSON.stringify([...existing, newEntry])
    );

    localStorage.setItem("lastMood", lastMood); // also keeps the latest note's mood

    toast("Note saved!", {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: {
        backgroundColor: "#F7AF9D",
        color: "#fff",
        fontFamily: '"Montserrat Alternates", sans-serif',
        borderRadius: "10px",
        fontSize: "1rem",
      },
    });

    setTimeout(() => navigate("/suggestions"), 1600);
  };

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <PageWrapper>
      <main className="note-container">
        <Navbar />
        <img src={notoLogo} alt="Noto logo" className="note-logo" />
        <p className="note-date">{today}</p>
        <h2 className="note-heading">Add a Note</h2>
        <textarea
          className="note-textarea"
          placeholder="Type your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={5}
        />
        <p className="note-last-checkin">
          Last check-in: <span className="note-mood">{lastMood}</span>
        </p>
        <button className="note-save-button" onClick={handleSaveNote}>
          Save Note
        </button>
        <ToastContainer />
      </main>
    </PageWrapper>
  );
}
