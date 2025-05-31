import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import MoodCheckIn from "./pages/MoodCheckIn";
import AddNote from "./pages/AddNote";
import MoodHistory from "./pages/MoodHistory";
import Suggestions from "./pages/Suggestions";

function App() {
  return (
    <Router basename="/noto-app">
      {" "}
      {/*  for GitHub Pages routing */}
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/check-in" element={<MoodCheckIn />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/history" element={<MoodHistory />} />
        <Route path="/suggestions" element={<Suggestions />} />
      </Routes>
    </Router>
  );
}

export default App;
