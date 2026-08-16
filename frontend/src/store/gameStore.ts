import { create } from "zustand";
import { isValidMove } from "../game/validator/validateMove";

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
  invalidCell: Position | null;

  // Timer
  elapsedTime: number;

  // Settings
  difficulty: Difficulty;

  // Actions
  setBoard: (board: Board) => void;
  setSelectedCell: (cell: Position | null) => void;
  setInvalidCell: (cell: Position | null) => void;

  makeMove: (
    row: number,
    col: number,
    value: CellValue
  ) => void;

  resetGame: () => void;
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

  invalidCell: null,

  elapsedTime: 0,

  difficulty: "Easy",

  setBoard: (board) =>
    set({
      board,
      initialBoard: board.map((row) => [...row]),
    }),

  setSelectedCell: (cell) =>
    set({
      selectedCell: cell,
    }),

  setInvalidCell: (cell) =>
    set({
      invalidCell: cell,
    }),

  makeMove: (row, col, value) =>
    set((state) => {
      const board = state.board.map((r) => [...r]);

      // Clearing a cell is always allowed
      if (value === null) {
        board[row][col] = null;

        return {
          board,
          moves: state.moves + 1,
        };
      }

      // Validate move
      if (!isValidMove(board, row, col, value)) {
        setTimeout(() => {
          useGameStore.getState().setInvalidCell(null);
        }, 500);

        return {
          mistakes: state.mistakes + 1,
          invalidCell: { row, col },
        };
      }

      board[row][col] = value;

      return {
        board,
        moves: state.moves + 1,
      };
    }),

  resetGame: () =>
    set({
      board: createEmptyBoard(),
      initialBoard: createEmptyBoard(),
      selectedCell: null,
      moves: 0,
      mistakes: 0,
      invalidCell: null,
      elapsedTime: 0,
      difficulty: "Easy",
    }),
}));