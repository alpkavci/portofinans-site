import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

// CoinGecko public API — ücretsiz, CORS destekli
const COIN_IDS = "bitcoin,ethereum,solana,binancecoin,cardano";
const COINGECKO_URL =
  `https://api.coingecko.com/api/v3/simple/price` +
  `?ids=${COIN_IDS}&vs_currencies=usd` +
  `&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`;

const POLL_INTERVAL = 30_000; // 30 saniye (CoinGecko rate limit uyumlu)

const COIN_META = {
  bitcoin:      { symbol: "BTC", name: "Bitcoin",  spark: [82000,83000,85000,84000,86000,85500,87000,87412] },
  ethereum:     { symbol: "ETH", name: "Ethereum", spark: [3100,3150,3200,3180,3220,3250,3270,3287] },
  solana:       { symbol: "SOL", name: "Solana",   spark: [165,167,168,170,171,173,174,175] },
  binancecoin:  { symbol: "BNB", name: "BNB",      spark: [620,618,615,614,613,614,612,612] },
  cardano:      { symbol: "ADA", name: "Cardano",  spark: [0.44,0.445,0.448,0.449,0.450,0.451,0.452,0.452] },
};

function formatPrice(usd) {
  if (usd >= 1000) return usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " $";
  if (usd >= 1)    return usd.toFixed(2) + " $";
  return usd.toFixed(4) + " $";
}

function formatMarketCap(n) {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + "T $";
  if (n >= 1e9)  return (n / 1e9).toFixed(1) + "B $";
  return (n / 1e6).toFixed(0) + "M $";
}

function formatVol(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B $";
  return (n / 1e6).toFixed(0) + "M $";
}

/**
 * Kripto verisi çeker, 30 saniyede bir günceller.
 * Döndürür: { coins, rawPrices, loading, error, lastUpdate, secondsAgo }
 */
export function useCryptoData() {
  const [coins, setCoins] = useState(null);          // işlenmiş dizi
  const [rawPrices, setRawPrices] = useState({});    // { bitcoin: 87412, ... }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const abortRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      const res = await axios.get(COINGECKO_URL, {
        signal: abortRef.current.signal,
        timeout: 8000,
      });
      const raw = res.data;

      const newRaw = {};
      const newCoins = Object.entries(COIN_META).map(([id, meta]) => {
        const d = raw[id] || {};
        const usdPrice = d.usd || 0;
        const change24h = d.usd_24h_change || 0;
        newRaw[id] = usdPrice;

        return {
          id,
          symbol: meta.symbol,
          name: meta.name,
          price: formatPrice(usdPrice),
          priceRaw: usdPrice,
          change: (change24h >= 0 ? "+" : "") + change24h.toFixed(2) + "%",
          changeRaw: change24h,
          up: change24h >= 0,
          mktCap: formatMarketCap(d.usd_market_cap || 0),
          volume: formatVol(d.usd_24h_vol || 0),
          spark: meta.spark, // sparkline statik kalıyor
        };
      });

      setRawPrices(newRaw);
      setCoins(newCoins);
      setLastUpdate(new Date());
      setSecondsAgo(0);
      setError(null);
      setLoading(false);
    } catch (e) {
      if (axios.isCancel(e)) return;
      setError("Veri alınamadı — yeniden deneniyor…");
      setLoading(false);
    }
  }, []);

  // İlk yükleme + polling
  useEffect(() => {
    fetchData();
    const poll = setInterval(fetchData, POLL_INTERVAL);
    return () => {
      clearInterval(poll);
      abortRef.current?.abort();
    };
  }, [fetchData]);

  // Kaç saniye önce güncellendi sayacı
  useEffect(() => {
    const t = setInterval(() => {
      setSecondsAgo((s) => s + 1);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return { coins, rawPrices, loading, error, lastUpdate, secondsAgo };
}
