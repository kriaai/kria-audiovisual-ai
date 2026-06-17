import { Stethoscope, HeartPulse, Camera, Utensils, ShoppingBag, Sparkles, Music, MapPin, User, Briefcase, Dumbbell, GraduationCap, BookOpen, ShoppingCart, Rocket } from "lucide-react";

type Niche = { icon: typeof Stethoscope; name: string; tag: string };

const NICHES: Niche[] = [
  { icon: Stethoscope, name: "Médicos", tag: "Autoridade e conteúdo educativo." },
  { icon: HeartPulse, name: "Clínicas", tag: "Atendimento, agenda e presença digital." },
  { icon: Camera, name: "Influencers", tag: "Imagem, constância e posicionamento." },
  { icon: Utensils, name: "Restaurantes", tag: "Campanhas, cardápios e pedidos no WhatsApp." },
  { icon: ShoppingBag, name: "Lojas", tag: "Conteúdo para atrair e converter." },
  { icon: Sparkles, name: "Beleza", tag: "Agenda cheia começa com presença digital." },
  { icon: Music, name: "Eventos", tag: "Divulgação, captação e estratégia." },
  { icon: MapPin, name: "Negócios locais", tag: "Cliente perto, conteúdo certeiro." },
  { icon: User, name: "Marcas pessoais", tag: "Posicionamento que vende quem você é." },
  { icon: Briefcase, name: "Empreendedores", tag: "Estratégia digital de ponta a ponta." },
  { icon: Dumbbell, name: "Academias", tag: "Comunidade, prova social e retenção." },
  { icon: GraduationCap, name: "Profissionais liberais", tag: "Autoridade técnica em formato simples." },
  { icon: BookOpen, name: "Infoprodutores", tag: "Funil, conteúdo e conversão." },
  { icon: ShoppingCart, name: "E-commerce", tag: "Tráfego, criativo e recompra." },
  { icon: Rocket, name: "Startups", tag: "Narrativa, posicionamento e tração." },
];

const LOOP = [...NICHES, ...NICHES];

export default function NicheCarousel() {
  return (
    <section aria-label="Nichos atendidos pela Kria" className="relative">
      {/* Faixa de transição roxo → branco */}
      <div className="section-gradient-transition relative">
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-24 md:pb-14">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-white/20 backdrop-blur">
              Quem a Kria atende
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white md:text-4xl">
              Negócios reais, <span className="text-accent">estratégias sob medida</span>.
            </h2>
            <p className="mt-2 text-sm text-white/80 md:text-base">
              Se identifica com algum deles? A Kria já ajudou negócios assim.
            </p>
          </div>

          {/* Carrossel auto */}
          <div className="group relative mt-8 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--kria-transition-from)] to-transparent md:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--kria-transition-to)] to-transparent md:w-28" />

            {/* Vinheta para sensação 3D */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-full bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />

            <div className="animate-marquee flex w-max items-stretch gap-5 py-4 group-hover:[animation-play-state:paused]">
              {LOOP.map(({ icon: Icon, name, tag }, i) => (
                <article
                  key={`${name}-${i}`}
                  className="group/card niche-card relative flex w-[230px] shrink-0 flex-col gap-3 overflow-hidden rounded-3xl border border-white/20 bg-white/[0.07] p-5 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.04] hover:border-accent/60 hover:bg-white/[0.12] md:w-[270px]"
                >
                  <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/25 blur-2xl transition group-hover/card:bg-accent/50" />
                  <span className="pointer-events-none absolute -left-10 -bottom-10 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-2xl" />
                  <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/40 via-fuchsia-500/25 to-primary/40 text-white ring-1 ring-white/30 shadow-[0_0_25px_-4px_oklch(0.72_0.21_45/.7)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="text-base font-black tracking-tight text-white">{name}</div>
                  <p className="text-xs leading-relaxed text-white/70">{tag}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
