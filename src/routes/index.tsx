import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/Hero";
import Funnel from "@/components/Funnel/Funnel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kria AI Audiovisual — Encontre o serviço ideal" },
      { name: "description", content: "Descubra em 2 minutos qual solução audiovisual, design ou IA faz mais sentido para o seu negócio." },
      { property: "og:title", content: "Kria AI Audiovisual" },
      { property: "og:description", content: "Funil inteligente para encontrar o serviço ideal para o seu negócio." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Funnel />
    </main>
  );
}
