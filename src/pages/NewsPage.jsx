import { useState } from "react";
import { Newspaper, LineChart, Bitcoin, TrendingUp, DollarSign } from "lucide-react";
import { NEWS_DATA, CATEGORY_COLORS, neuCard } from "../data";
import NewsCard from "../components/NewsCard";

const CATS = [
  { id: "Tümü",  label: "Tümü",   icon: Newspaper  },
  { id: "Analiz", label: "Analiz", icon: LineChart   },
  { id: "Kripto", label: "Kripto", icon: Bitcoin     },
  { id: "Hisse",  label: "Hisse",  icon: TrendingUp  },
  { id: "Döviz",  label: "Döviz",  icon: DollarSign  },
];

export default function NewsPage() {
  const [category, setCategory] = useState("Tümü");

  const filtered =
    category === "Tümü" ? NEWS_DATA : NEWS_DATA.filter((n) => n.category === category);

  return (
    <div className="flex gap-8">
      {/* ── Sol sidebar kategori filtresi (desktop) ── */}
      <aside className="hidden lg:block w-52 flex-shrink-0">
        <div className="sticky top-24">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-semibold mb-3 px-1">
            Kategoriler
          </p>
          <div className="flex flex-col gap-1">
            {CATS.map(({ id, label, icon: Icon }) => {
              const colorCls = CATEGORY_COLORS[id] || "";
              const [textCls] = colorCls.split(" ");
              const isActive = category === id;

              return (
                <button
                  key={id}
                  onClick={() => setCategory(id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                    isActive
                      ? "bg-white/[0.07] text-slate-50 border border-white/[0.08]"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-lg border text-[11px] flex-shrink-0 ${
                      isActive && id !== "Tümü" ? colorCls : "text-slate-500 bg-white/[0.03] border-white/[0.06]"
                    }`}
                  >
                    <Icon size={13} />
                  </span>
                  <span>{label}</span>
                  <span className="ml-auto text-slate-600 text-xs">
                    {id === "Tümü"
                      ? NEWS_DATA.length
                      : NEWS_DATA.filter((n) => n.category === id).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* ── Haber grid ── */}
      <div className="flex-1 min-w-0">
        {/* Mobil kategori pilleri */}
        <div className="flex gap-2 flex-wrap mb-5 lg:hidden">
          {CATS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setCategory(id)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all cursor-pointer ${
                category === id
                  ? "bg-slate-50 text-slate-900 border-slate-50"
                  : "bg-white/[0.04] border-white/[0.06] text-slate-400 hover:text-slate-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-5">
          <Newspaper size={15} className="text-slate-500" />
          <h2 className="text-base font-bold text-slate-50">
            {category === "Tümü" ? "Tüm Haberler" : `${category} Haberleri`}
          </h2>
          <span className="text-slate-600 text-xs">({filtered.length} haber)</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center text-slate-600 text-sm">
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
    </div>
  );
}
