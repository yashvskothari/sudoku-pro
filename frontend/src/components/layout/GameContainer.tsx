import SudokuBoard from "../board/SudokuBoard";
import Sidebar from "./Sidebar";

function GameContainer() {
  return (
    <section
      className="
        mx-auto
        mt-4

        flex
        w-full
        max-w-245

        flex-col
        gap-8
        xl:gap-10

        rounded-4xl

        border
        border-white/10

        bg-white/3

        p-6

        backdrop-blur-3xl

        xl:flex-row
      "
    >
      {/* Board */}

<div className="flex justify-center xl:justify-start">
    <SudokuBoard />
</div>

      {/* Sidebar */}

      <Sidebar />
    </section>
  );
}

export default GameContainer;