import { Instagram, Mail, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center rounded-xl bg-white/10 p-2 ring-1 ring-white/20">
                <Sparkles className="h-5 w-5 text-accent" />
              </span>
              <div className="leading-none">
                <div className="text-xl font-black tracking-tight">Kria AI</div>
                <div className="text-[10px] font-semibold tracking-[0.35em] text-white/70">AUDIOVISUAL</div>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Conectando marcas, criadores e tecnologia para acelerar resultados.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/60">Contato</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://instagram.com/kria.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 transition hover:text-accent"
                >
                  <Instagram className="h-4 w-4" /> @kria.ai
                </a>
              </li>
              <li>
                <a
                  href="mailto:papodekria@gmail.com"
                  className="inline-flex items-center gap-2 text-white/90 transition hover:text-accent"
                >
                  <Mail className="h-4 w-4" /> papodekria@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/559195091584"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 transition hover:text-accent"
                >
                  <MessageCircle className="h-4 w-4" /> (91) 9509-1584
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/60">Navegação</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/" className="text-white/90 transition hover:text-accent">Início</Link>
              </li>
              <li>
                <Link to="/clube" className="text-white/90 transition hover:text-accent">Clube Kria</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Kria AI Audiovisual. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
