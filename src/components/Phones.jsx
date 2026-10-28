import { LogoIcon, LogoLockup } from "./Logo";
import { BIO, GRID_POSTS, X_POST } from "../content";

function PhoneFrame({ children, className = "" }) {
  return (
    <div
      className={`w-[290px] rounded-[44px] border border-white/15 bg-black p-[10px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[34px] bg-black">
        <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-semibold text-white">
          <span>9:41</span>
          <span className="h-[18px] w-[72px] rounded-full bg-white/10" aria-hidden="true" />
          <span className="h-[9px] w-[18px] rounded-[3px] border border-white/60" aria-hidden="true" />
        </div>
        {children}
      </div>
    </div>
  );
}

// Instagram ızgarasındaki küçük kart: koyu zemin, sol üstte logo, altta beyaz kalın cümle.
function MiniCard({ text, tone }) {
  return (
    <div className={`dalga-deseni relative flex aspect-[4/5] flex-col justify-between p-1.5 ${tone}`}>
      <LogoIcon size={12} className="self-start" />
      <p className="text-[6.5px] font-bold leading-[1.25] text-white">{text}</p>
    </div>
  );
}

const TONES = ["bg-okyanus", "bg-gece-2", "bg-[#16335E]", "bg-[#132A4F]", "bg-okyanus", "bg-gece-2"];

export function InstagramPhone({ className = "" }) {
  return (
    <PhoneFrame className={className}>
      <div className="bg-black px-4 pb-3 text-white" role="img" aria-label="PortoFinans Instagram profili">
        <p className="text-[15px] font-bold">portofinans</p>
        <div className="mt-3 flex items-center gap-4">
          <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-sis">
            <LogoLockup size={28} />
          </span>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold">PortoFinans</p>
            <p className="text-[10px] text-white/55">İş ve Ekonomi Sitesi</p>
          </div>
        </div>
        <p className="mt-3 text-[10.5px] leading-snug text-white/85">⚓ {BIO}</p>
        <p className="mt-1 text-[10.5px] text-deniz">x.com/portofinans</p>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <span className="rounded-lg bg-okyanus-2 py-1.5 text-center text-[10.5px] font-semibold">Takip Et</span>
          <span className="rounded-lg bg-white/10 py-1.5 text-center text-[10.5px] font-semibold">Mesaj Gönder</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[2px] bg-black pb-5">
        {GRID_POSTS.map((text, i) => (
          <MiniCard key={text} text={text} tone={TONES[i % TONES.length]} />
        ))}
      </div>
    </PhoneFrame>
  );
}

export function XPhone({ className = "" }) {
  return (
    <PhoneFrame className={className}>
      <div className="bg-black pb-6 text-white" role="img" aria-label="PortoFinans X profili">
        <div className="flex items-center gap-3 px-4 pb-2">
          <span className="text-[15px]" aria-hidden="true">←</span>
          <div>
            <p className="text-[13px] font-bold">PortoFinans</p>
            <p className="text-[10px] text-white/50">X</p>
          </div>
        </div>
        <div className="dalga-deseni-yogun flex h-[92px] items-center justify-center bg-okyanus">
          <span className="text-[17px] font-semibold tracking-[0.18em] text-white">PortoFinans</span>
        </div>
        <div className="px-4">
          <span className="-mt-8 flex h-[64px] w-[64px] items-center justify-center rounded-full border-4 border-black bg-sis">
            <LogoLockup size={26} />
          </span>
          <p className="mt-2 text-[14px] font-bold">PortoFinans</p>
          <p className="text-[11px] text-white/50">@portofinans</p>
          <p className="mt-2 text-[11px] leading-snug text-white/85">⚓ {BIO}</p>
          <p className="mt-1 text-[10.5px] text-white/50">Medya ve Habercilik Şirketi · instagram.com/portofinans</p>
        </div>
        <div className="mt-4 border-t border-white/10 px-4 pt-3">
          <div className="flex gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sis">
              <LogoIcon size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px]">
                <span className="font-bold">PortoFinans</span>{" "}
                <span className="text-white/50">@portofinans · {X_POST.date}</span>
              </p>
              <p className="mt-1 text-[11px] leading-snug text-white/90">{X_POST.text}</p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
