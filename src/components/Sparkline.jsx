export default function Sparkline({ data, up, width = 80, height = 32 }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });

  const linePath = `M ${points.join(" L ")}`;
  const fillPath = `M ${points[0]} L ${points.join(" L ")} L ${width},${height} L 0,${height} Z`;

  const color = up ? "#34d399" : "#f87171";
  const fillColor = up ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)";

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path d={fillPath} fill={fillColor} />
      <path d={linePath} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
