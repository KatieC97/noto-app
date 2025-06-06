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
import { weekdays as days, moods, getMoodColor } from "../utils/helpers";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MoodHistory() {
  const [topMood, setTopMood] = useState("");
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    if (stored.length === 0) return;

    // Get full date strings (dd/mm/yyyy) for this week
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);

    const weekDates = [...Array(7)].map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.toLocaleDateString("en-GB");
    });

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
      if (!weekDates.includes(date)) return;

      const weekday = new Date(
        date.split("/").reverse().join("-")
      ).toLocaleDateString("en-GB", { weekday: "short" });

      if (moodCountsByDay[weekday]) {
        moodCountsByDay[weekday][mood]++;
      }

      if (mood) {
        moodTally[mood] = (moodTally[mood] || 0) + 1;
      }

      if (note) {
        notes[`${weekday}-${mood}`] = note;
      }
    });

    const mostCommonMood =
      Object.entries(moodTally).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
    setTopMood(mostCommonMood);

    try {
      const datasets = moods.map((mood) => ({
        label: mood,
        data: days.map((day) => moodCountsByDay?.[day]?.[mood] ?? 0),
        backgroundColor: getMoodColor(mood),
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
          {moods.map((mood) => (
            <span key={mood} className="legend-item">
              <span
                className="legend-dot"
                style={{ backgroundColor: getMoodColor(mood) }}
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
