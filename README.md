# 📐 System Design Interview Prep Tracker

A beautiful, portfolio-worthy web app for tracking your system design interview preparation with **spaced repetition** powered by the SM-2 algorithm.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)

## ✨ Features

- **28 System Design Problems** — Pre-loaded with hellointerview problems (WhatsApp, Uber, YouTube, etc.)
- **9 Core Concepts** — Caching, Sharding, CAP Theorem, Consistent Hashing, and more
- **7 Design Patterns** — Real-time Updates, Scaling Reads/Writes, Contention, etc.
- **SM-2 Spaced Repetition** — Never forget what you studied; reviews scheduled at optimal intervals
- **Study Session Mode** — Timed study sessions with confidence rating
- **Dashboard** — Progress overview, due reviews, study streak
- **Statistics** — Study heatmap, confidence distribution, weakest areas
- **Filter & Sort** — By status, difficulty, confidence, tags, due date
- **Notes** — Add personal notes to each problem
- **Local Storage** — All data stored client-side, no backend needed

## 🎨 Design

Modern glassmorphism dark theme with purple/cyan accents:
- Frosted glass cards with backdrop blur
- Gradient backgrounds
- Smooth hover animations
- Fully responsive (mobile-friendly)

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📸 Screenshots

*Coming soon*

## 🧠 Spaced Repetition (SM-2)

After each review, rate your confidence 1-5:
- **1-2**: Review again tomorrow
- **3**: Review in 3 days
- **4**: Review in 7+ days (with multiplier)
- **5**: Review in 14+ days (with multiplier)

The ease factor adjusts based on your performance, optimizing review intervals over time.

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** for lightning-fast dev
- **Tailwind CSS 4** for styling
- **localStorage** for persistence

## 📄 License

MIT
