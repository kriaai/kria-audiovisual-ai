import { MessageCircle, Sparkles } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/contact";

export default function FloatingActions() {
  const goFunil = () => {
    const el = document.getElementById("diagnostico-kria") ?? document.getElementById("funil");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openWa = () => {
    const msg = "Olá, quero saber como a Kria AI pode ajudar meu negócio.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={goFunil}
        aria-label="Fazer Diagnóstico Kria"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-primary/85 px-4 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/40 backdrop-blur-md transition hover:scale-[1.03] hover:shadow-2xl hover:shadow-accent/40"
      >
        <Sparkles className="h-4 w-4 text-accent" />
        <span className="hidden sm:inline">Diagnóstico Kria</span>
        <span className="sm:hidden">Diagnóstico</span>
      </button>
      <button
        type="button"
        onClick={openWa}
        aria-label="Falar no WhatsApp"
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 ring-2 ring-emerald-300/40 transition hover:scale-110 hover:bg-emerald-600"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    </div>
  );
}
