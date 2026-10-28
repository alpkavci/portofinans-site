// Sitedeki tüm metin ve bağlantılar. Paylaşımlar Instagram'daki gerçek gönderilerdir;
// ileride bot bu listeyi kendisi güncelleyebilir (ör. public/paylasimlar.json).

export const LINKS = {
  instagram: "https://www.instagram.com/portofinans/",
  x: "https://x.com/portofinans",
  email: "portofinans@gmail.com",
};

export const BIO = "PortoFinans, finans dünyasındaki gelişmeleri araştırır, doğrular ve sizlere sunar.";
export const SLOGAN = ["Hızlı", "Tarafsız", "Doğru", "Vizyonlu Habercilik"];

export const SOURCES = ["Anadolu Ajansı", "Bloomberg HT", "Habertürk", "Ekonomim", "TRT Haber"];

// Öne çıkan üç kart (Instagram kart metinleri birebir).
export const FEATURED_POSTS = [
  {
    date: "22 Ekim 2026",
    text: "TCMB, politika faizini 100 baz puan indirerek yüzde 37'den yüzde 36'ya çekti; karar metninde enflasyonun ana eğilimindeki gerilemeye dikkat çekildi. (TCMB)",
    source: "Habertürk",
    url: "https://www.instagram.com/p/Dey4TLFjVJy/",
  },
  {
    date: "28 Ekim 2026",
    text: "Eylülde ihracat yüzde 15,3 arttı, ithalat yüzde 5,6 yükseldi.",
    source: "Anadolu Ajansı",
    url: "https://www.instagram.com/p/DfB5nfvjd25/",
  },
  {
    date: "16 Ekim 2026",
    text: "MSCI'ın yeni uyarısının ardından BIST 100 endeksi dolar bazında 235 dolar seviyesine çekilerek Haziran 2025'ten bu yana en düşük düzeyini gördü.",
    source: "Bloomberg HT",
    url: "https://www.instagram.com/p/Dejic2ADt6X/",
  },
];

// Telefon görünümündeki Instagram ızgarası (kısa başlıklar).
export const GRID_POSTS = [
  "Eylülde ihracat yüzde 15,3 arttı",
  "Ekim enflasyon anketinde medyan beklenti yüzde 29,59",
  "Eylülde işsizlik oranı yüzde 8,4'e yükseldi",
  "TCMB politika faizini yüzde 36'ya indirdi",
  "BIST 100 dolar bazında Haziran 2025'ten bu yana en düşükte",
  "Doğrudan yabancı yatırım sekiz ayda yüzde 35 azaldı",
];

export const X_POST = {
  date: "22 Eki",
  text: "TCMB politika faizini 100 baz puan indirerek yüzde 37'den yüzde 36'ya çekti. Karar metninde enflasyonun ana eğilimindeki gerilemeye dikkat çekildi, yüksek enerji fiyatlarının yukarı yönlü riskleri artırdığı belirtildi.",
};

// "Nasıl çalışıyoruz" bölümündeki rakam karşılaştırması (22 Ekim faiz kararı).
export const NUMBER_CHECK = {
  published: ["100 baz puan", "yüzde 37", "yüzde 36"],
  rows: [
    { label: "Önceki politika faizi", value: "%37" },
    { label: "Yeni politika faizi", value: "%36" },
    { label: "Değişim", value: "−100 baz puan" },
  ],
};
