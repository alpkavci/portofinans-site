import { BarChart2, TrendingUp, TrendingDown } from "lucide-react";
import { MARKET_SUMMARY, neuCard, neuInner } from "../data";

export default function MarketWidget() {
  return (
    <div className={`${neuCard} overflow-hidden border border-white/[0.05]`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]">
        <BarChart2 size={13} className="text-slate-400" />
        <span className="text-slate-100 text-sm font-semibold">Piyasa Durumu</span>
        <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <div className="divide-y divide-white/[0.04]">
        {MARKET_SUMMARY.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.03] transition-colors"
          >
            <span className="text-slate-400 text-xs">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-100 text-xs font-semibold tabular-nums">{item.value}</span>
              <span
                className={`flex items-center gap-0.5 text-[11px] font-bold tabular-nums ${
                  item.up ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {item.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-white/[0.05] grid grid-cols-2 gap-2">
        {[
          { label: "Yükselen", value: "214", color: "text-emerald-400" },
          { label: "Düşen",    value: "87",  color: "text-red-400"     },
          { label: "Değişmeyen", value: "31",  color: "text-slate-400"  },
          { label: "Hacim",    value: "₺42B", color: "text-sky-300"    },
        ].map((s) => (
          <div key={s.label} className={`${neuInner} p-2.5 text-center`}>
            <p className={`text-sm font-black ${s.color}`}>{s.value}</p>
            <p className="text-slate-600 text-[10px] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
