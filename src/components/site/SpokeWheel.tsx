const SPOKE_COUNT = 360;

const SpokeWheel = ({ className = "" }: { className?: string }) => {
  const cx = 200;
  const cy = 200;
  const inner = 28;
  const outer = 188;
  const spokes = Array.from({ length: SPOKE_COUNT }, (_, i) => {
    // i = degrees, 0 at top, clockwise
    const angle = (i - 90) * (Math.PI / 180);
    const x1 = cx + inner * Math.cos(angle);
    const y1 = cy + inner * Math.sin(angle);
    const x2 = cx + outer * Math.cos(angle);
    const y2 = cy + outer * Math.sin(angle);

    let stroke = "#5a5a5a"; // medium gray default
    let width = 0.6;
    if (i === 163) {
      stroke = "#d4a84c"; // gold
      width = 1.4;
    } else if (i >= 0 && i <= 5) {
      stroke = "#ffffff"; // white sweep 0°–5°
      width = 1;
    }

    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={width}
        strokeLinecap="round"
      />
    );
  });

  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Wheel diagram with one gold spoke at 163 degrees and a white arc from 0 to 5 degrees on a black field"
      className={className}
    >
      <rect width="400" height="400" fill="#000000" />
      <g>{spokes}</g>
    </svg>
  );
};

export default SpokeWheel;