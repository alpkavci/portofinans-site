import { LogoLockup } from "./Logo";
import { InstagramPhone, XPhone } from "./Phones";
import { BIO, LINKS, SLOGAN } from "../content";

const NAV = [
  { href: "#paylasimlar", label: "Paylaşımlar" },
  { href: "#nasil", label: "Nasıl çalışıyoruz" },
  { href: "#is-birligi", label: "İş birliği" },
];

export function PillLink({ href, children, variant = "solid", className = "" }) {
  const styles =
    variant === "solid"
      ? "bg-white text-gece hover:bg-kopuk"
      : "border border-white/40 text-white hover:border-white hover:bg-white/5";
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  return (
    <header className="dalga-deseni relative overflow-hidden bg-okyanus">
      <nav aria-label="Ana menü" className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-5 md:px-10">
        <a href="#" aria-label="PortoFinans ana sayfa" className="shrink-0">
          <LogoLockup size={46} />
        </a>
        <div className="flex items-center gap-1 md:gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden text-[15px] font-medium text-white/85 transition-colors hover:text-white md:inline"
            >
              {item.label}
            </a>
          ))}
          <PillLink href={LINKS.instagram} className="min-h-11 px-5 text-[14px]">
            Takip Et
          </PillLink>
        </div>
      </nav>

      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 pt-10 pb-20 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:pt-16 lg:pb-28">
        <div>
          <h1 className="text-[38px] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]">
            {BIO}
          </h1>
          <div className="mt-8 border-t border-white/20 pt-6">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] font-medium text-white/90 sm:text-[17px]">
              {SLOGAN.map((word, i) => (
                <span key={word} className="flex items-center gap-3 whitespace-nowrap">
                  {word}
                  {i < SLOGAN.length - 1 && <span aria-hidden="true" className="text-white/40">•</span>}
                </span>
              ))}
            </p>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PillLink href={LINKS.instagram}>Instagram'da Takip Et</PillLink>
            <PillLink href={LINKS.x} variant="outline">X'te Takip Et</PillLink>
          </div>
          <p className="mt-4 text-[13px] text-sis">@portofinans · Instagram ve X</p>
        </div>

        <div className="relative flex justify-center lg:h-[600px] lg:justify-end">
          <XPhone className="absolute top-20 right-[230px] hidden scale-[0.92] opacity-95 xl:block" />
          <InstagramPhone className="relative" />
        </div>
      </div>
    </header>
  );
}
