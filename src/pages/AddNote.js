import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import notoLogo from "../assets/noto-logo.png";
import "./AddNote.css";

export default function AddNote() {
  const [note, setNote] = useState("");
  const [lastMood, setLastMood] = useState("Not checked in");
  const navigate = useNavigate();

  useEffect(() => {
    const mood = localStorage.getItem("lastMood");
    if (mood) setLastMood(mood);
  }, []);

  const handleSaveNote = () => {
    const existingData = JSON.parse(localStorage.getItem("moodData") || "[]");
    const newEntry = {
      date: new Date().toLocaleDateString("en-GB"),
      mood: lastMood,
      note,
    };
    localStorage.setItem(
      "moodData",
      JSON.stringify([...existingData, newEntry])
    );

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
  );
}
