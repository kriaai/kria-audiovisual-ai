import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/contact";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => openWhatsApp("Olá, Kria! Quero saber como vocês podem me ajudar.")}
        aria-label="Falar no WhatsApp"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30 ring-2 ring-emerald-300/30 transition hover:scale-110 hover:bg-emerald-600"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    </div>
  );
}
