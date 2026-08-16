import { Clock3, Settings } from "lucide-react";

function Header() {
  return (
    <header className="w-full border-b border-zinc-800 bg-zinc-900/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-bold leading-none">
            🧩 Sudoku Pro
          </h1>
        </div>

        <div className="flex items-center gap-5 self-start pt-3 text-zinc-300">
          <div className="flex items-center gap-2">
            <Clock3 size={18} />
            <span>00:00</span>
          </div>

          <button className="rounded-lg p-2 transition hover:bg-zinc-800">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;