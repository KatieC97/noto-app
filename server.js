const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());

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

app.get("/suggestions/:mood", (req, res) => {
  const mood = req.params.mood;
  const suggestions = suggestionsByMood[mood] || suggestionsByMood["Okay"];
  res.json(suggestions);
});
app.get("/suggestions", (req, res) => {
  res.json(suggestionsByMood);
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
