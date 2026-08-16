import { useGameStore } from "../../store/gameStore";
import { isSameRow, isSameColumn, isSameBox } from "../../utils/highlight";

interface CellProps {
  row: number;
  col: number;
  value: number | null;
  fixed?: boolean;
}

function Cell({ row, col, value, fixed = false }: CellProps) {
  // Thick borders for 3×3 blocks
  const thickRight = col === 2 || col === 5;
  const thickBottom = row === 2 || row === 5;

  // Zustand store
  const { selectedCell, setSelectedCell } = useGameStore();

  // Is this the currently selected cell?
  const isSelected = selectedCell?.row === row && selectedCell?.col === col;
  const board = useGameStore((state) => state.board);

  const selectedValue = selectedCell
    ? board[selectedCell.row][selectedCell.col]
    : null;

  const rowHighlight = selectedCell ? isSameRow(selectedCell.row, row) : false;

  const columnHighlight = selectedCell
    ? isSameColumn(selectedCell.col, col)
    : false;

  const boxHighlight = selectedCell
    ? isSameBox(selectedCell.row, selectedCell.col, row, col)
    : false;

  const sameNumber =
    selectedValue !== null && value === selectedValue && !isSelected;

  return (
    <div
      onClick={() => {
        if (!fixed) {
          setSelectedCell({ row, col });
        }
      }}
      className={`
        flex
        aspect-square
        h-full
        w-full
        cursor-pointer
        select-none
        items-center
        justify-center

        border
        border-zinc-700/60

        text-lg
        font-semibold
        text-zinc-100
        transition-all
        duration-300 ease-out
        md:text-xl

${
  isSelected
    ? "bg-cyan-500/40 ring-2 ring-cyan-300 ring-inset"
    : sameNumber
      ? "bg-fuchsia-500/20"
      : rowHighlight || columnHighlight || boxHighlight
        ? "bg-indigo-500/10"
        : fixed
          ? "bg-zinc-800 cursor-default"
          : "bg-zinc-900 hover:bg-indigo-400/10"
}

        ${thickRight ? "border-r-2 sm:border-r-4 border-r-zinc-400" : ""}

        ${thickBottom ? "border-b-2 sm:border-b-4 border-b-zinc-400" : ""}
      `}
    >
      {value}
    </div>
  );
}

export default Cell;
