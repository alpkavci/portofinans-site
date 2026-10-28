// PortoFinans uygulama ikonu: mavi kare içinde çapa ve üç dalga çizgisi
// (Instagram ve X profil görselindeki logo).
export function LogoIcon({ size = 44, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="pf-logo-zemin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2E6BB5" />
          <stop offset="1" stopColor="#1B3D6E" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#pf-logo-zemin)" />
      <circle cx="50" cy="20" r="6" stroke="#FFFFFF" strokeWidth="4" fill="none" />
      <line x1="50" y1="26" x2="50" y2="64" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <line x1="30" y1="37" x2="70" y2="37" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <rect x="24" y="30" width="5" height="6" rx="1" fill="#FFFFFF" opacity="0.9" />
      <polygon points="21.5,31 29.5,31 26.5,26" fill="#FFFFFF" opacity="0.9" />
      <circle cx="74" cy="27" r="2.5" fill="#FFFFFF" opacity="0.9" />
      <path d="M71 37 Q74 31 77 37" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.9" />
      <path d="M50 64 Q35 64 32 55" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M50 64 Q65 64 68 55" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
      <line x1="22" y1="73" x2="78" y2="73" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="27" y1="81" x2="73" y2="81" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="34" y1="89" x2="66" y2="89" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// İkon + altında küçük harfle "portofinans" (kartlarda ve başlıkta kullanılan imza).
export function LogoLockup({ size = 44, label = true, className = "" }) {
  return (
    <span className={`inline-flex flex-col items-center gap-1 ${className}`}>
      <LogoIcon size={size} />
      {label && (
        <span className="font-medium lowercase text-white/90" style={{ fontSize: Math.max(9, size * 0.27) }}>
          portofinans
        </span>
      )}
    </span>
  );
}
