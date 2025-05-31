export const getMoodColor = (mood) => {
  const colors = {
    Great: "#C08497",
    Okay: "#FFCAD4",
    Sad: "#B0D0D3",
    Angry: "#F7AF9D",
  };
  return colors[mood] || "#CCCCCC"; // fallback color
};

export const moods = ["Great", "Okay", "Sad", "Angry"];

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
