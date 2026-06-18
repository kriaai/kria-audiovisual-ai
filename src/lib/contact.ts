// Fonte única de contato da Kria AI.
export const WHATSAPP_NUMBER = "5591985091584"; // +55 91 98509-1584
export const WHATSAPP_DISPLAY = "(91) 98509-1584";
export const EMAIL = "papodekria@gmail.com";
export const INSTAGRAM_HANDLE = "@kria.ai";
export const INSTAGRAM_URL = "https://instagram.com/kria.ai";

// Endpoint Formspree — troque aqui se quiser usar outro form
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkoabjow";

export function waLink(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function openWhatsApp(message: string) {
  if (typeof window === "undefined") return;
  window.open(waLink(message), "_blank", "noopener,noreferrer");
}

export async function sendToFormspree(payload: Record<string, unknown>) {
  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("Formspree error", e);
  }
}
