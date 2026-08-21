# 🧩 Sudoku Pro

> A premium Sudoku web application built with React, TypeScript, Tailwind CSS, and Zustand — featuring intelligent puzzle generation with a unique-solution guarantee, notes mode, hints, undo/redo, live statistics, and a modern glassmorphic, dark-themed UI.

This README reflects the **final shipped state** of the project, not just the original plan. Status tags (`✅ Done`, `🟡 Partial`, `⏳ Planned`) show what's actually implemented vs. still on the backlog.

---

## Overview

Sudoku Pro delivers a premium Sudoku experience with an elegant interface, responsive layout, and intelligent gameplay mechanics. It's a **fully client-side app** — puzzles are generated in the browser, there is no backend or server dependency, and no data leaves the device.

---

## Features

### Gameplay

- ✅ 9×9 Sudoku Board
- ✅ Multiple Difficulty Levels — Easy, Medium, Hard, Expert (distinct clue-count targets per level)
- ✅ Intelligent Sudoku Generator — randomized backtracking with a **guaranteed unique solution** for every puzzle
- ✅ Backtracking Solver (used internally by the generator and by the Hint system)
- ✅ Notes (Pencil Marks) — toggleable, auto-clears from row/column/box on placement
- ✅ Hint System — reveals the correct value for the selected cell, tracked in Statistics
- ✅ Undo / Redo — full history stack, buttons + `Ctrl+Z` / `Ctrl+Shift+Z`
- ✅ Erase Cell
- ✅ Restart Puzzle — resets to the original clues without regenerating
- ✅ New Game — generates a fresh puzzle at the selected difficulty
- ✅ Pause & Resume
- ✅ Mistake Limit — 3 mistakes ends the round (Game Over overlay)
- ✅ Win Detection — completed, correct board triggers a Victory overlay with final stats

### Premium UI

- ✅ Modern Glassmorphism Design
- ✅ Gradient, blurred background accents
- ✅ Responsive Layout (desktop / tablet / mobile)
- ✅ Interactive Hover Effects
- ✅ Dark Theme
- ✅ Premium Card Components
- 🟡 Smooth Animations — handled via Tailwind CSS transitions, not a dedicated animation library (Framer Motion, mentioned in the original plan, was not used)

### Smart Features

- ✅ Live Remaining Number Counter (1–9), disables a digit once fully placed
- ✅ Row / Column / 3×3 Block Highlight
- ✅ Same-Number Highlight
- ✅ Mistake Detection
- ✅ Keyboard Support (digits, backspace/delete, undo/redo, `N` toggles notes)
- ✅ Mobile Friendly
- 🟡 Accessibility — full keyboard support is in; screen-reader labeling / focus management is not yet addressed

### Visual Effects

- ✅ Selection / invalid-move pulse feedback
- ✅ Pause / Victory / Game Over blurred overlays
- ⏳ Completed Row / Column / Block glow animation
- ⏳ Victory celebration animation (confetti)
- ⏳ Animated number counters
- ⏳ Sound effects

### Statistics

- ✅ Timer (live, pauses with the game)
- ✅ Total Moves
- ✅ Mistakes (out of 3)
- ✅ Completion Percentage
- ✅ Hints Used
- ✅ Difficulty
- ⏳ Best Time (not yet persisted between sessions)

---

## Sudoku Rules

Sudoku is played on a **9×9 grid** divided into **nine 3×3 blocks**.

The objective is to fill every empty cell using numbers **1–9** while following these rules:

- Each **row** must contain every number from **1–9** exactly once.
- Each **column** must contain every number from **1–9** exactly once.
- Each **3×3 block** must contain every number from **1–9** exactly once.
- No duplicate numbers are allowed in any row, column, or block.

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)

### State Management

- Zustand — a single store (`gameStore`) holds all game state

### UI

- Radix UI (`@radix-ui/react-progress`) — Statistics progress ring
- Lucide React — icons

### Backend

- None. This is a static, fully client-side application. A `backend/` folder exists in the repo for future use but currently contains nothing.

---

## Project Structure

```text
frontend/src/
│
├── components/
│   ├── board/         # SudokuBoard, BoardRow, Cell, StatusOverlay
│   ├── common/         # Card, ProgressRing
│   ├── layout/          # Header, Sidebar, GameContainer
│   ├── sidebar/         # Controls, RemainingNumbers, Statistics
│   └── rules/           # GameRules
│
├── engine/
│   ├── generator/       # Puzzle generator (live)
│   ├── difficulty/      # Difficulty presets, max-mistakes constant (live)
│   ├── solver/           # Legacy Cell-object solver (unused by the live app)
│   ├── validator/         # Legacy Cell-object validator (unused by the live app)
│   ├── utils/             # Legacy Cell-object board helpers (unused by the live app)
│   └── types/             # Legacy Cell-object type definitions (unused by the live app)
│
├── game/
│   └── validator/         # validateMove.ts — the move validator actually used by the store
│
├── store/                  # gameStore.ts (Zustand)
├── hooks/                   # useKeyboardInput.ts
├── utils/                    # highlight.ts
├── data/                      # sample/demo boards (unused now that generation is live)
└── pages/                      # GamePage.tsx
```

> **Note:** `engine/solver`, `engine/validator`, `engine/utils`, and `engine/types` were an early scaffold built around a heavier per-cell object model. The live app (generator, store, and UI) uses a simpler primitive `(number | null)[][]` board instead, so those four modules are currently dead code — safe to delete, or to revisit in a future refactor. See the TRD for details.

---

## UI Highlights

- Premium Dark Theme
- Glassmorphism Panels
- Soft Shadows
- Rounded Components
- Interactive Board with live highlighting
- Responsive Layout
- Pause / Victory / Game Over overlays

---

## Installation

Clone the repository

```bash
git clone https://github.com/your-username/Sudoku-Pro.git
```

Navigate into the project

```bash
cd Sudoku-Pro/frontend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

> If you received this project as an exported zip that already contains a `node_modules` folder, delete it and run `npm install` fresh — native build tooling (the Vite/Rolldown binding) is platform-specific and won't carry over between operating systems.

---

## Controls & Keyboard Shortcuts

| Action | How |
|---|---|
| Select a cell | Click it |
| Place a number | Click the number pad, or press `1`–`9` |
| Toggle Notes mode | Click the pencil icon, or press `N` |
| Erase a cell | Click the eraser icon, or press `Backspace` / `Delete` |
| Undo | Click the undo icon, or `Ctrl+Z` |
| Redo | Click the redo icon, or `Ctrl+Shift+Z` |
| Hint | Click the lightbulb icon (selected cell only) |
| Pause / Resume | Click the pause icon in the header |
| Restart puzzle | Click the restart icon in the header |
| New Game | Click the sparkle icon, or pick a difficulty in the header |

---

## Responsive Design

Optimized for

- 🖥 Desktop
- 📱 Mobile
- 📱 Tablet

---

## Future Enhancements

- Completed row/column/block glow animation
- Victory confetti / celebration screen
- Animated number counters
- Sound effects
- Persistent Best Time / save progress
- Daily Challenges
- Leaderboards
- User Profiles
- Themes
- Achievements
- Online Multiplayer
- Custom Sudoku Sizes
- Cloud Sync

---

## Contributing

Contributions are welcome!

If you'd like to improve the project, feel free to fork the repository, create a feature branch, and submit a pull request.

---

## Author

**Yash Kothari**

GitHub: https://github.com/yashvskothari

---

### ⭐ If you like this project, consider giving it a star!
