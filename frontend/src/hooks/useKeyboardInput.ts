import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

export const useKeyboardInput = () => {
  const selectedCell = useGameStore((state) => state.selectedCell);
  const initialBoard = useGameStore((state) => state.initialBoard);
  const makeMove = useGameStore((state) => state.makeMove);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;

      // Do not allow editing initial puzzle clues
      if (initialBoard[row]?.[col] !== null) return;

      // Handle number keys (1-9)
      if (e.key >= "1" && e.key <= "9") {
        makeMove(row, col, Number(e.key));
      }

      // Handle clearing the cell
      if (e.key === "Backspace" || e.key === "Delete") {
        makeMove(row, col, null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, initialBoard, makeMove]);
};

export default useKeyboardInput;