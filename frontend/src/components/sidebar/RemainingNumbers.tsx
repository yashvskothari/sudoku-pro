import Card from "../common/Card";

const data = Array.from({ length: 9 }, (_, i) => ({
  number: i + 1,
  remaining: 9,
}));

function RemainingNumbers() {
  return (
    <Card title="Remaining Numbers">
      <div className="grid grid-cols-3 gap-3">
        {data.map(({ number, remaining }) => (
          <button
            key={number}
            className="
              aspect-auto

              rounded-2xl

              border
              border-white/20

              bg-white/10

              transition-all

              duration-300

              hover:scale-105

              hover:border-indigo-400/40

              hover:bg-indigo-500/10
            "
          >
            <div className="mt-2 text-3xl font-bold text-indigo-300">
              {number}
            </div>

            <div className="mt-1 text-xs text-zinc-400">
              {remaining} left
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}

export default RemainingNumbers;