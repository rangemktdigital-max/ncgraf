import { WhatsAppIcon } from "./WhatsAppIcon";
import { wa } from "@/lib/nc";

import cartoes from "@/assets/prod-cartoes.jpg";
import adesivos from "@/assets/prod-adesivos.jpg";
import banners from "@/assets/prod-banners.jpg";
import trofeus from "@/assets/prod-trofeus.jpg";
import papelaria from "@/assets/prod-papelaria.jpg";
import etiqueta from "@/assets/prod-etiqueta.jpg";
import fitas from "@/assets/prod-fitas.jpg";
import datas from "@/assets/prod-datas.jpg";
import brindesAsset from "@/assets/20251204_155010.jpg.asset.json";

const produtos = [
  {
    titulo: "Cartões de Visita",
    desc: "Papel bom, laminação fosca ou brilho. Sai rápido.",
    img: cartoes,
    lead: "cartões de visita",
  },
  {
    titulo: "Adesivos e Tags",
    desc: "Adesivo recortado, rótulo de embalagem, tag de produto e folder.",
    img: adesivos,
    lead: "adesivos, tags e folders",
  },
  {
    titulo: "Banners, Backdrops e Lonas",
    desc: "Grande formato para evento, fachada de loja e ponto de venda.",
    img: banners,
    lead: "banner, backdrop ou lona",
  },
  {
    titulo: "Brindes Personalizados",
    desc: "Caneca, agenda, sacola e kit corporativo com a sua marca.",
    img: brindesAsset.url,
    lead: "brindes personalizados",
  },
  {
    titulo: "Troféus e Medalhas",
    desc: "Kit de premiação para corrida, campeonato e festival.",
    img: trofeus,
    lead: "troféus e medalhas",
  },
  {
    titulo: "Papelaria Personalizada",
    desc: "Bloco, receituário, envelope, pasta e papel timbrado.",
    img: papelaria,
    lead: "papelaria personalizada",
  },
  {
    titulo: "Etiqueta Escolar",
    desc: "Etiqueta com o nome da criança pro material e pro uniforme.",
    img: etiqueta,
    lead: "etiquetas escolares",
  },
  {
    titulo: "Fitas Personalizadas",
    desc: "Fita de cetim impressa pra fechar embalagem e lembrança.",
    img: fitas,
    lead: "fitas personalizadas",
  },
  {
    titulo: "Datas Comemorativas",
    desc: "Lembrancinha, caixa e decoração impressa pra festa e data especial.",
    img: datas,
    lead: "produtos para datas comemorativas",
  },
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
        imprimir ou personalizar, provavelmente a gente faz. Produção é aqui mesmo na loja, e você
        retira no Centro ou combina a entrega em Ilhéus e Itabuna.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {produtos.map((p) => (
          <article
            key={p.titulo}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
          >
            <img
              src={p.img}
              alt={p.titulo}
              loading="lazy"
              width={900}
              height={700}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
    </section>
  );
}
