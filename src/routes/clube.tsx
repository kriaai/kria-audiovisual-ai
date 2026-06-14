import { createFileRoute } from "@tanstack/react-router";
import Clube from "@/components/Clube";
import Footer from "@/components/Footer";
import BrandLogo from "@/components/BrandLogo";

export const Route = createFileRoute("/clube")({
  head: () => ({
    meta: [
      { title: "Clube Kria — Para prestadores e agências" },
      { name: "description", content: "Faça parte da rede de prestadores e agências indicados pela Kria AI. A partir de R$ 50/mês." },
      { property: "og:title", content: "Clube Kria" },
      { property: "og:description", content: "Divulgação no site da Kria AI, leads qualificados e conexão com agências." },
    ],
  }),
  component: ClubePage,
});

function ClubePage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-card px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="inline-flex items-center">
            <BrandLogo size="md" />
          </a>
        </div>
      </header>
      <Clube />
      <Footer />
    </main>
  );
}
