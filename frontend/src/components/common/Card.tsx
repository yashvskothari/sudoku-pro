interface CardProps {
  title?: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
<div
  className="
    rounded-[28px]

    border

    border-white/10

    bg-white/4

    backdrop-blur-2xl

    shadow-[0_20px_80px_rgba(0,0,0,.45)]

    p-5
  "
>
      {title && (
        <h2 className="mb-6 text-xl font-semibold tracking-wide">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}

export default Card;