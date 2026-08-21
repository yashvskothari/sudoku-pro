import BoardRow from "./BoardRow";
import StatusOverlay from "./StatusOverlay";

function SudokuBoard() {
  return (
    <div
      className="
    relative
    w-full
    aspect-square
    xl:w-[min(50vw,600px)]

    rounded-[28px]

    overflow-hidden

    border
    border-white/10

    bg-white/4

    backdrop-blur-2xl

    shadow-[0_20px_80px_rgba(0,0,0,.45)]

    shrink-0
  "
    >
      <div className="grid h-full w-auto grid-cols-9">
        {Array.from({ length: 9 }).map((_, row) => (
          <BoardRow key={row} row={row} />
        ))}
      </div>

      <StatusOverlay />
    </div>
  );
}

export default SudokuBoard;
