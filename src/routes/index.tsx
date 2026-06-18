import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/Hero";
import NicheCarousel from "@/components/NicheCarousel";
import WhatKria from "@/components/WhatKria";
import DiagnosticoHighlight from "@/components/DiagnosticoHighlight";
import Funnel from "@/components/Funnel/Funnel";
import ConsultoriaGabbe from "@/components/ConsultoriaGabbe";
import Casos from "@/components/Casos";
import BrandLogoMarquee from "@/components/BrandLogoMarquee";
import Positioning from "@/components/Positioning";
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
      <NicheCarousel />
      <WhatKria />
      <DiagnosticoHighlight />
      <Funnel />
      <ConsultoriaGabbe />
      <Casos />
      <BrandLogoMarquee />
      <Positioning />
      <Partners />
      <Clube />
      <Footer />
    </main>
  );
}
