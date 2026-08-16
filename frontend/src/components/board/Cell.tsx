import { useGameStore } from "../../store/gameStore";

interface CellProps {
  row: number;
  col: number;
  value: number | null;
  fixed?: boolean;
}

function Cell({
  row,
  col,
  value,
  fixed = false,
}: CellProps) {
  // Thick borders for 3×3 blocks
  const thickRight = col === 2 || col === 5;
  const thickBottom = row === 2 || row === 5;

  // Zustand store
  const { selectedCell, setSelectedCell } = useGameStore();

  // Is this the currently selected cell?
  const isSelected =
    selectedCell?.row === row &&
    selectedCell?.col === col;

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
        duration-200
        md:text-xl

        ${
          fixed
            ? "bg-zinc-800 cursor-default"
            : "bg-zinc-900 hover:bg-indigo-500/20"
        }

        ${
          isSelected
            ? "bg-indigo-500/30 ring-2 ring-cyan-400 ring-inset"
            : ""
        }

        ${
          thickRight
            ? "border-r-2 sm:border-r-4 border-r-zinc-400"
            : ""
        }

        ${
          thickBottom
            ? "border-b-2 sm:border-b-4 border-b-zinc-400"
            : ""
        }
      `}
    >
      {value}
    </div>
  );
}

export default Cell;