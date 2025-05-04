import React from "react";

import Navbar from "../components/Navbar";

export default function Suggestions() {
  return (
    <main>
      <Navbar />

      <h2>Suggestions</h2>

      <div style={{ maxWidth: "320px", margin: "auto" }}>
        <div
          style={{
            backgroundColor: "#FFCAD4",
            padding: "1rem",
            borderRadius: "12px",
            margin: "1rem 0",
          }}
        >
          Journal one good thing
        </div>

        <div
          style={{
            backgroundColor: "#FFCAD4",
            padding: "1rem",
            borderRadius: "12px",
            margin: "1rem 0",
          }}
        >
          Practice deep breathing
        </div>

        <div
          style={{
            backgroundColor: "#B0D0D3",
            padding: "1rem",
            borderRadius: "12px",
            margin: "1rem 0",
          }}
        >
          Take a walk outside
        </div>
      </div>
    </main>
  );
}
