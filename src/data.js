// ─── SHARED DATA ─────────────────────────────────────────────────────────────

export const TICKER_DATA = [
  { symbol: "BIST 100", price: "11.842,34", change: "+1,24%", up: true },
  { symbol: "BTC/USD",  price: "87.412,00", change: "+2,87%", up: true },
  { symbol: "ALTIN (gr)", price: "3.921,50", change: "+0,43%", up: true },
  { symbol: "GÜMÜŞ (gr)", price: "42,18",   change: "-0,62%", up: false },
  { symbol: "EUR/TRY",  price: "38,47",     change: "+0,19%", up: true },
  { symbol: "USD/TRY",  price: "35,92",     change: "-0,08%", up: false },
  { symbol: "ETH/USD",  price: "3.287,00",  change: "+1,55%", up: true },
  { symbol: "BRENT",    price: "78,34",     change: "-0,91%", up: false },
];

// ─── HABERLER (4 kategori: Analiz | Kripto | Hisse | Döviz) ──────────────────
export const NEWS_DATA = [
  {
    id: 1,
    category: "Analiz",
    title: "Merkez Bankası faiz kararını açıkladı: Beklentilerin altında gerileme",
    summary:
      "TCMB Para Politikası Kurulu, haziran toplantısında politika faizini 250 baz puan indirerek %42,50'ye düşürdü. Piyasalar bu kararı olumlu karşıladı.",
    time: "14 dk önce",
    source: "Bloomberg HT",
    hot: true,
    featured: true,
  },
  {
    id: 2,
    category: "Kripto",
    title: "Bitcoin 90.000 dolar eşiğini test ediyor: Analistler ne diyor?",
    summary:
      "BTC, son 24 saatte %3'ün üzerinde değer kazanarak teknik dirençlere yaklaştı. Kurumsal alıcılar pozisyon artırıyor.",
    time: "32 dk önce",
    source: "CoinDesk TR",
    hot: true,
    featured: false,
  },
  {
    id: 3,
    category: "Analiz",
    title: "Altın ons fiyatı rekor kırdı: Jeopolitik gerginlik yukarı taşıyor",
    summary:
      "Küresel belirsizliklerin artmasıyla güvenli liman talebi yükselen altın, ons başına 3.100 dolar seviyesini aştı.",
    time: "1 sa önce",
    source: "Reuters",
    hot: false,
    featured: false,
  },
  {
    id: 4,
    category: "Analiz",
    title: "Enflasyon verisi açıklandı: Çekirdek enflasyonda iyileşme sinyali",
    summary:
      "TÜİK verisine göre yıllık enflasyon %61,4 ile beklentilerin altında geldi; çekirdek göstergeler gerilemeye devam ediyor.",
    time: "2 sa önce",
    source: "AA Ekonomi",
    hot: false,
    featured: false,
  },
  {
    id: 5,
    category: "Kripto",
    title: "Ethereum güncellemesi ertelendi: Geliştiriciler yeni takvim açıkladı",
    summary:
      "Ethereum Foundation'ın planlanan ağ güncellemesinin teknik aksaklıklar nedeniyle ertelendiği duyuruldu.",
    time: "3 sa önce",
    source: "Decrypt",
    hot: false,
    featured: false,
  },
  {
    id: 6,
    category: "Analiz",
    title: "Brent petrol 80 dolar altında: OPEC+ toplantısı bekleniyor",
    summary:
      "Talep endişeleri ve dolar güçlenmesiyle petrol fiyatları baskı altında. OPEC+ üretim kararları gözlemleniyor.",
    time: "4 sa önce",
    source: "S&P Global",
    hot: false,
    featured: false,
  },
  {
    id: 7,
    category: "Hisse",
    title: "BIST 100, 12.000 puan eşiğine koşuyor: Bankacılık sektörü öncülük ediyor",
    summary:
      "BIST 100 endeksi, yabancı yatırımcıların alımlarıyla güçlü bir seyir izliyor. Bankacılık sektörü hisseleri ortalama %2,1 artışıyla öne çıkarken, GARAN ve AKBNK rekor yakınında kapandı.",
    time: "1 sa önce",
    source: "Borsa Gündem",
    hot: true,
    featured: false,
  },
  {
    id: 8,
    category: "Döviz",
    title: "Dolar/TL 35,90'ın altına geriledi: TCMB müdahalesi gündemde",
    summary:
      "USD/TRY kuru, TCMB'nin döviz rezervlerini artırma adımlarının ardından geri çekildi. Analistler kısa vadede 35,50-36,20 bandını bekliyor.",
    time: "2 sa önce",
    source: "Foreks",
    hot: true,
    featured: false,
  },
  {
    id: 9,
    category: "Analiz",
    title: "Türkiye büyüme verisi açıklandı: İlk çeyrekte %5,2 ile beklentileri aştı",
    summary:
      "TÜİK verilerine göre Türkiye ekonomisi ilk çeyrekte yıllık bazda %5,2 büyüdü. İç tüketim ve turizm gelirlerindeki artış başlıca katkı sağlayıcılar arasında yer aldı.",
    time: "3 sa önce",
    source: "AA Ekonomi",
    hot: false,
    featured: false,
  },
  {
    id: 10,
    category: "Hisse",
    title: "Garanti Bankası hedef fiyatı güncellendi: Yabancı bankalar pozisyon artırıyor",
    summary:
      "Goldman Sachs ve JP Morgan'ın GARAN için hedef fiyatlarını sırasıyla 210 ve 205 TL'ye yükseltmesi, hissede %2,3'lük güçlü bir kapanışa neden oldu.",
    time: "4 sa önce",
    source: "Borsa Gündem",
    hot: false,
    featured: false,
  },
  {
    id: 11,
    category: "Döviz",
    title: "Euro/TL 38,50 direnç bölgesini test ediyor: Avrupa enflasyon verisi izlenecek",
    summary:
      "EUR/TRY paritesi, Avrupa Merkez Bankası'nın faiz kararı öncesinde 38,50 seviyesini yakından takip ediyor. Türkiye cari açık verisi paritenin yönünü belirlemede kritik rol oynayacak.",
    time: "5 sa önce",
    source: "Reuters Türkiye",
    hot: false,
    featured: false,
  },
  {
    id: 12,
    category: "Analiz",
    title: "Merkez bankaları rekor altın alımı gerçekleştirdi: Türkiye de listede",
    summary:
      "Dünya Altın Konseyi verilerine göre merkez bankaları 2024'ün ilk çeyreğinde 290 ton altın satın aldı. Türkiye Cumhuriyet Merkez Bankası bu alımların %8'ini gerçekleştirdi.",
    time: "7 sa önce",
    source: "Bloomberg",
    hot: false,
    featured: false,
  },
];

export const MARKET_SUMMARY = [
  { label: "BIST 100",      value: "11.842", change: "+1,24%", up: true  },
  { label: "BIST 30",       value: "15.491", change: "+0,98%", up: true  },
  { label: "Dolar Endeksi", value: "104,23", change: "-0,12%", up: false },
  { label: "Altın (Ons)",   value: "3.108 $", change: "+0,43%", up: true  },
  { label: "Brent",         value: "78,34 $", change: "-0,91%", up: false },
  { label: "VIX",           value: "18,42",  change: "-2,10%", up: false },
];

// ─── MARKETS PAGE DATA ────────────────────────────────────────────────────────

export const BIST_STOCKS = [
  { symbol: "GARAN", name: "Garanti Bankası",        price: "186,40", change: "+2,31%", up: true,  volume: "1,2B",  mktCap: "₺782B", spark: [170,172,168,175,180,178,183,186] },
  { symbol: "THYAO", name: "Türk Hava Yolları",      price: "308,25", change: "+1,87%", up: true,  volume: "892M",  mktCap: "₺432B", spark: [295,298,292,300,303,305,307,308] },
  { symbol: "AKBNK", name: "Akbank",                 price: "62,45",  change: "+1,12%", up: true,  volume: "654M",  mktCap: "₺261B", spark: [60,61,59,61,62,61,62,62] },
  { symbol: "EREGL", name: "Ereğli Demir Çelik",     price: "48,82",  change: "-0,73%", up: false, volume: "412M",  mktCap: "₺194B", spark: [50,49,50,49,48,49,48,48] },
  { symbol: "KCHOL", name: "Koç Holding",            price: "215,60", change: "+0,56%", up: true,  volume: "334M",  mktCap: "₺651B", spark: [213,212,214,215,214,215,216,215] },
  { symbol: "TUPRS", name: "Tüpraş",                 price: "184,30", change: "-1,20%", up: false, volume: "287M",  mktCap: "₺148B", spark: [188,187,186,185,184,185,184,184] },
  { symbol: "SISE",  name: "Şişe Cam",               price: "37,64",  change: "+0,91%", up: true,  volume: "256M",  mktCap: "₺82B",  spark: [36,37,36,37,37,37,38,37] },
  { symbol: "BIMAS", name: "BİM Birleşik Mağazalar", price: "512,00", change: "-0,38%", up: false, volume: "198M",  mktCap: "₺354B", spark: [515,514,513,512,513,512,511,512] },
];

export const CRYPTO_DATA = [
  { symbol: "BTC", name: "Bitcoin",   price: "87.412,00 $", change: "+2,87%", up: true,  volume: "42,3B $", mktCap: "1,71T $", spark: [82000,83000,85000,84000,86000,85500,87000,87412] },
  { symbol: "ETH", name: "Ethereum",  price: "3.287,00 $",  change: "+1,55%", up: true,  volume: "18,7B $", mktCap: "394B $",  spark: [3100,3150,3200,3180,3220,3250,3270,3287] },
  { symbol: "BNB", name: "BNB",       price: "612,40 $",    change: "-0,43%", up: false, volume: "2,1B $",  mktCap: "89B $",   spark: [620,618,615,614,613,614,612,612] },
  { symbol: "SOL", name: "Solana",    price: "174,85 $",    change: "+4,21%", up: true,  volume: "5,8B $",  mktCap: "83B $",   spark: [165,167,168,170,171,173,174,174] },
  { symbol: "XRP", name: "XRP",       price: "0,5842 $",    change: "-1,12%", up: false, volume: "3,2B $",  mktCap: "32B $",   spark: [0.59,0.589,0.588,0.586,0.585,0.585,0.584,0.584] },
  { symbol: "ADA", name: "Cardano",   price: "0,4521 $",    change: "+0,87%", up: true,  volume: "812M $",  mktCap: "16B $",   spark: [0.44,0.445,0.448,0.449,0.450,0.451,0.452,0.452] },
  { symbol: "AVAX", name: "Avalanche",price: "38,72 $",     change: "+3,14%", up: true,  volume: "923M $",  mktCap: "16B $",   spark: [36,37,37.5,38,38.2,38.5,38.6,38.7] },
  { symbol: "DOT", name: "Polkadot",  price: "7,84 $",      change: "-2,03%", up: false, volume: "412M $",  mktCap: "11B $",   spark: [8.1,8.0,7.9,7.85,7.82,7.85,7.83,7.84] },
];

export const COMMODITY_DATA = [
  { symbol: "XAU",   name: "Altın (Ons)",    price: "3.108,40 $", changeTRY: "3.921,50 ₺/gr", change: "+0,43%", up: true,  spark: [3050,3060,3070,3080,3090,3095,3100,3108] },
  { symbol: "XAG",   name: "Gümüş (Ons)",    price: "34,12 $",    changeTRY: "42,18 ₺/gr",    change: "-0,62%", up: false, spark: [34.5,34.4,34.3,34.2,34.15,34.1,34.12,34.12] },
  { symbol: "BRENT", name: "Brent Petrol",    price: "78,34 $",    changeTRY: "—",              change: "-0,91%", up: false, spark: [80,79.5,79,78.8,78.5,78.3,78.4,78.34] },
  { symbol: "WTI",   name: "WTI Ham Petrol",  price: "74,58 $",    changeTRY: "—",              change: "-0,75%", up: false, spark: [76,75.5,75,74.8,74.6,74.5,74.6,74.58] },
  { symbol: "CU",    name: "Bakır",           price: "4,38 $",     changeTRY: "—",              change: "+1,02%", up: true,  spark: [4.30,4.32,4.33,4.35,4.36,4.37,4.38,4.38] },
  { symbol: "NG",    name: "Doğal Gaz",       price: "2,64 $",     changeTRY: "—",              change: "-1,48%", up: false, spark: [2.72,2.70,2.68,2.67,2.65,2.65,2.64,2.64] },
];

export const CURRENCY_DATA = [
  { symbol: "USD/TRY", name: "Dolar / Türk Lirası",   price: "35,9240", change: "-0,08%", up: false, spark: [36.1,36.0,35.98,35.96,35.94,35.93,35.92,35.92] },
  { symbol: "EUR/TRY", name: "Euro / Türk Lirası",    price: "38,4710", change: "+0,19%", up: true,  spark: [38.2,38.3,38.35,38.4,38.42,38.45,38.47,38.47] },
  { symbol: "GBP/TRY", name: "Sterlin / Türk Lirası", price: "45,8320", change: "+0,31%", up: true,  spark: [45.5,45.6,45.65,45.7,45.75,45.78,45.83,45.83] },
  { symbol: "EUR/USD", name: "Euro / Dolar",           price: "1,0710",  change: "+0,15%", up: true,  spark: [1.067,1.068,1.069,1.070,1.071,1.071,1.071,1.071] },
  { symbol: "GBP/USD", name: "Sterlin / Dolar",        price: "1,2762",  change: "+0,24%", up: true,  spark: [1.271,1.272,1.274,1.275,1.276,1.276,1.276,1.276] },
  { symbol: "JPY/TRY", name: "Japon Yeni / TL",        price: "0,2384",  change: "-0,12%", up: false, spark: [0.240,0.239,0.239,0.238,0.238,0.238,0.238,0.238] },
];

// ─── STYLE HELPERS (premium dark palette #0A1128) ────────────────────────────

export const neuCard =
  "bg-[#111928]/80 backdrop-blur-sm rounded-2xl border border-white/[0.05] " +
  "shadow-[0_4px_32px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.04)_inset]";

export const neuCardHover =
  "hover:shadow-[0_8px_40px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.07)_inset] hover:border-white/[0.09]";

export const neuInner =
  "bg-[#0D1520]/90 rounded-xl border border-white/[0.04] " +
  "shadow-[inset_0_2px_8px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.03)]";

// ─── KATEGORİ SİSTEMİ (4 haber kategorisi) ───────────────────────────────────

export const CATEGORY_COLORS = {
  Analiz: "text-sky-300    bg-sky-300/[0.08]    border-sky-300/20",
  Kripto: "text-violet-300 bg-violet-300/[0.08] border-violet-300/20",
  Hisse:  "text-emerald-300 bg-emerald-300/[0.08] border-emerald-300/20",
  Döviz:  "text-rose-300   bg-rose-300/[0.08]   border-rose-300/20",
};
