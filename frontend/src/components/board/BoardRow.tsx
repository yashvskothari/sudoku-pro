import Cell from "./Cell";
import { useGameStore } from "../../store/gameStore";

interface BoardRowProps {
  row: number;
}

function BoardRow({ row }: BoardRowProps) {
  const board = useGameStore((state) => state.board);
  const initialBoard = useGameStore((s) => s.initialBoard);

  return (
    <>
      {board[row].map((value, col) => (
        <Cell
          key={`${row}-${col}`}
          row={row}
          col={col}
          value={value}
          fixed={initialBoard[row][col] !== null}
        />
      ))}
    </>
  );
}

export default BoardRow;