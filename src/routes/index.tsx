import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/Hero";
import Positioning from "@/components/Positioning";
import DiagnosticoHighlight from "@/components/DiagnosticoHighlight";
import ConsultoriaGabbe from "@/components/ConsultoriaGabbe";
import Funnel from "@/components/Funnel/Funnel";
import Partners from "@/components/Partners";
import Clube from "@/components/Clube";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kria AI — Diagnóstico, estratégia e IA para o seu negócio" },
      { name: "description", content: "Plataforma de diagnóstico empresarial, estratégia, inteligência artificial e conexão com especialistas. Descubra em 2 minutos o que seu negócio precisa." },
      { property: "og:title", content: "Kria AI" },
      { property: "og:description", content: "Diagnóstico, estratégia, IA e conexão com especialistas." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Positioning />
      <DiagnosticoHighlight />
      <ConsultoriaGabbe />
      <Funnel />
      <Partners />
      <Clube />
      <Footer />
    </main>
  );
}
