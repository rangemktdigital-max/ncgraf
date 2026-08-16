import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/nc/Header";
import { Hero } from "@/components/nc/Hero";
import { Produtos } from "@/components/nc/Produtos";
import { Diferenciais } from "@/components/nc/Diferenciais";
import { ComoComprar } from "@/components/nc/ComoComprar";
import { Localizacao } from "@/components/nc/Localizacao";
import { ProvaSocial } from "@/components/nc/ProvaSocial";
import { Footer } from "@/components/nc/Footer";
import { WhatsAppFab } from "@/components/nc/WhatsAppFab";

const title = "NC Copiadora | Gráfica Rápida em Ilhéus e Itabuna/BA";
const description =
  "Gráfica rápida no Centro de Ilhéus: cartão de visita, adesivo, banner, brinde, troféu e papelaria personalizada. Peça o orçamento no WhatsApp. Cartão em até 3x sem juros.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PrintingService",
          name: "Nc Copiadora - Comunicação Gráfica",
          description,
          telephone: "+557336347138",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Visconde de Ouro Preto, 53, Centro",
            addressLocality: "Ilhéus",
            addressRegion: "BA",
            postalCode: "45653-180",
            addressCountry: "BR",
          },
          areaServed: ["Ilhéus", "Itabuna"],
          openingHours: ["Mo-Fr 09:00-17:00", "Sa 09:00-12:00"],
          sameAs: ["https://instagram.com/nccopiadora"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Produtos />
        <Diferenciais />
        <ComoComprar />
        <Localizacao />
        <ProvaSocial />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
