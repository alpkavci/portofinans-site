import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { BIST_STOCKS } from "../data";

// Yahoo Finance üzerinden 15 dk gecikmeli BIST verisi
// Dev modda Vite proxy (/api/yahoo) kullanılır, prod'da backend proxy gerekir
const SYMBOLS = "THYAO.IS,EREGL.IS,GARAN.IS,AKBNK.IS,KCHOL.IS,TUPRS.IS,SISE.IS,BIMAS.IS";
const POLL_INTERVAL = 15 * 60 * 1000; // 15 dakika

const NAME_MAP = {
  "THYAO.IS": "Türk Hava Yolları",
  "EREGL.IS": "Ereğli Demir Çelik",
  "GARAN.IS": "Garanti Bankası",
  "AKBNK.IS": "Akbank",
  "KCHOL.IS": "Koç Holding",
  "TUPRS.IS": "Tüpraş",
  "SISE.IS":  "Şişe Cam",
  "BIMAS.IS": "BİM Birleşik Mağazalar",
};

const SPARK_MAP = {
  "THYAO.IS": [295,298,292,300,303,305,307,308],
  "EREGL.IS": [50,49,50,49,48,49,48,48],
  "GARAN.IS": [170,172,168,175,180,178,183,186],
  "AKBNK.IS": [60,61,59,61,62,61,62,62],
  "KCHOL.IS": [213,212,214,215,214,215,216,215],
  "TUPRS.IS": [188,187,186,185,184,185,184,184],
  "SISE.IS":  [36,37,36,37,37,37,38,37],
  "BIMAS.IS": [515,514,513,512,513,512,511,512],
};

function parseStocks(quotes) {
  return quotes.map((q) => {
    const sym = q.symbol; // "THYAO.IS"
    const shortSym = sym.replace(".IS", "");
    const price = q.regularMarketPrice ?? 0;
    const change = q.regularMarketChangePercent ?? 0;
    const vol = q.regularMarketVolume ?? 0;

    const volStr = vol >= 1e9
      ? (vol / 1e9).toFixed(1) + "B ₺"
      : vol >= 1e6
      ? (vol / 1e6).toFixed(0) + "M ₺"
      : vol.toLocaleString("tr-TR") + " ₺";

    return {
      symbol: shortSym,
      name: NAME_MAP[sym] || shortSym,
      price: price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      priceRaw: price,
      change: (change >= 0 ? "+" : "") + change.toFixed(2) + "%",
      changeRaw: change,
      up: change >= 0,
      volume: volStr,
      mktCap: q.marketCap
        ? (q.marketCap / 1e9).toFixed(0) + "B ₺"
        : "—",
      spark: SPARK_MAP[sym] || [],
    };
  });
}

/**
 * BIST hisse verisi — Yahoo Finance (15 dk gecikmeli)
 * Döndürür: { stocks, rawPrices, loading, error, lastUpdate }
 */
export function useBorsaData() {
  const [stocks, setStocks] = useState(null);
  const [rawPrices, setRawPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const abortRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      const url = `/api/yahoo/v7/finance/quote?symbols=${SYMBOLS}&fields=regularMarketPrice,regularMarketChangePercent,regularMarketVolume,marketCap`;
      const res = await axios.get(url, {
        signal: abortRef.current.signal,
        timeout: 10_000,
        headers: { "Accept": "application/json" },
      });

      const quotes = res.data?.quoteResponse?.result ?? [];
      if (quotes.length === 0) throw new Error("Boş yanıt");

      const parsed = parseStocks(quotes);
      const newRaw = {};
      parsed.forEach((s) => { newRaw[s.symbol] = s.priceRaw; });

      setRawPrices(newRaw);
      setStocks(parsed);
      setLastUpdate(new Date());
      setError(null);
      setLoading(false);
    } catch (e) {
      if (axios.isCancel(e)) return;
      // API başarısız → statik mock veriye düş
      const fallback = BIST_STOCKS.map((s) => ({ ...s, priceRaw: parseFloat(s.price.replace(",", ".")) }));
      const newRaw = {};
      fallback.forEach((s) => { newRaw[s.symbol] = s.priceRaw; });
      setRawPrices(newRaw);
      setStocks(fallback);
      setError("Canlı BIST verisi alınamadı — önbellek gösteriliyor");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const poll = setInterval(fetchData, POLL_INTERVAL);
    return () => {
      clearInterval(poll);
      abortRef.current?.abort();
    };
  }, [fetchData]);

  return { stocks, rawPrices, loading, error, lastUpdate };
}
