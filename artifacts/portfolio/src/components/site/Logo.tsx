// Denver node mark: a "D" drawn as a single workflow line with three
// nodes in the brand accent colors (cobalt, amber, red).
export function Logo({
  size = 40,
  stroke = "#0E0F12",
  className,
}: {
  size?: number;
  stroke?: string;
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
      <path
        d="M32 18 L32 92 M32 18 C 82 18 82 92 32 92"
        stroke={stroke}
        strokeWidth={11}
        strokeLinecap="round"
      />
      <circle cx="32" cy="18" r="9" fill="#0015D4" />
      <circle cx="69.5" cy="55" r="9" fill="#FFCB41" />
      <circle cx="32" cy="92" r="9" fill="#F32317" />
    </svg>
  );
}
