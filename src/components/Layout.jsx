import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Zap, TrendingUp, TrendingDown, Menu, X,
  Home, BarChart2, Newspaper, Bitcoin,
  Shield, AlertTriangle, Clock,
} from "lucide-react";
import PortoLogo from "./Logo";
import SearchBar from "./Search";
import { TICKER_DATA } from "../data";

const BG      = "#0A1128";
const HDR_BG  = "rgba(6,8,20,0.97)";
const TICK_BG = "#050810";

// ─── Ticker ──────────────────────────────────────────────────────────────────
function Ticker() {
  const repeated = [...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA];
  return (
    <div className="overflow-hidden relative border-b border-white/[0.04]" style={{ background: TICK_BG }}>
      <div className="flex items-center h-9">
        <div
          className="flex-shrink-0 flex items-center gap-1.5 px-4 h-full border-r border-white/[0.05] z-10"
          style={{ background: "linear-gradient(135deg,#0F1E40,#050810)", boxShadow: "4px 0 20px rgba(0,0,0,0.6)" }}
        >
          <Zap size={10} className="text-yellow-400" fill="currentColor" />
          <span className="text-[#E5E7EB] text-[10px] font-bold tracking-widest uppercase">Canlı</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-ticker whitespace-nowrap">
            {repeated.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 px-5 flex-shrink-0">
                <span className="text-gray-500 text-[11px] font-medium">{item.symbol}</span>
                <span className="text-[#E5E7EB] text-[11px] font-bold tabular-nums">{item.price}</span>
                <span className={`text-[11px] font-bold flex items-center gap-0.5 ${item.up ? "text-emerald-400" : "text-red-400"}`}>
                  {item.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {item.change}
                </span>
                <span className="text-white/[0.08] mx-0.5">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Nav linkleri ─────────────────────────────────────────────────────────────
const navLinks = [
  { to: "/",          label: "Ana Sayfa" },
  { to: "/piyasalar", label: "Piyasalar" },
  { to: "/haberler",  label: "Haberler"  },
  { to: "/kripto",    label: "Kripto"    },
];

// ─── Mobil alt navigasyon çubuğu ─────────────────────────────────────────────
const bottomItems = [
  { to: "/",          label: "Ana Sayfa", icon: Home     },
  { to: "/piyasalar", label: "Piyasalar", icon: BarChart2 },
  { to: "/haberler",  label: "Haberler",  icon: Newspaper },
  { to: "/kripto",    label: "Kripto",    icon: Bitcoin   },
];

function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom"
      style={{
        background: "rgba(6,8,20,0.98)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.5)",
      }}
    >
      <div className="flex items-stretch h-16">
        {bottomItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? "text-sky-400" : "text-gray-500 hover:text-gray-300"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? "bg-sky-400/10" : ""}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span className="text-[10px] font-semibold">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

// ─── Profesyonel Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="border-t border-white/[0.05] mt-16"
      style={{ background: "#060810" }}
    >
      {/* Ana footer içeriği */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Marka */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <PortoLogo size={30} />
              <span className="text-base font-black tracking-tight text-[#E5E7EB]">
                porto<span className="font-light opacity-50">finans</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Türkiye'nin finansal piyasalarını takip etmek için modern bir platform.
            </p>
          </div>

          {/* Sayfalar */}
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Sayfalar</p>
            <div className="flex flex-col gap-2">
              {navLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} className="text-gray-500 text-sm hover:text-gray-200 transition-colors">
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Veri kaynakları */}
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Veri Kaynakları</p>
            <div className="flex flex-col gap-2 text-gray-500 text-sm">
              <span>CoinGecko API — Kripto</span>
              <span>Yahoo Finance — BIST</span>
              <span>Manüel giriş — Haberler</span>
            </div>
          </div>

          {/* Yasal */}
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Yasal</p>
            <div className="flex flex-col gap-2 text-gray-500 text-sm">
              <span className="flex items-center gap-1.5">
                <Clock size={11} className="text-amber-400 flex-shrink-0" />
                BIST veriler 15 dk gecikmeli
              </span>
              <span className="flex items-center gap-1.5">
                <Shield size={11} className="text-sky-400 flex-shrink-0" />
                Gizlilik Politikası
              </span>
              <span className="flex items-center gap-1.5">
                <AlertTriangle size={11} className="text-amber-400 flex-shrink-0" />
                Kullanım Koşulları
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Yasal uyarı şeridi */}
      <div
        className="border-t border-white/[0.04] px-4 md:px-6 py-4"
        style={{ background: "rgba(0,0,0,0.3)" }}
      >
        <div className="max-w-7xl mx-auto space-y-2">
          {/* Gecikme uyarısı */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 bg-amber-400/[0.07] border border-amber-400/20 rounded-full px-3 py-1 text-amber-400 text-[10px] font-bold">
              <Clock size={10} /> 15 DK GECİKMELİ
            </span>
            <span className="text-gray-600 text-[11px]">
              BIST hisse ve endeks verileri 15 dakika gecikmeli olarak sunulmaktadır.
              Kripto para verileri anlık olarak CoinGecko API üzerinden güncellenmektedir.
            </span>
          </div>

          {/* Ana yasal uyarı */}
          <div className="flex items-start gap-2">
            <AlertTriangle size={12} className="text-amber-500/60 flex-shrink-0 mt-0.5" />
            <p className="text-gray-600 text-[10px] leading-relaxed">
              <span className="text-gray-400 font-semibold">YATIRIM TAVSİYESİ DEĞİLDİR: </span>
              Bu platformda yer alan tüm bilgiler, veriler, haberler ve analizler yalnızca genel bilgilendirme
              amacıyla sunulmaktadır. PortoFinans, herhangi bir finansal enstrüman için alım-satım tavsiyesi
              vermemekte; yatırım danışmanlığı, portföy yönetimi veya aracılık hizmeti sunmamaktadır.
              Yatırım kararlarınızı vermeden önce bir finansal danışmana başvurmanız tavsiye edilir.
              Geçmiş performans, gelecekteki sonuçların garantisi değildir.
            </p>
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-gray-700 text-[10px]">
              © 2025 PortoFinans. Tüm hakları saklıdır.
            </span>
            <span className="text-gray-700 text-[10px]">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function Layout({ children }) {
  const [time, setTime] = useState(new Date());
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Sayfa değişince hamburger menüyü kapat
  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <div className="min-h-screen text-[#E5E7EB]" style={{ background: BG }}>
      <Ticker />

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b border-white/[0.05]"
        style={{ background: HDR_BG, backdropFilter: "blur(24px)", boxShadow: "0 1px 30px rgba(0,0,0,0.7)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <PortoLogo size={32} />
            <span className="text-base font-black tracking-tight text-[#E5E7EB]">
              porto<span className="font-light opacity-40">finans</span>
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/[0.07] text-[#E5E7EB] border border-white/[0.07]"
                      : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop sağ */}
          <div className="hidden md:flex items-center gap-3">
            <SearchBar />
            <span className="text-gray-600 text-xs tabular-nums font-mono">
              {time.toLocaleTimeString("tr-TR")}
            </span>
            <div className="flex items-center gap-1.5 bg-emerald-400/[0.07] border border-emerald-400/20 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[10px] font-bold tracking-wide">CANLI</span>
            </div>
          </div>

          {/* Mobil sağ */}
          <div className="flex md:hidden items-center gap-2">
            <SearchBar />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] transition-colors cursor-pointer"
              aria-label="Menü"
            >
              {mobileOpen
                ? <X size={17} className="text-gray-300" />
                : <Menu size={17} className="text-gray-300" />
              }
            </button>
          </div>
        </div>

        {/* Mobil açılır menü */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/[0.05] px-4 py-3" style={{ background: "rgba(4,6,14,0.99)" }}>
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-white/[0.07] text-[#E5E7EB] border border-white/[0.07]"
                        : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.03]"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── İçerik (mobilde alt nav için padding) ────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 pb-24 md:pb-8">
        {children}
      </main>

      <Footer />

      {/* ── Mobil alt navigasyon ──────────────────────────────────────────── */}
      <BottomNav />
    </div>
  );
}
