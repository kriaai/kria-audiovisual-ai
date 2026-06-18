import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/Hero";
import ConsultoriaGabbe from "@/components/ConsultoriaGabbe";
import ServicesGrid from "@/components/ServicesGrid";
import PacotesKria from "@/components/PacotesKria";
import Funnel from "@/components/Funnel/Funnel";
import ProdutosDigitais from "@/components/ProdutosDigitais";
import SejaUmKria from "@/components/SejaUmKria";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kria AI — Consultoria, IA e estratégia para o seu negócio" },
      { name: "description", content: "Consultoria, workshops e serviços para usar IA com estratégia e vender mais. Avaliação rápida pelo WhatsApp." },
      { property: "og:title", content: "Kria AI — Consultoria e IA para vender mais" },
      { property: "og:description", content: "Transforme IA em estratégia, conteúdo e venda. Consultorias, workshops e serviços com atendimento humano." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-[#07030F]">
      <Hero />
      <ConsultoriaGabbe />
      <ServicesGrid />
      <PacotesKria />
      <Funnel />
      <ProdutosDigitais />
      <SejaUmKria />
      <Footer />
    </main>
  );
}
