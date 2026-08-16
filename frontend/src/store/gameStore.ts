import { create } from "zustand";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type CellValue = number | null;

export type Board = CellValue[][];

export interface Position {
  row: number;
  col: number;
}

interface GameStore {
  // Board
  board: Board;
  initialBoard: Board;

  // Selection
  selectedCell: Position | null;

  // Game Stats
  moves: number;
  mistakes: number;

  // Timer
  elapsedTime: number;

  // Settings
  difficulty: Difficulty;

  // Actions
  setBoard: (board: Board) => void;
  setSelectedCell: (cell: Position | null) => void;
  incrementMoves: () => void;
  incrementMistakes: () => void;
  resetGame: () => void;
  setCellValue: (
  row: number,
  col: number,
  value: CellValue
) => void;
}

const createEmptyBoard = (): Board =>
  Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => null)
  );

export const useGameStore = create<GameStore>((set) => ({
  board: createEmptyBoard(),

  initialBoard: createEmptyBoard(),

  selectedCell: null,

  moves: 0,

  mistakes: 0,

  elapsedTime: 0,

  difficulty: "Easy",

  setBoard: (board) =>
    set({
      board,
      initialBoard: board.map((row) => [...row]),
    }),
    setCellValue: (row, col, value) =>
  set((state) => {
    const board = state.board.map((r) => [...r]);

    board[row][col] = value;

    return {
      board,
      moves: state.moves + 1,
    };
  }),

  setSelectedCell: (cell) =>
    set({
      selectedCell: cell,
    }),

  incrementMoves: () =>
    set((state) => ({
      moves: state.moves + 1,
    })),

  incrementMistakes: () =>
    set((state) => ({
      mistakes: state.mistakes + 1,
    })),

  resetGame: () =>
    set({
      board: createEmptyBoard(),
      initialBoard: createEmptyBoard(),
      selectedCell: null,
      moves: 0,
      mistakes: 0,
      elapsedTime: 0,
      difficulty: "Easy",
    }),
}));