export default function PortoLogo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="100"
        height="100"
        rx="22"
        fill="#1B3D6E"
        style={{
          filter:
            "drop-shadow(3px 3px 6px rgba(0,0,0,0.4)) drop-shadow(-2px -2px 5px rgba(255,255,255,0.07))",
        }}
      />
      {/* Anchor ring */}
      <circle cx="50" cy="20" r="6" stroke="white" strokeWidth="4" fill="none" />
      {/* Anchor vertical */}
      <line x1="50" y1="26" x2="50" y2="64" stroke="white" strokeWidth="4" strokeLinecap="round" />
      {/* Anchor crossbar */}
      <line x1="30" y1="37" x2="70" y2="37" stroke="white" strokeWidth="4" strokeLinecap="round" />
      {/* Small house left */}
      <rect x="24" y="30" width="5" height="6" rx="1" fill="white" opacity="0.9" />
      <polygon points="21.5,31 29.5,31 26.5,26" fill="white" opacity="0.9" />
      {/* Small person right */}
      <circle cx="74" cy="27" r="2.5" fill="white" opacity="0.9" />
      <path d="M71 37 Q74 31 77 37" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9" />
      {/* Anchor arms */}
      <path d="M50 64 Q35 64 32 55" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M50 64 Q65 64 68 55" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Horizontal lines (water waves) */}
      <line x1="22" y1="73" x2="78" y2="73" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="27" y1="81" x2="73" y2="81" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="34" y1="89" x2="66" y2="89" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
