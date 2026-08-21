import { create } from "zustand";
import { isValidMove } from "../game/validator/validateMove";
import { generatePuzzle } from "../engine/generator/generator";
import { MAX_MISTAKES } from "../engine/difficulty/difficulty";
import type { Difficulty } from "../engine/difficulty/difficulty";

export type { Difficulty };

export type CellValue = number | null;
export type Board = CellValue[][];
export type Notes = number[][][];

export interface Position {
  row: number;
  col: number;
}

interface Snapshot {
  board: Board;
  notes: Notes;
  moves: number;
  mistakes: number;
}

interface GameStore {
  // Board
  board: Board;
  initialBoard: Board;
  solution: Board;
  notes: Notes;

  // Selection
  selectedCell: Position | null;

  // Game Stats
  moves: number;
  mistakes: number;
  hintsUsed: number;
  invalidCell: Position | null;

  // Timer
  elapsedTime: number;

  // Status
  isPaused: boolean;
  isComplete: boolean;
  isGameOver: boolean;
  isNotesMode: boolean;

  // Settings
  difficulty: Difficulty;

  // History
  history: Snapshot[];
  future: Snapshot[];

  // Actions
  setBoard: (board: Board, solution?: Board) => void;
  setSelectedCell: (cell: Position | null) => void;
  setInvalidCell: (cell: Position | null) => void;

  makeMove: (row: number, col: number, value: CellValue) => void;
  inputDigit: (row: number, col: number, digit: number) => void;
  toggleNote: (row: number, col: number, digit: number) => void;
  eraseCell: () => void;
  toggleNotesMode: () => void;
  useHint: () => void;

  undo: () => void;
  redo: () => void;

  togglePause: () => void;
  tick: () => void;

  newGame: (difficulty?: Difficulty) => void;
  restartGame: () => void;
  resetGame: () => void;
}

const createEmptyBoard = (): Board =>
  Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => null));

const createEmptyNotes = (): Notes =>
  Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => [] as number[])
  );

const cloneBoard = (board: Board): Board => board.map((row) => [...row]);

const cloneNotes = (notes: Notes): Notes =>
  notes.map((row) => row.map((cell) => [...cell]));

const isBoardFull = (board: Board): boolean =>
  board.every((row) => row.every((cell) => cell !== null));

const boardsMatch = (board: Board, solution: Board): boolean =>
  board.every((row, r) => row.every((cell, c) => cell === solution[r][c]));

export const useGameStore = create<GameStore>((set, get) => ({
  board: createEmptyBoard(),

  initialBoard: createEmptyBoard(),

  solution: createEmptyBoard(),

  notes: createEmptyNotes(),

  selectedCell: null,

  moves: 0,

  mistakes: 0,

  hintsUsed: 0,

  invalidCell: null,

  elapsedTime: 0,

  isPaused: false,

  isComplete: false,

  isGameOver: false,

  isNotesMode: false,

  difficulty: "Easy",

  history: [],

  future: [],

  setBoard: (board, solution) =>
    set({
      board,
      initialBoard: board.map((row) => [...row]),
      solution: solution ?? createEmptyBoard(),
      notes: createEmptyNotes(),
      selectedCell: null,
      moves: 0,
      mistakes: 0,
      hintsUsed: 0,
      invalidCell: null,
      elapsedTime: 0,
      isPaused: false,
      isComplete: false,
      isGameOver: false,
      isNotesMode: false,
      history: [],
      future: [],
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
      if (state.isPaused || state.isComplete || state.isGameOver) {
        return {};
      }

      if (state.initialBoard[row][col] !== null) {
        return {};
      }

      const snapshot: Snapshot = {
        board: cloneBoard(state.board),
        notes: cloneNotes(state.notes),
        moves: state.moves,
        mistakes: state.mistakes,
      };

      const board = cloneBoard(state.board);
      const notes = cloneNotes(state.notes);

      // Clearing a cell is always allowed
      if (value === null) {
        board[row][col] = null;

        return {
          board,
          moves: state.moves + 1,
          history: [...state.history, snapshot],
          future: [],
        };
      }

      // Validate move against current board state
      if (!isValidMove(state.board, row, col, value)) {
        setTimeout(() => {
          useGameStore.getState().setInvalidCell(null);
        }, 500);

        const mistakes = state.mistakes + 1;

        return {
          mistakes,
          invalidCell: { row, col },
          isGameOver: mistakes >= MAX_MISTAKES,
        };
      }

      board[row][col] = value;
      notes[row][col] = [];

      // Clear this digit from notes in the same row/column/box
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;

      for (let i = 0; i < 9; i++) {
        notes[row][i] = notes[row][i].filter((n) => n !== value);
        notes[i][col] = notes[i][col].filter((n) => n !== value);
      }

      for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
          notes[r][c] = notes[r][c].filter((n) => n !== value);
        }
      }

      const isComplete =
        isBoardFull(board) &&
        (get().solution.some((r) => r.some((v) => v !== null))
          ? boardsMatch(board, get().solution)
          : true);

      return {
        board,
        notes,
        moves: state.moves + 1,
        history: [...state.history, snapshot],
        future: [],
        isComplete,
      };
    }),

  toggleNote: (row, col, digit) =>
    set((state) => {
      if (state.isPaused || state.isComplete || state.isGameOver) {
        return {};
      }

      if (state.initialBoard[row][col] !== null) {
        return {};
      }

      if (state.board[row][col] !== null) {
        return {};
      }

      const snapshot: Snapshot = {
        board: cloneBoard(state.board),
        notes: cloneNotes(state.notes),
        moves: state.moves,
        mistakes: state.mistakes,
      };

      const notes = cloneNotes(state.notes);
      const cellNotes = notes[row][col];

      notes[row][col] = cellNotes.includes(digit)
        ? cellNotes.filter((n) => n !== digit)
        : [...cellNotes, digit].sort((a, b) => a - b);

      return {
        notes,
        history: [...state.history, snapshot],
        future: [],
      };
    }),

  inputDigit: (row, col, digit) => {
    const { isNotesMode, makeMove, toggleNote } = get();

    if (isNotesMode) {
      toggleNote(row, col, digit);
    } else {
      makeMove(row, col, digit);
    }
  },

  eraseCell: () =>
    set((state) => {
      if (state.isPaused || state.isComplete || state.isGameOver) {
        return {};
      }

      const cell = state.selectedCell;
      if (!cell) return {};

      const { row, col } = cell;

      if (state.initialBoard[row][col] !== null) return {};
      if (state.board[row][col] === null && state.notes[row][col].length === 0) {
        return {};
      }

      const snapshot: Snapshot = {
        board: cloneBoard(state.board),
        notes: cloneNotes(state.notes),
        moves: state.moves,
        mistakes: state.mistakes,
      };

      const board = cloneBoard(state.board);
      const notes = cloneNotes(state.notes);

      board[row][col] = null;
      notes[row][col] = [];

      return {
        board,
        notes,
        moves: state.moves + 1,
        history: [...state.history, snapshot],
        future: [],
      };
    }),

  toggleNotesMode: () =>
    set((state) => ({
      isNotesMode: !state.isNotesMode,
    })),

  useHint: () =>
    set((state) => {
      if (state.isPaused || state.isComplete || state.isGameOver) {
        return {};
      }

      const cell = state.selectedCell;
      if (!cell) return {};

      const { row, col } = cell;

      if (state.initialBoard[row][col] !== null) return {};

      const correctValue = state.solution[row][col];
      if (correctValue === null) return {};

      const snapshot: Snapshot = {
        board: cloneBoard(state.board),
        notes: cloneNotes(state.notes),
        moves: state.moves,
        mistakes: state.mistakes,
      };

      const board = cloneBoard(state.board);
      const notes = cloneNotes(state.notes);

      board[row][col] = correctValue;
      notes[row][col] = [];

      const isComplete = isBoardFull(board) && boardsMatch(board, state.solution);

      return {
        board,
        notes,
        hintsUsed: state.hintsUsed + 1,
        history: [...state.history, snapshot],
        future: [],
        isComplete,
      };
    }),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return {};

      const previous = state.history[state.history.length - 1];
      const rest = state.history.slice(0, -1);

      const currentSnapshot: Snapshot = {
        board: cloneBoard(state.board),
        notes: cloneNotes(state.notes),
        moves: state.moves,
        mistakes: state.mistakes,
      };

      return {
        board: previous.board,
        notes: previous.notes,
        moves: previous.moves,
        mistakes: previous.mistakes,
        history: rest,
        future: [...state.future, currentSnapshot],
        isComplete: false,
        isGameOver: previous.mistakes >= MAX_MISTAKES,
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return {};

      const next = state.future[state.future.length - 1];
      const rest = state.future.slice(0, -1);

      const currentSnapshot: Snapshot = {
        board: cloneBoard(state.board),
        notes: cloneNotes(state.notes),
        moves: state.moves,
        mistakes: state.mistakes,
      };

      return {
        board: next.board,
        notes: next.notes,
        moves: next.moves,
        mistakes: next.mistakes,
        history: [...state.history, currentSnapshot],
        future: rest,
        isGameOver: next.mistakes >= MAX_MISTAKES,
      };
    }),

  togglePause: () =>
    set((state) => ({
      isPaused: !state.isPaused,
    })),

  tick: () =>
    set((state) => {
      if (state.isPaused || state.isComplete || state.isGameOver) {
        return {};
      }

      return { elapsedTime: state.elapsedTime + 1 };
    }),

  newGame: (difficulty) =>
    set(() => {
      const targetDifficulty = difficulty ?? get().difficulty;
      const generated = generatePuzzle(targetDifficulty);

      return {
        board: generated.puzzle.map((row) => [...row]),
        initialBoard: generated.puzzle.map((row) => [...row]),
        solution: generated.solution,
        notes: createEmptyNotes(),
        selectedCell: null,
        moves: 0,
        mistakes: 0,
        hintsUsed: 0,
        invalidCell: null,
        elapsedTime: 0,
        isPaused: false,
        isComplete: false,
        isGameOver: false,
        isNotesMode: false,
        difficulty: targetDifficulty,
        history: [],
        future: [],
      };
    }),

  restartGame: () =>
    set((state) => ({
      board: state.initialBoard.map((row) => [...row]),
      notes: createEmptyNotes(),
      selectedCell: null,
      moves: 0,
      mistakes: 0,
      hintsUsed: 0,
      invalidCell: null,
      elapsedTime: 0,
      isPaused: false,
      isComplete: false,
      isGameOver: false,
      isNotesMode: false,
      history: [],
      future: [],
    })),

  resetGame: () =>
    set({
      board: createEmptyBoard(),
      initialBoard: createEmptyBoard(),
      solution: createEmptyBoard(),
      notes: createEmptyNotes(),
      selectedCell: null,
      moves: 0,
      mistakes: 0,
      hintsUsed: 0,
      invalidCell: null,
      elapsedTime: 0,
      isPaused: false,
      isComplete: false,
      isGameOver: false,
      isNotesMode: false,
      difficulty: "Easy",
      history: [],
      future: [],
    }),
}));
