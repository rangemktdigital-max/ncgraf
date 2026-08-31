import { CreditCard, Sticker, Flag, Trophy, FileText, Ribbon, PartyPopper, QrCode, Briefcase } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useOrcamento } from "./OrcamentoProvider";

import kitR2 from "@/assets/foto-kit-r2.jpg";
import agendaCaneca from "@/assets/foto-agenda-caneca.jpg";
import brindesAsset from "@/assets/prod-brindes.jpg.asset.json";
import cartaoAsset from "@/assets/prod-cartao.jpg.asset.json";
import adesivosAsset from "@/assets/prod-adesivos.jpg.asset.json";
import bannersAsset from "@/assets/prod-banners.webp.asset.json";
import trofeusAsset from "@/assets/prod-trofeus.jpg.asset.json";
import datasAsset from "@/assets/prod-datas.jpg.asset.json";
import fitasAsset from "@/assets/prod-fitas.jpg.asset.json";
import papelariaAsset from "@/assets/prod-papelaria.jpg.asset.json";
import qrCodeAsset from "@/assets/prod-qrcode.jpg.asset.json";
import kitExecutivoAsset from "@/assets/prod-kit-executivo.png.asset.json";

const destaques = [
  {
    titulo: "Brindes Personalizados",
    desc: "Caneca, agenda, caneta e kit com a sua marca. Fecha bem como presente de cliente.",
    img: brindesAsset.url,
    servico: "Brindes personalizados",
  },
  {
    titulo: "Kits e Sacolas Corporativas",
    desc: "Montamos o kit inteiro: sacola, embalagem e o que vai dentro, tudo com a sua identidade.",
    img: kitR2,
    servico: "Kits e sacolas",
  },
  {
    titulo: "Agendas e Canecas com Nome",
    desc: "Agenda 2026 com capa personalizada e caneca com nome, foto ou frase.",
    img: agendaCaneca,
    servico: "Agendas e canecas",
  },
];

const outros: {
  titulo: string;
  desc: string;
  icon: typeof CreditCard;
  servico: string;
  img?: string;
}[] = [
  {
    titulo: "Cartões de Visita",
    desc: "Papel bom, laminação fosca ou brilho.",
    icon: CreditCard,
    servico: "Cartões de visita",
    img: cartaoAsset.url,
  },
  {
    titulo: "Adesivos e Tags",
    desc: "Recortado, rótulo de embalagem e folder.",
    icon: Sticker,
    servico: "Adesivos e tags",
    img: adesivosAsset.url,
  },
  {
    titulo: "Banners e Lonas",
    desc: "Grande formato pra evento e fachada.",
    icon: Flag,
    servico: "Banners e lonas",
    img: bannersAsset.url,
  },
  {
    titulo: "Troféus e Medalhas",
    desc: "Premiação de corrida, campeonato e festival.",
    icon: Trophy,
    servico: "Troféus e medalhas",
    img: trofeusAsset.url,
  },
  {
    titulo: "Papelaria",
    desc: "Papel de seda com a marca, bloco, envelope e timbrado.",
    icon: FileText,
    servico: "Papelaria",
    img: papelariaAsset.url,
  },
  {
    titulo: "Fitas Personalizadas",
    desc: "Cetim impresso em hot stamping dourado, com a sua marca.",
    icon: Ribbon,
    servico: "Fitas personalizadas",
    img: fitasAsset.url,
  },
  {
    titulo: "Datas Comemorativas",
    desc: "Lembrancinha, caixa e decoração impressa.",
    icon: PartyPopper,
    servico: "Datas comemorativas",
    img: datasAsset.url,
  },
  {
    titulo: "Placas QR Code",
    desc: "Display de balcão pra agendamento, cardápio e WhatsApp.",
    icon: QrCode,
    servico: "Placas QR Code",
    img: qrCodeAsset.url,
  },
  {
    titulo: "Kits Executivos",
    desc: "Caneta e porta-cartão em estojo, pronto pra presentear.",
    icon: Briefcase,
    servico: "Kits executivos",
    img: kitExecutivoAsset.url,
  },
];

export function Produtos() {
  const { abrirOrcamento } = useOrcamento();

  return (
    <section id="produtos" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <span className="eyebrow">Catálogo</span>
      <h2 className="mt-4 max-w-2xl text-3xl sm:text-5xl">
        O que a gente <span className="text-brand">imprime</span>
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Cartão de visita, banner de evento, fita personalizada, kit de premiação. Se dá pra imprimir ou personalizar,
        provavelmente a gente faz. Produção é aqui mesmo e você retira no Centro ou combina a entrega em Ilhéus e
        Itabuna.
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
              className="h-44 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-xl">{p.titulo}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
              <button
                type="button"
                onClick={() => abrirOrcamento("produto", p.servico)}
                className="mt-4 inline-flex items-center gap-2 font-display font-bold text-brand transition-colors hover:text-accent-foreground"
              >
                <WhatsAppIcon className="size-4 text-lime" aria-hidden="true" />
                Pedir orçamento
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {outros.map((p) => (
          <button
            key={p.titulo}
            type="button"
            onClick={() => abrirOrcamento("catalogo", p.servico)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-card transition-colors hover:border-lime"
          >
            {p.img ? (
              <img
                src={p.img}
                alt={`${p.titulo} — NC Copiadora`}
                loading="lazy"
                className="h-44 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            ) : null}
            <div className="flex flex-1 flex-col p-5">
              <p.icon className="size-6 text-brand" aria-hidden="true" />
              <h3 className="mt-3 text-lg">{p.titulo}</h3>

              <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-bold text-brand">
                <WhatsAppIcon className="size-4 text-lime" aria-hidden="true" />
                Pedir orçamento
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
