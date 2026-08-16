import {
  CreditCard,
  Sticker,
  Flag,
  Trophy,
  FileText,
  Tag,
  Ribbon,
  PartyPopper,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { wa } from "@/lib/nc";

import brindes from "@/assets/foto-brindes.jpg";
import kitR2 from "@/assets/foto-kit-r2.jpg";
import agendaCaneca from "@/assets/foto-agenda-caneca.jpg";

const destaques = [
  {
    titulo: "Brindes Personalizados",
    desc: "Caneca, agenda, caneta e kit com a sua marca. Fecha bem como presente de cliente.",
    img: brindes,
    lead: "brindes personalizados",
  },
  {
    titulo: "Kits e Sacolas Corporativas",
    desc: "Montamos o kit inteiro: sacola, embalagem e o que vai dentro, tudo com a sua identidade.",
    img: kitR2,
    lead: "kits e sacolas corporativas",
  },
  {
    titulo: "Agendas e Canecas com Nome",
    desc: "Agenda 2026 com capa personalizada e caneca com nome, foto ou frase.",
    img: agendaCaneca,
    lead: "agendas e canecas personalizadas",
  },
];

const outros = [
  { titulo: "Cartões de Visita", desc: "Papel bom, laminação fosca ou brilho.", icon: CreditCard, lead: "cartões de visita" },
  { titulo: "Adesivos e Tags", desc: "Recortado, rótulo de embalagem e folder.", icon: Sticker, lead: "adesivos, tags e folders" },
  { titulo: "Banners e Lonas", desc: "Grande formato pra evento e fachada.", icon: Flag, lead: "banner, backdrop ou lona" },
  { titulo: "Troféus e Medalhas", desc: "Premiação de corrida, campeonato e festival.", icon: Trophy, lead: "troféus e medalhas" },
  { titulo: "Papelaria", desc: "Bloco, receituário, envelope e timbrado.", icon: FileText, lead: "papelaria personalizada" },
  { titulo: "Etiqueta Escolar", desc: "Nome da criança no material e no uniforme.", icon: Tag, lead: "etiquetas escolares" },
  { titulo: "Fitas Personalizadas", desc: "Cetim impresso pra fechar embalagem.", icon: Ribbon, lead: "fitas personalizadas" },
  { titulo: "Datas Comemorativas", desc: "Lembrancinha, caixa e decoração impressa.", icon: PartyPopper, lead: "produtos para datas comemorativas" },
];

export function Produtos() {
  return (
    <section id="produtos" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <span className="eyebrow">Catálogo</span>
      <h2 className="mt-4 max-w-2xl text-3xl sm:text-5xl">
        O que a gente <span className="text-brand">imprime</span>
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Cartão de visita, banner de evento, etiqueta de escola, kit de premiação. Se dá pra
        imprimir ou personalizar, provavelmente a gente faz. Produção é aqui mesmo e você
        retira no Centro ou combina a entrega em Ilhéus e Itabuna.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {destaques.map((p) => (
          <article
            key={p.titulo}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
          >
            <img
              src={p.img}
              alt={p.titulo}
              loading="lazy"
              width={676}
              height={1200}
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-xl">{p.titulo}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
              <a
                href={wa(`Olá, quero um orçamento de ${p.lead}`)}
                target="_blank"
                rel="noopener"
                className="mt-4 inline-flex items-center gap-2 font-display font-bold text-brand transition-colors hover:text-accent-foreground"
              >
                <WhatsAppIcon className="size-4 text-lime" aria-hidden="true" />
                Pedir orçamento
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {outros.map((p) => (
          <a
            key={p.titulo}
            href={wa(`Olá, quero um orçamento de ${p.lead}`)}
            target="_blank"
            rel="noopener"
            className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-lime"
          >
            <p.icon className="size-6 text-brand" aria-hidden="true" />
            <h3 className="mt-3 text-lg">{p.titulo}</h3>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.desc}</p>
            <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-bold text-brand">
              <WhatsAppIcon className="size-4 text-lime" aria-hidden="true" />
              Pedir orçamento
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
