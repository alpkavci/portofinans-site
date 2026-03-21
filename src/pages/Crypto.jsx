import { TrendingUp, TrendingDown, Bitcoin, Zap, RefreshCw, Clock, AlertCircle } from "lucide-react";
import { neuCard, neuInner } from "../data";
import Sparkline from "../components/Sparkline";
import { SkeletonCard } from "../components/Skeleton";
import { useCryptoData } from "../hooks/useCryptoData";
import { usePriceFlash } from "../hooks/usePriceFlash";

// ─── Coin kartı (flash efektli) ───────────────────────────────────────────────
function CryptoCard({ coin, rank }) {
  const flash = usePriceFlash(coin.priceRaw ?? 0);

  return (
    <div
      className={`group ${neuCard} border border-white/[0.05] hover:border-white/[0.12]
        p-4 transition-all duration-300 cursor-pointer rounded-2xl ${flash ?? ""}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-white/20 text-xs w-5 tabular-nums">{rank}</span>
          <div className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center">
            <span className="text-white text-[11px] font-black">{coin.symbol.slice(0, 3)}</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold">{coin.symbol}</p>
            <p className="text-white/30 text-[11px]">{coin.name}</p>
          </div>
        </div>
        <span
          className={`flex items-center gap-0.5 text-xs font-bold ${
            coin.up ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {coin.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {coin.change}
        </span>
      </div>

      <Sparkline data={coin.spark} up={coin.up} width={120} height={36} />

      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-white text-base font-black tabular-nums">{coin.price}</p>
          <p className="text-white/25 text-[10px] mt-0.5">Piyasa Değ: {coin.mktCap}</p>
        </div>
        <div className="text-right">
          <p className="text-white/25 text-[10px]">Hacim</p>
          <p className="text-white/50 text-xs font-semibold tabular-nums">{coin.volume}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Bitcoin büyük kartı (flash efektli) ──────────────────────────────────────
function BtcHero({ btc, secondsAgo, loading }) {
  const flash = usePriceFlash(btc?.priceRaw ?? 0);

  if (loading || !btc) {
    return (
      <div className={`${neuCard} border border-amber-400/15 p-5 mb-6 animate-pulse`}>
        <div className="h-32 bg-white/[0.05] rounded-xl" />
      </div>
    );
  }

  return (
    <div
      className={`${neuCard} border border-amber-400/15 p-5 mb-6 relative overflow-hidden ${flash ?? ""}`}
    >
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-400/[0.04] -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
            <Bitcoin size={28} className="text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white text-xl font-black">Bitcoin</p>
              <span className="flex items-center gap-1 bg-emerald-400/15 border border-emerald-400/25 rounded-full px-2 py-0.5 text-emerald-400 text-[10px] font-bold">
                <Zap size={9} fill="currentColor" /> CANLI
              </span>
            </div>
            <p className="text-white/30 text-sm">BTC/USD · CoinGecko</p>
          </div>
        </div>

        <div className="md:ml-auto flex flex-col md:items-end gap-1">
          <p className="text-white text-3xl font-black tabular-nums">{btc.price}</p>
          <span className={`flex items-center gap-1 text-sm font-bold ${btc.up ? "text-emerald-400" : "text-red-400"}`}>
            {btc.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {btc.change} (24s)
          </span>
        </div>

        <div className="md:border-l md:border-white/10 md:pl-6">
          <Sparkline data={btc.spark} up={btc.up} width={140} height={50} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/[0.07]">
        {[
          { label: "Piyasa Değeri", value: btc.mktCap },
          { label: "24s Hacim", value: btc.volume },
          { label: "Son güncelleme", value: `${secondsAgo}s önce` },
        ].map((s) => (
          <div key={s.label} className={`${neuInner} p-3 text-center`}>
            <p className="text-white font-black text-sm">{s.value}</p>
            <p className="text-white/30 text-[10px] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Kripto sayfası ───────────────────────────────────────────────────────────
export default function Crypto() {
  const { coins, loading, error, lastUpdate, secondsAgo } = useCryptoData();
  const btc = coins?.find((c) => c.symbol === "BTC");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
            <Bitcoin size={20} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Kripto Para</h1>
            <p className="text-white/30 text-sm">CoinGecko API · 30 saniyede bir güncellenir</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/30">
          {error && <span className="flex items-center gap-1 text-amber-400/80"><AlertCircle size={12} /> {error}</span>}
          {lastUpdate && !error && (
            <span className="flex items-center gap-1">
              <RefreshCw size={11} /> {secondsAgo}s önce güncellendi
            </span>
          )}
        </div>
      </div>

      {/* BTC hero */}
      <BtcHero btc={btc} secondsAgo={secondsAgo} loading={loading} />

      {/* Global istatistikler */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Toplam Piyasa Değ.", value: "2,87T $", color: "text-sky-300" },
          { label: "24s Toplam Hacim",   value: "112B $",  color: "text-white" },
          { label: "Yükselen Coin",      value: "1.842",   color: "text-emerald-400" },
          { label: "Düşen Coin",         value: "621",     color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className={`${neuInner} p-4`}>
            <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
            <p className="text-white/30 text-[11px] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Coin kartları */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(coins ?? []).map((coin, i) => (
            <CryptoCard key={coin.symbol} coin={coin} rank={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
