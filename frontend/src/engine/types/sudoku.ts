// Represents a single Sudoku cell
export interface Cell {
  row: number;
  col: number;

  // Current value (null if empty)
  value: number | null;

  // True if this number belongs to the original puzzle
  fixed: boolean;

  // Notes (Pencil marks)
  notes: number[];

  // UI States
  selected: boolean;
  highlighted: boolean;
  sameValue: boolean;
  error: boolean;
}

// Complete Sudoku board
export type Board = Cell[][];

// Position of a cell
export interface Position {
  row: number;
  col: number;
}

// Difficulty Levels
export type Difficulty =
  | "easy"
  | "medium"
  | "hard"
  | "expert";

// Game Statistics
export interface GameStats {
  moves: number;
  mistakes: number;
  hintsUsed: number;
  elapsedTime: number;
}

// Undo / Redo History
export interface Move {
  position: Position;

  previousValue: number | null;
  newValue: number | null;

  previousNotes: number[];
  newNotes: number[];

  timestamp: number;
}