import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

export const useKeyboardInput = () => {
  const selectedCell = useGameStore((state) => state.selectedCell);
  const initialBoard = useGameStore((state) => state.initialBoard);
  const inputDigit = useGameStore((state) => state.inputDigit);
  const eraseCell = useGameStore((state) => state.eraseCell);
  const toggleNotesMode = useGameStore((state) => state.toggleNotesMode);
  const undo = useGameStore((state) => state.undo);
  const redo = useGameStore((state) => state.redo);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo / Redo work without a selected cell
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }

      if (e.key.toLowerCase() === "n") {
        toggleNotesMode();
        return;
      }

      if (!selectedCell) return;

      const { row, col } = selectedCell;

      // Do not allow editing initial puzzle clues
      if (initialBoard[row]?.[col] !== null) return;

      // Handle number keys (1-9)
      if (e.key >= "1" && e.key <= "9") {
        inputDigit(row, col, Number(e.key));
      }

      // Handle clearing the cell
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        eraseCell();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, initialBoard, inputDigit, eraseCell, toggleNotesMode, undo, redo]);
};

export default useKeyboardInput;
