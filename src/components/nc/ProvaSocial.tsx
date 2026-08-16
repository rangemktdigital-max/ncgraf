import { Star, Instagram, MessageCircle } from "lucide-react";
import { wa, NC } from "@/lib/nc";
import kitAsset from "@/assets/20251204_153548.jpg.asset.json";
import agendaAsset from "@/assets/20251204_184340.jpg.asset.json";
import balcaoAsset from "@/assets/20251204_191454.jpg.asset.json";

const galeria = [
  { src: kitAsset.url, alt: "Kit presente personalizado em sacola transparente" },
  { src: agendaAsset.url, alt: "Agenda e caneca personalizadas produzidas pela NC Copiadora" },
  { src: balcaoAsset.url, alt: "Atendimento no balcão da NC Copiadora em Ilhéus" },
];

export function ProvaSocial() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <span className="eyebrow">
        <Star className="size-3.5 fill-current" aria-hidden="true" />O que nossos clientes dizem
      </span>
      <h2 className="mt-4 max-w-2xl text-3xl sm:text-5xl">
        Marcas de Ilhéus e Itabuna que já <span className="text-brand">imprimem com a gente</span>
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Mais de 3.300 pessoas acompanham nossos trabalhos no Instagram. Veja alguns pedidos reais
        que saíram da nossa produção.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {galeria.map((g) => (
          <img
            key={g.src}
            src={g.src}
            alt={g.alt}
            loading="lazy"
            width={900}
            height={1200}
            className="h-64 w-full rounded-2xl object-cover shadow-card sm:h-72"
          />
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border surface-brand p-8 text-center">
        <h3 className="text-2xl text-brand-foreground sm:text-3xl">
          Peça hoje e receba <span className="text-lime">prazo e valor na hora</span>
        </h3>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={wa("Olá, vim pela prova social do site e quero um orçamento")}
            target="_blank"
            rel="noopener"
            className="btn-lime"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Falar no WhatsApp
          </a>
          <a
            href={NC.instagram}
            target="_blank"
            rel="noopener"
            className="btn-ghost-lime"
          >
            <Instagram className="size-5" aria-hidden="true" />
            Ver @nccopiadora
          </a>
        </div>
      </div>
    </section>
  );
}
