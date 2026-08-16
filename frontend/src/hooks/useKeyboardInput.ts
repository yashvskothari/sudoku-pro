import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

export default function useKeyboardInput() {
  const selectedCell = useGameStore((s) => s.selectedCell);
  const board = useGameStore((s) => s.board);
  const setCellValue = useGameStore((s) => s.setCellValue);
  const initialBoard = useGameStore((s) => s.initialBoard);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!selectedCell) return;

      const { row, col } = selectedCell;

      // Don't edit original puzzle cells
      if (initialBoard[row][col] !== null) return;

      // Numbers
      if (/^[1-9]$/.test(e.key)) {
        setCellValue(row, col, Number(e.key));
      }

      // Delete
      if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "0"
      ) {
        setCellValue(row, col, null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, board, setCellValue, initialBoard]);
}