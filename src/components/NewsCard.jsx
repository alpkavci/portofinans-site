import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  LineChart, Bitcoin, TrendingUp, DollarSign,
  Clock, Zap, X, Share2, Bookmark, BookmarkCheck,
  ExternalLink, ChevronRight,
} from "lucide-react";
import { neuCard, neuCardHover, CATEGORY_COLORS } from "../data";

const CATEGORY_ICONS = {
  Analiz: LineChart,
  Kripto: Bitcoin,
  Hisse:  TrendingUp,
  Döviz:  DollarSign,
};

// ─── Haber detay modalı ───────────────────────────────────────────────────────
function NewsModal({ news, onClose }) {
  const Icon     = CATEGORY_ICONS[news.category] || LineChart;
  const colorCls = CATEGORY_COLORS[news.category] || "text-gray-300 bg-white/[0.05] border-white/10";

  // Body scroll kilidi
  useEffect(() => {
    document.body.classList.add("modal-open");
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  async function handleShare() {
    const text = `${news.title} — Kaynak: ${news.source}`;
    if (navigator.share) {
      await navigator.share({ title: news.title, text, url: window.location.href }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(text).catch(() => {});
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(4,6,18,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border border-white/[0.07] overflow-hidden"
        style={{
          background: "#111928",
          boxShadow: "0 -8px 60px rgba(0,0,0,0.8)",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold border rounded-full px-2.5 py-0.5 ${colorCls}`}>
              <Icon size={11} />
              {news.category}
            </span>
            {news.hot && (
              <span className="inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-full px-2 py-0.5">
                <Zap size={9} className="text-red-400" fill="currentColor" />
                <span className="text-red-400 text-[10px] font-bold">SICAK</span>
              </span>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.10] transition-colors cursor-pointer">
            <X size={15} className="text-gray-400" />
          </button>
        </div>

        {/* Modal içeriği */}
        <div className="px-5 py-5">
          <h2 className="text-[#E5E7EB] text-lg font-bold leading-snug mb-4">{news.title}</h2>
          <p className="text-gray-400 text-sm leading-relaxed">{news.summary}</p>

          {/* Kaynak + zaman */}
          <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-1">Kaynak</p>
                <div className="flex items-center gap-1.5">
                  <ExternalLink size={12} className="text-sky-400 flex-shrink-0" />
                  <p className="text-[#E5E7EB] text-sm font-semibold">{news.source}</p>
                </div>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-1">Yayınlanma</p>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-gray-500 flex-shrink-0" />
                  <p className="text-[#E5E7EB] text-sm font-semibold">{news.time}</p>
                </div>
              </div>
            </div>

            {/* Yasal uyarı mini */}
            <p className="text-gray-700 text-[10px] leading-relaxed">
              Bu haber yalnızca bilgilendirme amaçlıdır. Yatırım tavsiyesi niteliği taşımaz.
            </p>
          </div>
        </div>

        {/* Paylaş butonu */}
        <div className="px-5 pb-5">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-500/[0.09] border border-sky-500/20 text-sky-400 text-sm font-semibold hover:bg-sky-500/[0.15] transition-colors cursor-pointer"
          >
            <Share2 size={15} />
            Haberi Paylaş
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Haber Kartı ─────────────────────────────────────────────────────────────
export default function NewsCard({ news, featured = false }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const Icon     = CATEGORY_ICONS[news.category] || LineChart;
  const colorCls = CATEGORY_COLORS[news.category] || "text-gray-300 bg-white/[0.05] border-white/10";

  function handleShare(e) {
    e.stopPropagation();
    const text = `${news.title} — ${news.source}`;
    if (navigator.share) navigator.share({ title: news.title, text }).catch(() => {});
    else navigator.clipboard.writeText(text).catch(() => {});
  }

  function handleSave(e) {
    e.stopPropagation();
    setSaved((v) => !v);
  }

  const cardBase = `group relative ${neuCard} ${neuCardHover} cursor-pointer
    transition-all duration-300 border border-white/[0.05] hover:border-white/[0.09]`;

  if (featured) {
    return (
      <>
        <article className={`${cardBase} p-6`} onClick={() => setModalOpen(true)}>
          <div className="flex items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold border rounded-full px-2.5 py-0.5 ${colorCls}`}>
              <Icon size={11} /> {news.category}
            </span>
            {news.hot && (
              <span className="inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-full px-2 py-0.5">
                <Zap size={9} className="text-red-400" fill="currentColor" />
                <span className="text-red-400 text-[10px] font-bold">SICAK</span>
              </span>
            )}
            <span className="ml-auto text-gray-600 text-[10px] flex items-center gap-1">
              <Clock size={9} /> {news.time}
            </span>
          </div>

          <h2 className="text-[#E5E7EB] text-xl font-bold leading-snug mb-3 group-hover:text-sky-200 transition-colors">
            {news.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{news.summary}</p>

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.05]">
            <span className="text-gray-600 text-xs font-medium">{news.source}</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSave}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                {saved
                  ? <BookmarkCheck size={14} className="text-sky-400" />
                  : <Bookmark size={14} className="text-gray-600 hover:text-gray-300" />
                }
              </button>
              <button
                onClick={handleShare}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                <Share2 size={14} className="text-gray-600 hover:text-gray-300" />
              </button>
              <span className="flex items-center gap-1 text-sky-400/60 text-xs group-hover:text-sky-400 transition-colors ml-1">
                Oku <ChevronRight size={13} />
              </span>
            </div>
          </div>
        </article>
        {modalOpen && <NewsModal news={news} onClose={() => setModalOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <article className={`${cardBase} p-4`} onClick={() => setModalOpen(true)}>
        {news.hot && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-full px-2 py-0.5">
            <Zap size={9} className="text-red-400" fill="currentColor" />
            <span className="text-red-400 text-[10px] font-bold">SICAK</span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold border rounded-full px-2.5 py-0.5 ${colorCls}`}>
            <Icon size={11} /> {news.category}
          </span>
          <span className="text-gray-700 text-[10px]">·</span>
          <span className="text-gray-600 text-[10px] flex items-center gap-1">
            <Clock size={9} /> {news.time}
          </span>
        </div>

        <h3 className="text-[#E5E7EB] text-sm font-semibold leading-snug mb-2 group-hover:text-sky-200 transition-colors line-clamp-2">
          {news.title}
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{news.summary}</p>

        {/* Alt bar: kaynak + ikonlar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.05]">
          <span className="text-gray-700 text-[10px] font-medium">{news.source}</span>
          <div className="flex items-center gap-0.5">
            <button
              onClick={handleSave}
              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] transition-colors"
            >
              {saved
                ? <BookmarkCheck size={12} className="text-sky-400" />
                : <Bookmark size={12} className="text-gray-700 hover:text-gray-400" />
              }
            </button>
            <button
              onClick={handleShare}
              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.06] transition-colors"
            >
              <Share2 size={12} className="text-gray-700 hover:text-gray-400" />
            </button>
            <ChevronRight size={13} className="text-gray-700 group-hover:text-sky-400 transition-colors ml-0.5" />
          </div>
        </div>
      </article>
      {modalOpen && <NewsModal news={news} onClose={() => setModalOpen(false)} />}
    </>
  );
}
