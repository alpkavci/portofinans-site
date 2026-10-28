# portofinans.com

PortoFinans'ı tanıtan tek sayfalık site. Görsel dil Instagram (@portofinans) ve X (@portofinans) hesaplarından alındı: okyanus mavisi, çapalı uygulama ikonu, Montserrat, beyaz hap butonlar.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ klasörüne üretim çıktısı
npm run lint
```

## İçerik

Tüm metinler, bağlantılar ve öne çıkan paylaşımlar `src/content.js` içindedir. Yeni bir paylaşımı öne çıkarmak için yalnızca bu dosyayı güncellemek yeterli.

## Yayın

Vercel, `main` dalını otomatik olarak portofinans.com'a yayınlar. Diğer dallar için önizleme adresi üretir. Eski `/piyasalar`, `/haberler` ve `/kripto` adresleri `vercel.json` ile ana sayfaya yönlenir.
