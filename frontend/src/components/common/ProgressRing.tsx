import * as Progress from "@radix-ui/react-progress";

interface ProgressRingProps {
  value: number;
}

function ProgressRing({ value }: ProgressRingProps) {
  return (
    <Progress.Root
      className="relative h-2 w-full overflow-hidden rounded-full bg-white/10"
      value={value}
    >
      <Progress.Indicator
        className="h-full bg-linear-to-r from-cyan-400 to-indigo-500 transition-all duration-500"
        style={{
          transform: `translateX(-${100 - value}%)`,
        }}
      />
    </Progress.Root>
  );
}

export default ProgressRing;