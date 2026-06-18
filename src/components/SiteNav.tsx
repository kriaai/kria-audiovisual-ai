import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { openWhatsApp } from "@/lib/contact";

const ITEMS: { label: string; target: string }[] = [
  { label: "Início", target: "topo" },
  { label: "Consultoria", target: "consultoria" },
  { label: "Serviços", target: "servicos" },
  { label: "Diagnóstico", target: "diagnostico" },
  { label: "Produtos", target: "produtos" },
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

const WA_TOPO = "Olá, Kria! Quero falar com vocês.";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition ${
        scrolled
          ? "border-b border-white/10 bg-[#07030F]/85 backdrop-blur-xl"
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
          <BrandLogo size="md" variant="onDark" />
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {ITEMS.map((it) => (
            <button
              key={it.target}
              type="button"
              onClick={() => scrollTo(it.target)}
              className="rounded-full px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {it.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => openWhatsApp(WA_TOPO)}
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-[#FF6A2C] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#FF8A3D]"
          >
            <MessageCircle className="h-4 w-4" /> Falar com a Kria
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white backdrop-blur lg:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="border-t border-white/10 bg-[#07030F]/95 px-4 py-3 backdrop-blur">
            <div className="flex flex-col gap-1">
              {ITEMS.map((it) => (
                <button
                  key={it.target}
                  type="button"
                  onClick={() => { setOpen(false); scrollTo(it.target); }}
                  className="rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  {it.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => { setOpen(false); openWhatsApp(WA_TOPO); }}
                className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#FF6A2C] px-4 text-sm font-bold text-white"
              >
                <MessageCircle className="h-4 w-4" /> Falar com a Kria
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
