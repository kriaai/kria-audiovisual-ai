import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { WHATSAPP_NUMBER } from "@/lib/contact";

const ITEMS: { label: string; target: string }[] = [
  { label: "Início", target: "topo" },
  { label: "O que é", target: "o-que-e-kria" },
  { label: "Diagnóstico", target: "diagnostico-kria" },
  { label: "Soluções", target: "solucoes" },
  { label: "Casos", target: "casos" },
  { label: "Nossos Krias", target: "krias" },
  { label: "Seja um Kria", target: "seja-kria" },
];

function scrollTo(id: string) {
  if (id === "topo") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openWa = () => {
    const msg = "Olá, quero saber como a Kria AI pode ajudar meu negócio.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const isLight = scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition ${
        scrolled
          ? "border-b border-white/40 bg-white/80 backdrop-blur-xl shadow-lg shadow-primary/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <button
          type="button"
          onClick={() => scrollTo("topo")}
          className="flex items-center"
          aria-label="Início"
        >
          <BrandLogo size="md" variant={scrolled ? "default" : "onDark"} />
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {ITEMS.map((it) => (
            <button
              key={it.target}
              type="button"
              onClick={() => scrollTo(it.target)}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                scrolled
                  ? "text-primary-deep/90 hover:bg-primary-deep/10 hover:text-primary-deep"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {it.label}
            </button>
          ))}
          <button
            type="button"
            onClick={openWa}
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-md shadow-emerald-500/30 transition hover:bg-emerald-600"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur lg:hidden transition ${
            scrolled
              ? "bg-primary-deep/10 text-primary-deep ring-1 ring-primary-deep/20"
              : "bg-white/10 text-white ring-1 ring-white/20"
          }`}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className={`border-t px-4 py-3 backdrop-blur ${
            scrolled
              ? "border-primary-deep/10 bg-white/95"
              : "border-white/10 bg-primary-deep/95"
          }`}>
            <div className="flex flex-col gap-1">
              {ITEMS.map((it) => (
                <button
                  key={it.target}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    scrollTo(it.target);
                  }}
                  className={`rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                    scrolled
                      ? "text-primary-deep/90 hover:bg-primary-deep/10"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  {it.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openWa();
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
