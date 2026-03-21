import { useState, useEffect, useRef } from "react";

/**
 * Fiyat değiştiğinde yeşil/kırmızı flash CSS sınıfı döndürür.
 * @param {number} price — güncel ham fiyat
 * @returns {"flash-up" | "flash-down" | null}
 */
export function usePriceFlash(price) {
  const prevRef = useRef(null);
  const [flash, setFlash] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (prevRef.current === null) {
      prevRef.current = price;
      return;
    }
    if (price !== prevRef.current) {
      clearTimeout(timerRef.current);
      setFlash(price > prevRef.current ? "flash-up" : "flash-down");
      timerRef.current = setTimeout(() => setFlash(null), 900);
      prevRef.current = price;
    }
  }, [price]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return flash;
}
