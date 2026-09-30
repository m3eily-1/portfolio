export default function Arrow({ dir = "right" }: { dir?: "right" | "down" | "up-right" }) {
  const rot = dir === "down" ? 90 : dir === "up-right" ? -45 : 0;
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: `rotate(${rot}deg)` }} aria-hidden>
      <path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}
