// Denver "D." mark: heavy display D with a cobalt full stop.
// Confident and typographic, like signing off a sentence.
export function Logo({
  size = 40,
  color = "#0E0F12",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Denver logo"
    >
      <text
        x="6"
        y="92"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="104"
        fontWeight="900"
        fill={color}
      >
        D
      </text>
      <circle cx="96" cy="80" r="12" fill="#0015D4" />
    </svg>
  );
}
