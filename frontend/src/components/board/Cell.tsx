interface CellProps {
  row: number;
  col: number;
  value?: number | string; // Optional: Board number render karne ke liye
}

function Cell({ row, col, value }: CellProps) {
  // 3x3 Sudoku sub-grids border highlights
  const thickRight = col === 2 || col === 5;
  const thickBottom = row === 2 || row === 5;

  return (
    <div
      className={`
        flex items-center justify-center
        aspect-square w-full h-full
        cursor-pointer
        border border-zinc-700/60
        bg-zinc-900
        text-zinc-100 text-lg md:text-xl font-semibold
        transition-all duration-150
        select-none

        hover:bg-indigo-500/20

        ${thickRight ? "border-r-2 sm:border-r-4 border-r-zinc-400" : ""}
        ${thickBottom ? "border-b-2 sm:border-b-4 border-b-zinc-400" : ""}
      `}
    >
      {value}
    </div>
  );
}

export default Cell;