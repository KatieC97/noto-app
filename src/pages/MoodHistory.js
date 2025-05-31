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
import PageWrapper from "../components/PageWrapper";
import Navbar from "../components/Navbar";
import "./MoodHistory.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MoodHistory() {
  const [topMood, setTopMood] = useState("");
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    const colors = {
      Great: "#C08497",
      Okay: "#FFCAD4",
      Sad: "#B0D0D3",
      Angry: "#F7AF9D",
    };

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const stored = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    console.log("Stored mood entries:", stored);
    if (stored.length === 0) {
      console.warn("No mood entries found.");
      return;
    }

    const moodCountsByDay = {
      Mon: { Great: 0, Okay: 0, Sad: 0, Angry: 0 },
      Tue: { Great: 0, Okay: 0, Sad: 0, Angry: 0 },
      Wed: { Great: 0, Okay: 0, Sad: 0, Angry: 0 },
      Thu: { Great: 0, Okay: 0, Sad: 0, Angry: 0 },
      Fri: { Great: 0, Okay: 0, Sad: 0, Angry: 0 },
      Sat: { Great: 0, Okay: 0, Sad: 0, Angry: 0 },
      Sun: { Great: 0, Okay: 0, Sad: 0, Angry: 0 },
    };

    const moodTally = {};
    const notes = {};

    stored.forEach(({ mood, note, date }) => {
      if (date && moodCountsByDay[date]) {
        moodCountsByDay[date][mood]++;
      }

      if (mood) {
        moodTally[mood] = (moodTally[mood] || 0) + 1;
      }

      if (date && mood && note) {
        notes[`${date}-${mood}`] = note;
      }
    });

    const mostCommonMood =
      Object.entries(moodTally).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
    setTopMood(mostCommonMood);

    try {
      const datasets = Object.keys(colors).map((mood) => ({
        label: mood,
        data: days.map((day) => moodCountsByDay?.[day]?.[mood] ?? 0),
        backgroundColor: colors[mood],
      }));

      setChartData({
        labels: days,
        datasets,
      });

      setChartOptions({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || "";
                const value = context.raw || 0;
                return `${label}: ${value}`;
              },
              afterBody: (context) => {
                const {
                  label: day,
                  dataset: { label: mood },
                } = context[0];
                const note = notes[`${day}-${mood}`];
                return note ? [`Note: ${note}`] : [];
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: { stacked: true },
          y: {
            stacked: true,
            beginAtZero: true,
            suggestedMax: 7,
            ticks: { stepSize: 1 },
          },
        },
      });
    } catch (err) {
      console.error("Chart data setup failed:", err);
    }
  }, []);

  return (
    <PageWrapper>
      <main className="mood-history-container">
        <Navbar />
        <h2 className="mood-history-title">Mood History</h2>
        <h3 className="mood-subheading">Mood</h3>

        <div className="chart-wrapper">
          {chartData && chartOptions && (
            <Bar data={chartData} options={chartOptions} />
          )}
        </div>

        <div className="mood-legend">
          {Object.entries({
            Great: "#C08497",
            Okay: "#FFCAD4",
            Sad: "#B0D0D3",
            Angry: "#F7AF9D",
          }).map(([mood, color]) => (
            <span key={mood} className="legend-item">
              <span
                className="legend-dot"
                style={{ backgroundColor: color }}
              ></span>
              {mood}
            </span>
          ))}
        </div>

        <p className="mood-summary">
          This week: You felt <strong>{topMood.toLowerCase()}</strong> the most.
        </p>

        <div className="pagination">
          <span className="faded">Previous</span>
          <span className="current">1</span>
          <span className="faded">Next</span>
        </div>
      </main>
    </PageWrapper>
  );
}
