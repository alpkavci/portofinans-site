import { LogoIcon, LogoLockup } from "./Logo";
import { PillLink } from "./Hero";
import { FEATURED_POSTS, LINKS, NUMBER_CHECK, SOURCES, X_POST } from "../content";

function SectionTitle({ eyebrow, children, dark = true }) {
  return (
    <div>
      <p className={`text-[14px] font-semibold ${dark ? "text-deniz" : "text-okyanus-2"}`}>{eyebrow}</p>
      <h2
        className={`mt-3 text-[34px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[44px] ${dark ? "text-white" : "text-gece"}`}
      >
        {children}
      </h2>
    </div>
  );
}

// Instagram'daki kartın birebir dili: 4:5, koyu zemin, sol üstte logo, altta beyaz kalın cümle.
function PostCard({ post, className = "" }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      className={`group block overflow-hidden rounded-2xl border border-white/10 bg-black transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
    >
      <div className="flex items-center gap-2.5 px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sis">
          <LogoIcon size={18} />
        </span>
        <span className="text-[14px] font-semibold">portofinans</span>
        <span className="ml-auto text-[12px] text-white/50">Instagram</span>
      </div>
      <div className="dalga-deseni relative flex aspect-[4/5] flex-col justify-between bg-okyanus p-6">
        <LogoLockup size={40} className="self-start" />
        <p className="text-[19px] font-bold leading-[1.35] text-white sm:text-[21px]">{post.text}</p>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-[13px]">
        <span className="text-white/60">Kaynak: {post.source}</span>
        <span className="text-white/45">{post.date}</span>
      </div>
    </a>
  );
}

export function Posts() {
  return (
    <section id="paylasimlar" className="scroll-mt-6 bg-gece">
      <div className="mx-auto max-w-[1240px] px-5 py-24 md:px-10 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <SectionTitle eyebrow="Paylaşımlar">Instagram ve X'te neler paylaşıyoruz?</SectionTitle>
          <p className="max-w-md text-[17px] leading-relaxed text-sis">
            Ekonomi ve finans gündeminden tek cümlelik haberler. Her birinin sonunda kaynağı yazar.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:items-start">
          {FEATURED_POSTS.map((post, i) => (
            <PostCard key={post.url} post={post} className={i === 1 ? "md:mt-16" : ""} />
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <a
            href={LINKS.x}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-white/10 bg-black p-6 transition-colors hover:border-white/25"
          >
            <div className="flex gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sis">
                <LogoIcon size={24} />
              </span>
              <div className="min-w-0">
                <p className="text-[15px]">
                  <span className="font-bold">PortoFinans</span>{" "}
                  <span className="text-white/50">@portofinans · {X_POST.date} · X</span>
                </p>
                <p className="mt-2 text-[16px] leading-relaxed text-white/90">{X_POST.text}</p>
              </div>
            </div>
          </a>
          <div className="flex flex-col justify-center divide-y divide-white/10 border-y border-white/10">
            <FollowRow name="Instagram" href={LINKS.instagram} />
            <FollowRow name="X" href={LINKS.x} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FollowRow({ name, href }) {
  return (
    <div className="flex items-center justify-between py-5">
      <div>
        <p className="text-[20px] font-bold">{name}</p>
        <p className="text-[14px] text-sis">@portofinans</p>
      </div>
      <PillLink href={href} className="min-h-11 px-5 text-[14px]">
        Takip Et
      </PillLink>
    </div>
  );
}

function Highlighted({ text, parts }) {
  // Yayınlanan cümlede kaynakla karşılaştırılan rakamları vurgular.
  const pattern = new RegExp(`(${parts.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((chunk, i) =>
    parts.includes(chunk) ? (
      <mark key={i} className="rounded bg-[#DCE9FA] px-1 text-gece">
        {chunk}
      </mark>
    ) : (
      <span key={i}>{chunk}</span>
    ),
  );
}

export function HowWeWork() {
  return (
    <section id="nasil" className="scroll-mt-6 bg-kopuk text-gece">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 md:px-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:py-32">
        <div>
          <p className="text-[14px] font-semibold text-okyanus-2">Nasıl çalışıyoruz</p>
          <p className="mt-5 text-[26px] font-bold leading-[1.35] tracking-[-0.01em] sm:text-[34px]">
            Haberleri güvenilir kaynaklardan derliyoruz. Yapay zekâ desteğiyle yazıyoruz.{" "}
            <span className="text-okyanus-2">Her rakamı yayından önce kaynakla karşılaştırıyoruz.</span>{" "}
            <span className="text-[#5B6B85]">Yorum ve yatırım tavsiyesi vermiyoruz.</span>
          </p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Takip ettiğimiz kaynaklar">
            {SOURCES.map((s) => (
              <li key={s} className="rounded-full border border-[#C9D6EA] bg-white px-4 py-2 text-[14px] font-medium">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <figure className="rounded-2xl bg-white p-6 shadow-[0_24px_48px_-24px_rgba(10,17,40,0.25)]">
          <figcaption className="text-[12px] font-semibold text-[#5B6B85]">Paylaşımımız · 22 Ekim 2026</figcaption>
          <p className="mt-2 text-[18px] font-bold leading-relaxed">
            <Highlighted text="TCMB, politika faizini 100 baz puan indirerek yüzde 37'den yüzde 36'ya çekti." parts={NUMBER_CHECK.published} />
          </p>
          <dl className="mt-5 divide-y divide-[#E4EBF5] border-y border-[#E4EBF5] text-[14px]">
            {NUMBER_CHECK.rows.map((row) => (
              <div key={row.label} className="flex justify-between py-2.5">
                <dt className="text-[#5B6B85]">Kaynakta: {row.label}</dt>
                <dd className="font-semibold">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 flex items-center justify-between rounded-full bg-gece px-5 py-3 text-[14px] font-semibold text-white">
            <span>Rakamlar eşleşti</span>
            <span className="text-deniz">Yayınlandı</span>
          </p>
          <p className="mt-3 text-[12px] text-[#5B6B85]">Rakam tutmazsa haber yayınlanmaz.</p>
        </figure>
      </div>
    </section>
  );
}

export function Partnership() {
  return (
    <section id="is-birligi" className="scroll-mt-6 bg-white text-gece">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-24 md:px-10 lg:grid-cols-2 lg:items-end lg:py-28">
        <div>
          <SectionTitle eyebrow="Reklam ve iş birliği" dark={false}>
            Markanızı finans gündemini takip eden okurlarla buluşturun.
          </SectionTitle>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[#43526B]">
            Sponsorlu içerik ve iş birliği teklifleri için bize e-posta gönderin. Sponsorlu içerikler her zaman açıkça etiketlenir.
          </p>
        </div>
        <div className="lg:text-right">
          <a
            href={`mailto:${LINKS.email}`}
            className="text-[22px] font-bold tracking-[-0.02em] text-gece underline decoration-[#C9D6EA] decoration-2 underline-offset-8 hover:decoration-okyanus-2 sm:text-[40px]"
          >
            {LINKS.email}
          </a>
          <div className="mt-8 lg:flex lg:justify-end">
            <a
              href={`mailto:${LINKS.email}?subject=${encodeURIComponent("PortoFinans iş birliği")}`}
              className="inline-flex min-h-12 items-center rounded-full bg-gece px-6 text-[15px] font-semibold text-white hover:bg-okyanus"
            >
              E-posta gönder
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="dalga-deseni overflow-hidden bg-okyanus">
      <div className="mx-auto max-w-[1240px] px-5 pt-14 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <LogoLockup size={40} className="self-start" />
          <nav aria-label="Alt menü" className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-white/85">
            <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
            <a href={LINKS.x} target="_blank" rel="noreferrer" className="hover:text-white">X</a>
            <a href={`mailto:${LINKS.email}`} className="hover:text-white">{LINKS.email}</a>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-[13px] text-sis md:flex-row md:justify-between">
          <p>Burada yer alan bilgiler yatırım tavsiyesi değildir.</p>
          <p>© {new Date().getFullYear()} PortoFinans</p>
        </div>
        <p
          aria-hidden="true"
          className="mt-6 -mb-[0.18em] select-none text-center text-[clamp(44px,11vw,158px)] font-bold leading-none tracking-[0.04em] text-white"
        >
          PortoFinans
        </p>
      </div>
    </footer>
  );
}
