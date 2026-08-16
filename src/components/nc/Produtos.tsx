import { MessageCircle } from "lucide-react";
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
    desc: "Papel premium, laminação fosca ou brilho e acabamento rápido.",
    img: cartoes,
    lead: "cartões de visita",
  },
  {
    titulo: "Adesivos e Tags",
    desc: "Adesivos recortados, rótulos, tags e folders para sua marca.",
    img: adesivos,
    lead: "adesivos, tags e folders",
  },
  {
    titulo: "Banners, Backdrops e Lonas",
    desc: "Impressão em grande formato para eventos, lojas e fachadas.",
    img: banners,
    lead: "banner, backdrop ou lona",
  },
  {
    titulo: "Brindes Personalizados",
    desc: "Canecas, agendas, kits corporativos e sacolas com a sua marca.",
    img: brindesAsset.url,
    lead: "brindes personalizados",
  },
  {
    titulo: "Troféus e Medalhas",
    desc: "Kits para corridas, campeonatos e premiações de eventos.",
    img: trofeus,
    lead: "troféus e medalhas",
  },
  {
    titulo: "Papelaria Personalizada",
    desc: "Blocos, receituários, envelopes, pastas e papel timbrado.",
    img: papelaria,
    lead: "papelaria personalizada",
  },
  {
    titulo: "Etiqueta Escolar",
    desc: "Kits de etiquetas com nome para material e uniforme escolar.",
    img: etiqueta,
    lead: "etiquetas escolares",
  },
  {
    titulo: "Fitas Personalizadas",
    desc: "Fitas de cetim impressas para embalagens, lembranças e brindes.",
    img: fitas,
    lead: "fitas personalizadas",
  },
  {
    titulo: "Datas Comemorativas",
    desc: "Lembranças, caixas e decoração impressa para cada ocasião.",
    img: datas,
    lead: "produtos para datas comemorativas",
  },
];

export function Produtos() {
  return (
    <section id="produtos" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <span className="eyebrow">Catálogo</span>
      <h2 className="mt-4 max-w-2xl text-3xl sm:text-5xl">
        Tudo que sua marca precisa imprimir,{" "}
        <span className="text-brand">em um só lugar</span>
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Do cartão de visita ao kit de premiação: produção própria, conferência de arte e retirada na
        loja ou entrega em Ilhéus e Itabuna.
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
                <MessageCircle className="size-4 text-lime" aria-hidden="true" />
                Pedir orçamento
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
