import { useEffect, useState } from "react";

const ENV_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");

// Site origin that QR codes point at. Set NEXT_PUBLIC_SITE_URL to pin it to the
// production domain; otherwise the browser's current origin is used.
export function usePublicOrigin() {
  const [origin, setOrigin] = useState(ENV_ORIGIN);

  useEffect(() => {
    if (!ENV_ORIGIN) setOrigin(window.location.origin);
  }, []);

  return origin;
}

export function getPublicCardUrl(origin, cardId) {
  return origin && cardId ? `${origin}/c/${cardId}` : "";
}

export function isLocalOrigin(origin) {
  return /^https?:\/\/(localhost|127\.|0\.0\.0\.0)/i.test(origin || "");
}
