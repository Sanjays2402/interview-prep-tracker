# 📐 SystemPrep — Design Mastery

> A premium system design interview prep tracker with SM-2 spaced repetition

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0050?logo=framer&logoColor=white)](https://www.framer.com/motion/)

## Screenshots

### Dashboard
<img src="docs/screenshots/dashboard.png" width="700" alt="Dashboard" />

### Problems — 28 System Design Breakdowns
<img src="docs/screenshots/problems.png" width="700" alt="Problems" />

### Core Concepts
<img src="docs/screenshots/concepts.png" width="700" alt="Concepts" />

### Design Patterns
<img src="docs/screenshots/patterns.png" width="700" alt="Patterns" />

### Statistics & Heatmap
<img src="docs/screenshots/stats.png" width="700" alt="Statistics" />

### Study Session — Focused Mode
<img src="docs/screenshots/study.png" width="700" alt="Study Session" />

## Features

- 📋 **28 System Design Problems** — WhatsApp, Uber, YouTube, Instagram, Dropbox, Ticketmaster, Google Docs, and more
- 🧠 **SM-2 Spaced Repetition** — Rate confidence 1-5, auto-schedules next review
- ⏱️ **Timed Study Sessions** — Full-screen focus mode with auto-pick
- 📚 **9 Core Concepts** — Caching, Sharding, CAP Theorem, Consistent Hashing, etc.
- 🔄 **7 Design Patterns** — Real-time Updates, Scaling Reads/Writes, Contention, etc.
- 📈 **Statistics** — Study heatmap, radar chart, confidence distribution, weakest areas
- ⌨️ **Keyboard Shortcuts** — `⌘K` search, `N` new session
- 🎮 **Easter Egg** — Konami code (↑↑↓↓←→←→BA)
- 🖱️ **Micro-interactions** — 3D tilt on hover, animated counters, staggered transitions
- 💾 **Offline** — All data in localStorage, no backend needed

## Premium Design

- Near-black base (#09090b) with noise texture overlay
- Animated gradient orb follows mouse cursor
- 3D perspective tilt on card hover
- Linear-style sliding sidebar indicator
- Framer Motion page transitions
- Pulsing glow on "due today" indicators
- Custom dark scrollbars
- Toast notifications

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — Lightning fast dev server
- **Tailwind CSS v4** — Utility-first styling
- **Framer Motion** — Animations & transitions
- **Recharts** — Charts & visualizations
- **Lucide React** — Icons

## Getting Started

```bash
git clone https://github.com/Sanjays2402/interview-prep-tracker.git
cd interview-prep-tracker
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## How It Works

### Spaced Repetition (SM-2)

After studying a problem, rate your confidence:

| Rating | Next Review |
|--------|-------------|
| ⭐ 1-2 | Tomorrow |
| ⭐ 3 | 3 days |
| ⭐ 4 | 7 days × multiplier |
| ⭐ 5 | 14 days × multiplier |

The interval multiplier increases with consecutive good reviews, spacing out reviews as you master topics.

## Author

Built by **Sanjay Santhanam** with 🥔
