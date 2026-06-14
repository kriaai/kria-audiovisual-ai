import { Instagram, Mail, MessageCircle, Sparkles, Rocket, ShieldCheck, Zap, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import BrandLogo from "@/components/BrandLogo";
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, waLink } from "@/lib/contact";

const trustBadges = [
  { icon: Rocket, label: "Diagnóstico em 2 minutos" },
  { icon: ShieldCheck, label: "Seus dados protegidos" },
  { icon: Zap, label: "Resposta em até 24h" },
  { icon: Heart, label: "Atendimento humano" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* CTA / marketing band */}
      <div className="border-b border-white/10 bg-gradient-to-br from-primary-deep via-primary to-primary-deep">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                <Sparkles className="h-3.5 w-3.5" /> Pronto pra começar?
              </div>
              <h3 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
                Seu próximo passo pode nascer hoje.
              </h3>
              <p className="mt-1 text-sm text-primary-foreground/70">
                Conte sua ideia e a Kria conecta você ao time certo.
              </p>
            </div>
            <a
              href={waLink("Olá Kria! Quero falar com vocês.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-black text-accent-foreground shadow-xl shadow-accent/30 transition hover:scale-[1.02] hover:bg-accent/90"
            >
              <MessageCircle className="h-4 w-4" /> Falar com a Kria
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-xs font-semibold text-primary-foreground/90 ring-1 ring-white/10 backdrop-blur"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact + nav */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <BrandLogo size="lg" variant="onDark" />
            <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
              Plataforma de diagnóstico, estratégia, IA e conexão com especialistas.
              Conectando marcas, criadores e tecnologia para acelerar resultados.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-accent">Contato</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-foreground/90 transition hover:text-accent"
                >
                  <Instagram className="h-4 w-4" /> {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 text-primary-foreground/90 transition hover:text-accent"
                >
                  <Mail className="h-4 w-4" /> {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-foreground/90 transition hover:text-accent"
                >
                  <MessageCircle className="h-4 w-4" /> {WHATSAPP_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-accent">Navegação</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/90 transition hover:text-accent">Início</Link>
              </li>
              <li>
                <a href="/#servicos" className="text-primary-foreground/90 transition hover:text-accent">Serviços</a>
              </li>
              <li>
                <a href="/#parceiros" className="text-primary-foreground/90 transition hover:text-accent">Parceiros</a>
              </li>
              <li>
                <Link to="/clube" className="text-primary-foreground/90 transition hover:text-accent">Clube Kria</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} <span className="font-bold text-accent">Kria AI</span>. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
