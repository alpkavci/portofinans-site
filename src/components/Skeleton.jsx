// ─── Skeleton / yükleniyor animasyonu ────────────────────────────────────────

export function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded bg-white/[0.07] ${className}`}
      style={{ animation: "skeletonPulse 1.5s ease-in-out infinite" }}
    />
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 border-b border-white/[0.05]">
      <SkeletonBlock className="w-4 h-3 rounded" />
      <div className="flex-1 space-y-1.5">
        <SkeletonBlock className="h-3.5 w-24 rounded" />
        <SkeletonBlock className="h-2.5 w-36 rounded" />
      </div>
      <SkeletonBlock className="h-7 w-16 rounded hidden sm:block" />
      <SkeletonBlock className="h-3.5 w-20 rounded" />
      <SkeletonBlock className="h-3.5 w-12 rounded" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-[#1E3A5F] rounded-2xl border border-white/[0.04] p-4 space-y-3"
      style={{ boxShadow: "4px 4px 12px rgba(0,0,0,0.45),-3px -3px 8px rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-3">
        <SkeletonBlock className="w-9 h-9 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <SkeletonBlock className="h-3.5 w-16" />
          <SkeletonBlock className="h-2.5 w-24" />
        </div>
        <SkeletonBlock className="h-3.5 w-14" />
      </div>
      <SkeletonBlock className="h-8 w-full rounded-lg" />
      <div className="flex justify-between">
        <SkeletonBlock className="h-5 w-28" />
        <SkeletonBlock className="h-4 w-16" />
      </div>
    </div>
  );
}

export function SkeletonMiniRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.05]">
      <div className="flex-1 space-y-1">
        <SkeletonBlock className="h-3 w-16" />
        <SkeletonBlock className="h-2.5 w-28" />
      </div>
      <SkeletonBlock className="h-3 w-16" />
      <SkeletonBlock className="h-3 w-10" />
    </div>
  );
}
