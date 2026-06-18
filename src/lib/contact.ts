// Fonte única de contato da Kria AI.
export const WHATSAPP_NUMBER = "5591985091584"; // +55 91 98509-1584
export const WHATSAPP_DISPLAY = "(91) 98509-1584";
export const EMAIL = "papodekria@gmail.com";
export const INSTAGRAM_HANDLE = "@kria.ai";
export const INSTAGRAM_URL = "https://instagram.com/kria.ai";

export function waLink(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
