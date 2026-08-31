/**
 * Rastreamento via Google Tag Manager.
 * Meta Ads e Google Ads NÃO são instalados aqui — são controlados pelo GTM.
 */

export const GTM_ID = "GTM-TW7JKHXR";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/** Garante o dataLayer e empurra um evento de forma segura (nunca quebra o fluxo). */
export function pushDataLayer(event: string, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...extra });
  } catch {
    // Rastreamento nunca deve interromper a experiência do usuário.
  }
}

let gtmCarregado = false;

/** Injeta o script do GTM uma única vez, após o app montar. */
export function carregarGTM() {
  if (gtmCarregado || typeof window === "undefined" || typeof document === "undefined") return;
  gtmCarregado = true;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}
