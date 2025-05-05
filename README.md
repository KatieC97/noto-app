# Noto – Mood Tracking App

Noto is a lightweight, single-page mood tracking app built with React. Users log their moods, save reflective notes, and receive tailored suggestions - all stored locally in `localStorage` for privacy and simplicity.

---

## Features

- **Mood check-in** with 4 options: Great, Okay, Sad, Angry
- **Custom suggestions** shown based on the latest mood
- **Save personal notes** and link them to mood entries
- **Mood history bar chart** with color-coded insights
- **A/B testing simulation** for UX research
- **Mobile-responsive UI** with a soft, pastel theme

---

## Tech Stack

- **Frontend:** React, CSS Modules
- **State Handling:** `useState`, `useEffect`, `localStorage`
- **Routing:** React Router
- **Charting:** Chart.js
- **Toasts:** `react-toastify`
- **A/B Variant Storage:** LocalStorage-based toggles
- **Build Tool:** CRA (Create React App)

---

## Folder Structure

noto-app/

├── public/

│ ├── favicon.ico

│ ├── index.html

│ ├── logo192.png

│ ├── logo512.png

│ ├── manifest.json

│ └── robots.txt

│

├── src/

│ ├── assets/

│ │ └── noto-icon.png, noto-logo.png

│ ├── components/

│ │ ├── Navbar.js

│ │ └── Navbar.css

│ ├── pages/

│ │ ├── Splash.js

│ │ ├── MoodCheckIn.js

│ │ ├── AddNote.js

│ │ ├── MoodHistory.js

│ │ ├── Suggestions.js

│ │ ├── MoodCheckIn.css

│ │ ├── AddNote.css

│ │ ├── MoodHistory.css

│ │ └── Suggestions.css

│ ├── App.js

│ └── index.js

│

├── .gitignore

├── package.json

├── package-lock.json

└── README.md

---

## Setup Instructions

**Clone the repository**

```bash
git clone https://github.com/your-username/noto-app.git
cd noto-app
npm install # install project dependencies
npm start # run app locally
npm run build # build for production
```
