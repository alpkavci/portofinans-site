import { useState, useRef, useEffect } from "react";
import { Search, X, TrendingUp, TrendingDown, Newspaper, Bitcoin, BarChart2, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NEWS_DATA, BIST_STOCKS, CRYPTO_DATA, CURRENCY_DATA, CATEGORY_COLORS } from "../data";

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-sky-400/25 text-sky-200 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Keyboard shortcut Ctrl/Cmd + K
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on outside click
  useEffect(() => {
    function onClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const q = query.trim().toLowerCase();

  const newsResults = q.length >= 2
    ? NEWS_DATA.filter((n) =>
        n.title.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const stockResults = q.length >= 1
    ? BIST_STOCKS.filter((s) =>
        s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const cryptoResults = q.length >= 1
    ? CRYPTO_DATA.filter((c) =>
        c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const currencyResults = q.length >= 1
    ? CURRENCY_DATA.filter((c) =>
        c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const hasResults =
    newsResults.length > 0 || stockResults.length > 0 || cryptoResults.length > 0 || currencyResults.length > 0;

  function goTo(path) {
    setOpen(false);
    setQuery("");
    navigate(path);
  }

  return (
    <div ref={wrapperRef} className="relative">
      {/* Toggle button / input */}
      {open ? (
        <div className="flex items-center gap-2 bg-white/[0.07] border border-white/20 rounded-xl px-3 py-2 w-64 transition-all">
          <Search size={14} className="text-white/40 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Haber, hisse veya kripto ara..."
            className="bg-transparent text-white text-sm placeholder:text-white/25 outline-none flex-1 min-w-0"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-white/30 hover:text-white/60 transition-colors">
              <X size={13} />
            </button>
          )}
          <span className="hidden sm:inline text-white/15 text-[10px] border border-white/10 rounded px-1 py-0.5 font-mono">
            ESC
          </span>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 rounded-xl px-3 py-2 transition-all duration-200 cursor-pointer group"
        >
          <Search size={14} className="text-white/40 group-hover:text-white/70 transition-colors" />
          <span className="hidden lg:inline text-white/25 text-sm">Ara...</span>
          <span className="hidden lg:inline text-white/15 text-[10px] border border-white/10 rounded px-1 py-0.5 font-mono">
            ⌘K
          </span>
        </button>
      )}

      {/* Results dropdown */}
      {open && q.length >= 1 && (
        <div
          className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/[0.10] overflow-hidden z-50"
          style={{
            background: "rgba(18,36,62,0.97)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {!hasResults ? (
            <div className="px-5 py-8 text-center text-white/25 text-sm">
              Sonuç bulunamadı
            </div>
          ) : (
            <div className="py-2 max-h-[420px] overflow-y-auto">
              {/* News results */}
              {newsResults.length > 0 && (
                <div>
                  <div className="px-4 py-2 flex items-center gap-2">
                    <Newspaper size={11} className="text-white/25" />
                    <span className="text-white/25 text-[10px] uppercase tracking-widest font-semibold">Haberler</span>
                  </div>
                  {newsResults.map((n) => {
                    const catColor = CATEGORY_COLORS[n.category] || "text-white/50";
                    const catText = catColor.split(" ")[0];
                    return (
                      <button
                        key={n.id}
                        onClick={() => goTo("/haberler")}
                        className="w-full text-left px-4 py-2.5 hover:bg-white/[0.06] transition-colors flex items-start gap-3"
                      >
                        <span className={`text-[10px] font-bold mt-0.5 flex-shrink-0 ${catText}`}>
                          {n.category.toUpperCase()}
                        </span>
                        <span className="text-white/70 text-xs leading-snug line-clamp-2">
                          {highlight(n.title, query)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Stock results */}
              {stockResults.length > 0 && (
                <div>
                  <div className="px-4 py-2 flex items-center gap-2 border-t border-white/[0.05]">
                    <BarChart2 size={11} className="text-white/25" />
                    <span className="text-white/25 text-[10px] uppercase tracking-widest font-semibold">BIST Hisseleri</span>
                  </div>
                  {stockResults.map((s) => (
                    <button
                      key={s.symbol}
                      onClick={() => goTo("/piyasalar")}
                      className="w-full text-left px-4 py-2.5 hover:bg-white/[0.06] transition-colors flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-black text-emerald-400">{s.symbol.slice(0, 3)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold">{highlight(s.symbol, query)}</p>
                        <p className="text-white/35 text-[10px] truncate">{s.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-xs font-bold tabular-nums">{s.price} ₺</p>
                        <p className={`text-[10px] font-bold flex items-center gap-0.5 justify-end ${s.up ? "text-emerald-400" : "text-red-400"}`}>
                          {s.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                          {s.change}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Crypto results */}
              {cryptoResults.length > 0 && (
                <div>
                  <div className="px-4 py-2 flex items-center gap-2 border-t border-white/[0.05]">
                    <Bitcoin size={11} className="text-white/25" />
                    <span className="text-white/25 text-[10px] uppercase tracking-widest font-semibold">Kripto</span>
                  </div>
                  {cryptoResults.map((c) => (
                    <button
                      key={c.symbol}
                      onClick={() => goTo("/kripto")}
                      className="w-full text-left px-4 py-2.5 hover:bg-white/[0.06] transition-colors flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-black text-amber-400">{c.symbol.slice(0, 3)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold">{highlight(c.symbol, query)}</p>
                        <p className="text-white/35 text-[10px]">{c.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-xs font-bold tabular-nums">{c.price}</p>
                        <p className={`text-[10px] font-bold flex items-center gap-0.5 justify-end ${c.up ? "text-emerald-400" : "text-red-400"}`}>
                          {c.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                          {c.change}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Currency results */}
              {currencyResults.length > 0 && (
                <div>
                  <div className="px-4 py-2 flex items-center gap-2 border-t border-white/[0.05]">
                    <DollarSign size={11} className="text-white/25" />
                    <span className="text-white/25 text-[10px] uppercase tracking-widest font-semibold">Döviz</span>
                  </div>
                  {currencyResults.map((c) => (
                    <button
                      key={c.symbol}
                      onClick={() => goTo("/piyasalar")}
                      className="w-full text-left px-4 py-2.5 hover:bg-white/[0.06] transition-colors flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-400/10 border border-rose-400/20 flex items-center justify-center flex-shrink-0">
                        <DollarSign size={12} className="text-rose-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold">{highlight(c.symbol, query)}</p>
                        <p className="text-white/35 text-[10px] truncate">{c.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-xs font-bold tabular-nums">{c.price}</p>
                        <p className={`text-[10px] font-bold flex items-center gap-0.5 justify-end ${c.up ? "text-emerald-400" : "text-red-400"}`}>
                          {c.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                          {c.change}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
