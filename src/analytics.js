const CONSENT_KEY = "chelonaki-analytics-consent";

export function getAnalyticsConsent() {
  if (typeof window === "undefined") return "unknown";
  try {
    return localStorage.getItem(CONSENT_KEY) || "unknown";
  } catch {
    return "unknown";
  }
}

export function setAnalyticsConsent(value) {
  if (!["granted", "denied"].includes(value)) return;
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {}
  window.dispatchEvent(new CustomEvent("chelonaki:consent", { detail: value }));
}

export function getViewportCategory() {
  if (typeof window === "undefined") return "unknown";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1100) return "tablet";
  return "desktop";
}

export async function trackEvent(event, payload = {}) {
  if (typeof window === "undefined" || getAnalyticsConsent() !== "granted")
    return false;
  const country =
    document
      .querySelector('meta[name="chelonaki-country"]')
      ?.getAttribute("content") || null;
  const body = {
    event,
    country,
    displayedLanguage:
      document.documentElement.dataset.locale ||
      document.documentElement.lang?.split("-")[0] ||
      "de",
    route: window.location.pathname,
    viewport: getViewportCategory(),
    ...payload,
  };
  try {
    const response = await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify(body),
    });
    return response.ok;
  } catch {
    return false;
  }
}
