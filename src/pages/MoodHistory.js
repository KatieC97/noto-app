import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "../components/Navbar";
import "./MoodHistory.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MoodHistory() {
  const [moodData, setMoodData] = useState([]);

  const colors = {
    Great: "#C08497",
    Okay: "#FFCAD4",
    Sad: "#B0D0D3",
    Angry: "#F7AF9D",
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    setMoodData(stored);
  }, []);

  const chartData = {
    labels: days,
    datasets: [
      {
        label: "Mood",
        data: days.map((day) => {
          const entry = moodData.find((e) => e.day === day);
          return entry ? 1 : 0;
        }),
        backgroundColor: days.map((day) => {
          const entry = moodData.find((e) => e.day === day);
          return entry ? colors[entry.mood] : "#e0e0e0";
        }),
        borderRadius: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const day = context.label;
            const entry = moodData.find((e) => e.day === day);
            return entry && entry.note ? entry.note : "No note";
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { display: false },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <main className="mood-history-container">
      <Navbar />
      <h2 className="mood-history-title">Mood History</h2>

      <div className="mood-chart-wrapper">
        <Bar data={chartData} options={options} />
        <div className="mood-legend">
          <span style={{ color: colors.Great }}>● Great</span>
          <span style={{ color: colors.Okay }}>● Okay</span>
          <span style={{ color: colors.Sad }}>● Sad</span>
          <span style={{ color: colors.Angry }}>● Angry</span>
        </div>
        <p className="mood-summary">This week: You felt great 1 time.</p>
        <div className="pagination">
          <span className="page-arrow">Previous</span>
          <span className="page-number">1</span>
          <span className="page-arrow">Next</span>
        </div>
      </div>
    </main>
  );
}
