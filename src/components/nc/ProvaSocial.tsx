import { Star, Instagram } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { wa, NC } from "@/lib/nc";
import kitAsset from "@/assets/20251204_153548.jpg.asset.json";
import agendaAsset from "@/assets/20251204_184340.jpg.asset.json";
import balcaoAsset from "@/assets/20251204_191454.jpg.asset.json";

const galeria = [
  { src: kitAsset.url, alt: "Kit presente personalizado em sacola transparente" },
  { src: agendaAsset.url, alt: "Agenda e caneca personalizadas produzidas pela NC Copiadora" },
  { src: balcaoAsset.url, alt: "Atendimento no balcão da NC Copiadora em Ilhéus" },
];

/** Avaliações reais publicadas no perfil do Google da NC Copiadora. */
const depoimentos = [
  {
    nome: "Caique Alca",
    texto: "Atendimento profissional e prazos atrativos com preços adequados.",
  },
  {
    nome: "Paulo Roberto Alves dos Santos",
    texto: "Cheguei na loja por volta de 10h e tinha certa quantidade de cópias pra fazer.",
  },
  {
    nome: "Carlos Carioca",
    texto: "Um pessoal gente boa, educados, atenciosos, sangue bom.",
  },
];

export function ProvaSocial() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <span className="eyebrow">
        <Star className="size-3.5 fill-current" aria-hidden="true" />O que dizem no Google
      </span>
      <h2 className="mt-4 max-w-2xl text-3xl sm:text-5xl">
        Quem já <span className="text-brand">imprime com a gente</span>
      </h2>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="size-5 fill-current text-brand" />
          ))}
        </div>
        <p className="text-muted-foreground">
          <strong className="text-foreground">{NC.googleNota}</strong> de nota em{" "}
          {NC.googleAvaliacoes} avaliações no Google
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {depoimentos.map((d) => (
          <figure key={d.nome} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex gap-0.5 text-brand" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-3 text-foreground">“{d.texto}”</blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              {d.nome} · avaliação no Google
            </figcaption>
          </figure>
        ))}
      </div>

      <a
        href={NC.google}
        target="_blank"
        rel="noopener"
        className="mt-5 inline-block text-sm font-semibold text-brand underline underline-offset-4"
      >
        Ver todas as avaliações no Google
      </a>

      <p className="mt-12 max-w-2xl text-muted-foreground">
        Alguns pedidos que saíram daqui da loja:
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
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
          Manda o que você precisa e <span className="text-lime">a gente volta com prazo e valor</span>
        </h3>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={wa("Olá, vim pela prova social do site e quero um orçamento")}
            target="_blank"
            rel="noopener"
            className="btn-lime"
          >
            <WhatsAppIcon className="size-5" aria-hidden="true" />
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
