import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/Hero";
import Positioning from "@/components/Positioning";
import DiagnosticoHighlight from "@/components/DiagnosticoHighlight";
import ConsultoriaGabbe from "@/components/ConsultoriaGabbe";
import Funnel from "@/components/Funnel/Funnel";
import Casos from "@/components/Casos";
import Partners from "@/components/Partners";
import Clube from "@/components/Clube";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kria AI — Diagnóstico, estratégia e IA para o seu negócio" },
      { name: "description", content: "Descubra o que está travando o crescimento do seu negócio. A Kria AI analisa seus gargalos e recomenda as soluções certas." },
      { property: "og:title", content: "Kria AI" },
      { property: "og:description", content: "Diagnóstico inteligente, estratégia, IA e conexão com especialistas." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Funnel />
      <Positioning />
      <DiagnosticoHighlight />
      <ConsultoriaGabbe />
      <Casos />
      <Partners />
      <Clube />
      <Footer />
    </main>
  );
}
