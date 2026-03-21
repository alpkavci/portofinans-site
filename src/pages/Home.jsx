import { useState } from "react";
import { Newspaper, TrendingUp, TrendingDown, Bitcoin, BarChart2, Zap, RefreshCw, Clock, AlertCircle } from "lucide-react";
import { NEWS_DATA, neuCard, neuInner } from "../data";
import NewsCard from "../components/NewsCard";
import MarketWidget from "../components/MarketWidget";
import Sparkline from "../components/Sparkline";
import { SkeletonMiniRow } from "../components/Skeleton";
import { useCryptoData } from "../hooks/useCryptoData";
import { useBorsaData } from "../hooks/useBorsaData";
import { usePriceFlash } from "../hooks/usePriceFlash";

const ALL_CATS = ["Tümü", "Analiz", "Kripto", "Hisse", "Döviz"];

// ─── Flash fiyat satırı (mini, bento için) ────────────────────────────────────
function BentoRow({ item }) {
  const flash = usePriceFlash(item.priceRaw ?? 0);
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.05] last:border-0
        hover:bg-white/[0.03] transition-colors cursor-pointer ${flash ?? ""}`}
    >
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-bold leading-none">{item.symbol}</p>
        <p className="text-white/30 text-[10px] mt-0.5 truncate">{item.name}</p>
      </div>
      <Sparkline data={item.spark || []} up={item.up} width={48} height={20} />
      <div className="text-right">
        <p className="text-white text-xs font-bold tabular-nums">{item.price}</p>
        <span
          className={`flex items-center gap-0.5 text-[10px] font-bold justify-end tabular-nums ${
            item.up ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {item.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
          {item.change}
        </span>
      </div>
    </div>
  );
}

// ─── %50 Kripto kartı (canlı) ─────────────────────────────────────────────────
function CryptoBento({ cryptoHook }) {
  const { coins, loading, error, secondsAgo } = cryptoHook;

  return (
    <div className={`${neuCard} overflow-hidden border border-white/[0.06] flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
            <Bitcoin size={13} className="text-amber-400" />
          </div>
          <span className="text-white text-sm font-bold">Kripto</span>
          <span className="flex items-center gap-1 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-1.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-[9px] font-bold">CANLI</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/25">
          {error && <AlertCircle size={9} className="text-amber-400/70" />}
          {!error && <RefreshCw size={9} />}
          <span>{secondsAgo}s önce</span>
        </div>
      </div>

      <div className="flex-1">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonMiniRow key={i} />)
          : (coins ?? []).map((coin) => <BentoRow key={coin.symbol} item={coin} />)
        }
      </div>
    </div>
  );
}

// ─── %50 BIST kartı (15 dk gecikmeli) ────────────────────────────────────────
function BistBento({ borsaHook }) {
  const { stocks, loading, error, lastUpdate } = borsaHook;

  return (
    <div className={`${neuCard} overflow-hidden border border-white/[0.06] flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
            <BarChart2 size={13} className="text-emerald-400" />
          </div>
          <span className="text-white text-sm font-bold">BIST Hisseleri</span>
          <span className="text-[9px] font-bold text-white/25 border border-white/10 rounded px-1 py-0.5">
            15 DK GECİKMELİ
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/25">
          {error && <AlertCircle size={9} className="text-amber-400/70" />}
          <Clock size={9} />
          <span>{lastUpdate ? lastUpdate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }) : "—"}</span>
        </div>
      </div>

      <div className="flex-1">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonMiniRow key={i} />)
          : (stocks ?? []).slice(0, 5).map((s) => <BentoRow key={s.symbol} item={s} />)
        }
      </div>
    </div>
  );
}

// ─── Kategori filtre ──────────────────────────────────────────────────────────
function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {ALL_CATS.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-200 cursor-pointer ${
            active === cat
              ? "bg-slate-50 text-slate-900 border-slate-50 shadow-[0_2px_12px_rgba(248,250,252,0.15)]"
              : "bg-white/[0.04] border-white/[0.06] text-slate-400 hover:border-white/[0.12] hover:text-slate-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ─── Ana sayfa ────────────────────────────────────────────────────────────────
export default function Home() {
  const [category, setCategory] = useState("Tümü");
  const cryptoHook = useCryptoData();
  const borsaHook = useBorsaData();

  const featured = NEWS_DATA.find((n) => n.featured);
  const rest = NEWS_DATA.filter((n) => !n.featured);
  const filtered = category === "Tümü" ? rest : rest.filter((n) => n.category === category);
  const featuredVisible = category === "Tümü" || featured?.category === category;

  return (
    <div className="space-y-6">
      {/* ── %50/%50 Bento Grid: Kripto | BIST ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CryptoBento cryptoHook={cryptoHook} />
        <BistBento borsaHook={borsaHook} />
      </div>

      {/* ── Haber alanı + Sidebar ── */}
      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          {/* Featured hero haber */}
          {featuredVisible && featured && (
            <div className="mb-6">
              <NewsCard news={featured} featured />
            </div>
          )}

          {/* Başlık + filtre */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <Newspaper size={16} className="text-white/60" />
              <h2 className="text-base font-bold text-white">Son Haberler</h2>
              <span className="text-white/25 text-xs">({filtered.length})</span>
            </div>
            <CategoryFilter active={category} onChange={setCategory} />
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-white/25 text-sm">
              Bu kategoride henüz haber bulunmuyor.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <MarketWidget />
          </div>
        </aside>
      </div>
    </div>
  );
}
