import { useState } from "react";
import {
  TrendingUp, TrendingDown, BarChart2, Coins,
  DollarSign, Bitcoin, LayoutGrid, RefreshCw,
  AlertCircle, Clock, Activity,
} from "lucide-react";
import { COMMODITY_DATA, CURRENCY_DATA, neuCard, neuInner } from "../data";
import Sparkline from "../components/Sparkline";
import { SkeletonRow, SkeletonMiniRow, SkeletonBlock } from "../components/Skeleton";
import { useCryptoData } from "../hooks/useCryptoData";
import { useBorsaData } from "../hooks/useBorsaData";
import { usePriceFlash } from "../hooks/usePriceFlash";

// ─── Sekmeler ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: "genel", label: "Genel Bakış",    icon: LayoutGrid },
  { id: "hisse", label: "Hisse Senetleri", icon: BarChart2  },
  { id: "kripto", label: "Kripto",         icon: Bitcoin    },
  { id: "emtia",  label: "Emtia",          icon: Coins      },
  { id: "doviz",  label: "Döviz",          icon: DollarSign },
];

// ─── 15 Dk Gecikme Uyarı Bandı ────────────────────────────────────────────────
function DelayBanner({ lastUpdate }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-amber-400/[0.06] border border-amber-400/20 mb-4">
      <Clock size={13} className="text-amber-400 flex-shrink-0" />
      <div>
        <p className="text-amber-400 text-xs font-bold leading-none">
          BIST verileri 15 dakika gecikmeli olarak sunulmaktadır
        </p>
        <p className="text-gray-600 text-[10px] mt-0.5">
          Borsa İstanbul kuralları gereği. Anlık veri için üye girişi gereklidir.
          {lastUpdate && ` · Son güncelleme: ${lastUpdate.toLocaleTimeString("tr-TR")}`}
        </p>
      </div>
    </div>
  );
}

// ─── Fear & Greed Göstergesi ──────────────────────────────────────────────────
function FearGreedGauge({ label, value, icon: Icon }) {
  const getInfo = (v) => {
    if (v <= 25) return { text: "text-red-400",     label: "Aşırı Korku",          bar: "from-red-600 to-red-500" };
    if (v <= 45) return { text: "text-orange-400",  label: "Korku",                 bar: "from-orange-600 to-orange-400" };
    if (v <= 55) return { text: "text-yellow-400",  label: "Nötr",                  bar: "from-yellow-500 to-yellow-400" };
    if (v <= 75) return { text: "text-emerald-400", label: "Açgözlülük",            bar: "from-emerald-600 to-emerald-400" };
    return              { text: "text-green-400",   label: "Aşırı Açgözlülük",      bar: "from-green-600 to-green-400" };
  };
  const info = getInfo(value);

  return (
    <div className={`${neuInner} p-4 space-y-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={13} className="text-gray-500" />
          <span className="text-[#E5E7EB] text-xs font-bold">{label}</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className={`text-2xl font-black tabular-nums ${info.text}`}>{value}</span>
          <span className={`text-xs font-semibold ${info.text}`}>{info.label}</span>
        </div>
      </div>

      {/* Gradient bar + iğne */}
      <div className="relative h-3">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 via-yellow-400 to-emerald-500 opacity-80" />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#E5E7EB] border-2 border-[#0D1520] shadow-[0_0_8px_rgba(0,0,0,0.8)]"
          style={{ left: `calc(${value}% - 8px)` }}
        />
      </div>

      <div className="flex justify-between text-[9px] text-gray-600">
        <span>0 · Aşırı Korku</span>
        <span>50 · Nötr</span>
        <span>100 · Aşırı Açgözlülük</span>
      </div>
    </div>
  );
}

// ─── Flash'lı fiyat satırı ────────────────────────────────────────────────────
function LivePriceRow({ item, rank, compact = false }) {
  const flash = usePriceFlash(item.priceRaw ?? 0);

  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] last:border-0
        hover:bg-white/[0.03] transition-colors cursor-pointer ${flash ?? ""}`}
    >
      {rank && (
        <span className="text-gray-700 text-xs w-5 text-right tabular-nums flex-shrink-0">{rank}</span>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-[#E5E7EB] text-sm font-semibold leading-none">{item.symbol}</p>
        {!compact && <p className="text-gray-600 text-[11px] mt-0.5 truncate">{item.name}</p>}
      </div>

      {!compact && (
        <div className="hidden sm:block">
          <Sparkline data={item.spark || []} up={item.up} width={60} height={22} />
        </div>
      )}

      <div className="text-right">
        <p className="text-[#E5E7EB] text-sm font-bold tabular-nums leading-none">{item.price}</p>
        {item.changeTRY && item.changeTRY !== "—" && !compact && (
          <p className="text-gray-700 text-[10px] tabular-nums mt-0.5">{item.changeTRY}</p>
        )}
      </div>

      <span
        className={`flex items-center gap-0.5 text-xs font-bold tabular-nums w-14 justify-end flex-shrink-0 ${
          item.up ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {item.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {item.change}
      </span>

      {item.volume && !compact && (
        <div className="hidden xl:block text-right w-20">
          <p className="text-gray-600 text-[11px] tabular-nums">{item.volume}</p>
          <p className="text-gray-700 text-[10px]">Hacim</p>
        </div>
      )}
    </div>
  );
}

// ─── Tablo wrapper ─────────────────────────────────────────────────────────────
function PriceTable({ data, loading }) {
  return (
    <div className={`${neuCard} overflow-hidden`}>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.05] bg-white/[0.01]">
        <span className="w-5 flex-shrink-0" />
        <span className="flex-1 text-gray-700 text-[10px] uppercase tracking-widest">Sembol / Adı</span>
        <span className="text-gray-700 text-[10px] uppercase tracking-widest hidden sm:block w-16 text-right">Grafik</span>
        <span className="text-gray-700 text-[10px] uppercase tracking-widest text-right w-24">Fiyat</span>
        <span className="text-gray-700 text-[10px] uppercase tracking-widest text-right w-14">24s %</span>
        <span className="text-gray-700 text-[10px] uppercase tracking-widest text-right w-20 hidden xl:block">Hacim</span>
      </div>
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
        : data.map((item, i) => <LivePriceRow key={item.symbol} item={item} rank={i + 1} />)
      }
    </div>
  );
}

// ─── Özet kart ────────────────────────────────────────────────────────────────
function SummaryCard({ label, value, sub, color = "text-[#E5E7EB]", loading = false }) {
  return (
    <div className={`${neuInner} p-4 flex flex-col gap-1`}>
      {loading ? (
        <>
          <SkeletonBlock className="h-7 w-24 mb-1" />
          <SkeletonBlock className="h-3 w-16" />
          <SkeletonBlock className="h-2.5 w-20 mt-0.5" />
        </>
      ) : (
        <>
          <p className={`text-xl font-black tabular-nums ${color}`}>{value}</p>
          <p className="text-[#E5E7EB] text-xs font-semibold">{label}</p>
          {sub && <p className="text-gray-600 text-[10px]">{sub}</p>}
        </>
      )}
    </div>
  );
}

// ─── Panel header ─────────────────────────────────────────────────────────────
function PanelHeader({ title, icon: Icon, accentCls, badge, lastUpdate, error, secondsAgo }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${accentCls}`}>
          <Icon size={13} />
        </div>
        <span className="text-[#E5E7EB] text-sm font-bold">{title}</span>
        {badge && (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-400 bg-amber-400/[0.08] border border-amber-400/20 rounded px-1.5 py-0.5">
            <Clock size={8} /> {badge}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 text-[10px]">
        {error && <span className="flex items-center gap-1 text-amber-400/70"><AlertCircle size={9} /> Önbellek</span>}
        {lastUpdate && !error && (
          <span className="flex items-center gap-1 text-gray-700">
            <RefreshCw size={9} />
            {secondsAgo !== undefined ? `${secondsAgo}s` : lastUpdate.toLocaleTimeString("tr-TR")}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Genel Bakış ──────────────────────────────────────────────────────────────
function Overview({ setTab, cryptoHook, borsaHook }) {
  const { coins, loading: cLoading, error: cError, secondsAgo } = cryptoHook;
  const { stocks, loading: bLoading, error: bError, lastUpdate: bUpdate } = borsaHook;

  return (
    <div className="space-y-5">
      {/* Özet kartlar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryCard label="BIST 100" value="11.842" color="text-emerald-400" sub="+1,24% bugün" />
        <SummaryCard label="USD/TRY"  value="35,92"  color="text-red-400"    sub="-0,08% bugün" />
        <SummaryCard
          label="Bitcoin"
          value={coins?.find((c) => c.symbol === "BTC")?.price ?? "—"}
          color="text-amber-300"
          sub={coins?.find((c) => c.symbol === "BTC")?.change}
          loading={cLoading}
        />
        <SummaryCard label="Altın (gr)" value="3.921 ₺" color="text-amber-300" sub="+0,43% bugün" />
      </div>

      {/* Fear & Greed endeksleri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FearGreedGauge label="Kripto — Korku & Açgözlülük Endeksi" value={67} icon={Bitcoin} />
        <FearGreedGauge label="Borsa — Korku & Açgözlülük Endeksi"  value={52} icon={BarChart2} />
      </div>

      {/* 3 mini tablo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* BIST */}
        <div className={`${neuCard} overflow-hidden`}>
          <PanelHeader
            title="BIST Hisseleri"
            icon={BarChart2}
            accentCls="bg-emerald-400/10 border border-emerald-400/20 text-emerald-400"
            badge="15 DK GECİKMELİ"
            error={bError}
            lastUpdate={bUpdate}
          />
          {bLoading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonMiniRow key={i} />)
            : (stocks ?? []).slice(0, 5).map((s) => <LivePriceRow key={s.symbol} item={s} />)
          }
          <button onClick={() => setTab("hisse")} className="w-full text-center text-gray-600 hover:text-gray-300 text-xs py-2.5 border-t border-white/[0.04] transition-colors cursor-pointer">
            Tümünü gör →
          </button>
        </div>

        {/* Döviz */}
        <div className={`${neuCard} overflow-hidden`}>
          <PanelHeader title="Döviz Kurları" icon={DollarSign} accentCls="bg-rose-400/10 border border-rose-400/20 text-rose-400" />
          {CURRENCY_DATA.slice(0, 5).map((s) => <LivePriceRow key={s.symbol} item={s} />)}
          <button onClick={() => setTab("doviz")} className="w-full text-center text-gray-600 hover:text-gray-300 text-xs py-2.5 border-t border-white/[0.04] transition-colors cursor-pointer">
            Tümünü gör →
          </button>
        </div>

        {/* Emtia */}
        <div className={`${neuCard} overflow-hidden`}>
          <PanelHeader title="Altın & Emtia" icon={Coins} accentCls="bg-amber-400/10 border border-amber-400/20 text-amber-400" />
          {COMMODITY_DATA.slice(0, 5).map((s) => <LivePriceRow key={s.symbol} item={s} />)}
          <button onClick={() => setTab("emtia")} className="w-full text-center text-gray-600 hover:text-gray-300 text-xs py-2.5 border-t border-white/[0.04] transition-colors cursor-pointer">
            Tümünü gör →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Kripto sekmesi ───────────────────────────────────────────────────────────
function CryptoTab({ cryptoHook }) {
  const { coins, loading, error, lastUpdate, secondsAgo } = cryptoHook;

  return (
    <>
      {/* Fear & Greed */}
      <div className="mb-5">
        <FearGreedGauge label="Kripto — Korku & Açgözlülük Endeksi" value={67} icon={Activity} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SummaryCard key={i} loading />)
          : [
              { label: "Piyasa Değ.", value: "2,87T $",  color: "text-sky-300", sub: "+1,4% 24s" },
              { label: "BTC Dom.",    value: "%59,6",    color: "text-amber-300" },
              { label: "BTC Fiyatı", value: coins?.find((c) => c.symbol === "BTC")?.price ?? "—", color: "text-emerald-400", sub: coins?.find((c) => c.symbol === "BTC")?.change },
              { label: "24s Hacim",  value: "112B $",   color: "text-[#E5E7EB]" },
            ].map((s) => <SummaryCard key={s.label} {...s} />)
        }
      </div>

      <div className={`${neuCard} overflow-hidden`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#E5E7EB] text-sm font-bold">Kripto Para Piyasası</span>
            <span className="text-[9px] text-emerald-400/80 border border-emerald-400/20 rounded px-1.5 py-0.5 font-bold">CANLI</span>
          </div>
          {lastUpdate && (
            <span className="flex items-center gap-1 text-[10px] text-gray-700">
              <Clock size={9} /> {secondsAgo}s önce
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.04] bg-white/[0.01]">
          <span className="w-5" />
          <span className="flex-1 text-gray-700 text-[10px] uppercase tracking-widest">Sembol</span>
          <span className="text-gray-700 text-[10px] uppercase tracking-widest hidden sm:block w-16 text-right">Grafik</span>
          <span className="text-gray-700 text-[10px] uppercase tracking-widest text-right w-24">Fiyat</span>
          <span className="text-gray-700 text-[10px] uppercase tracking-widest text-right w-14">24s %</span>
          <span className="text-gray-700 text-[10px] uppercase tracking-widest text-right w-20 hidden xl:block">Hacim</span>
        </div>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          : (coins ?? []).map((coin, i) => <LivePriceRow key={coin.symbol} item={coin} rank={i + 1} />)
        }
      </div>
    </>
  );
}

// ─── Hisse sekmesi ────────────────────────────────────────────────────────────
function HisseTab({ borsaHook }) {
  const { stocks, loading, error, lastUpdate } = borsaHook;

  return (
    <>
      {/* Gecikme uyarı bandı */}
      <DelayBanner lastUpdate={lastUpdate} />

      {/* Fear & Greed */}
      <div className="mb-5">
        <FearGreedGauge label="Borsa — Korku & Açgözlülük Endeksi" value={52} icon={Activity} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: "BIST 100",  value: "11.842", color: "text-emerald-400", sub: "+1,24% bugün" },
          { label: "BIST 30",   value: "15.491", color: "text-emerald-400", sub: "+0,98% bugün" },
          { label: "Hacim",     value: "₺42B",  color: "text-sky-300",    sub: "günlük" },
          { label: "Yük. / Düş.", value: "214 / 87", color: "text-[#E5E7EB]", sub: "hisse adedi" },
        ].map((s) => <SummaryCard key={s.label} {...s} />)}
      </div>

      <div className={`${neuCard} overflow-hidden`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <BarChart2 size={13} className="text-emerald-400/70" />
            <span className="text-[#E5E7EB] text-sm font-bold">BIST Hisse Senetleri</span>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-400 bg-amber-400/[0.08] border border-amber-400/20 rounded px-1.5 py-0.5">
              <Clock size={8} /> 15 DK GECİKMELİ
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-700">
            {error && <span className="text-amber-400/70 flex items-center gap-1"><AlertCircle size={9} /> Önbellek</span>}
            {lastUpdate && <span className="flex items-center gap-1"><Clock size={9} />{lastUpdate.toLocaleTimeString("tr-TR")}</span>}
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.04] bg-white/[0.01]">
          <span className="w-5" />
          <span className="flex-1 text-gray-700 text-[10px] uppercase tracking-widest">Sembol / Şirket</span>
          <span className="text-gray-700 text-[10px] uppercase tracking-widest hidden sm:block w-16 text-right">Grafik</span>
          <span className="text-gray-700 text-[10px] uppercase tracking-widest text-right w-24">Fiyat (₺)</span>
          <span className="text-gray-700 text-[10px] uppercase tracking-widest text-right w-14">%</span>
          <span className="text-gray-700 text-[10px] uppercase tracking-widest text-right w-20 hidden xl:block">Hacim</span>
        </div>

        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
          : (stocks ?? []).map((s, i) => <LivePriceRow key={s.symbol} item={s} rank={i + 1} />)
        }
      </div>
    </>
  );
}

// ─── Statik sekmeler (Emtia / Döviz) ─────────────────────────────────────────
const staticSummaries = {
  emtia: [
    { label: "Altın (Ons)", value: "3.108 $", color: "text-amber-300",  sub: "+0,43% bugün" },
    { label: "Gümüş (Ons)", value: "34,12 $", color: "text-gray-300",   sub: "-0,62% bugün" },
    { label: "Brent Petrol", value: "78,34 $", color: "text-red-400",   sub: "-0,91% bugün" },
    { label: "Altın (gr/TL)", value: "3.921 ₺", color: "text-amber-300", sub: "gram fiyatı" },
  ],
  doviz: [
    { label: "USD/TRY", value: "35,92", color: "text-red-400",     sub: "-0,08% bugün" },
    { label: "EUR/TRY", value: "38,47", color: "text-emerald-400", sub: "+0,19% bugün" },
    { label: "GBP/TRY", value: "45,83", color: "text-emerald-400", sub: "+0,31% bugün" },
    { label: "DXY",     value: "104,23", color: "text-red-400",    sub: "-0,12% bugün" },
  ],
};

// ─── Ana sayfa ─────────────────────────────────────────────────────────────────
export default function Markets() {
  const [tab, setTab] = useState("genel");
  const cryptoHook = useCryptoData();
  const borsaHook  = useBorsaData();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#E5E7EB]">Piyasalar</h1>
        <p className="text-gray-600 text-sm mt-1">Anlık ve gecikmeli piyasa verileri</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 bg-white/[0.03] rounded-xl p-1 border border-white/[0.04] overflow-x-auto w-fit max-w-full">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              tab === id
                ? "bg-white/[0.10] text-[#E5E7EB] border border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                : "text-gray-500 hover:text-gray-200"
            }`}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* İçerik */}
      {tab === "genel"  && <Overview setTab={setTab} cryptoHook={cryptoHook} borsaHook={borsaHook} />}
      {tab === "hisse"  && <HisseTab borsaHook={borsaHook} />}
      {tab === "kripto" && <CryptoTab cryptoHook={cryptoHook} />}

      {(tab === "emtia" || tab === "doviz") && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {staticSummaries[tab].map((s) => <SummaryCard key={s.label} {...s} />)}
          </div>
          <PriceTable data={tab === "emtia" ? COMMODITY_DATA : CURRENCY_DATA} loading={false} />
        </>
      )}
    </div>
  );
}
