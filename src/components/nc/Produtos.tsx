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

type Produto = {
  titulo: string;
  desc: string;
  servico: string;
  img: string;
  icon?: typeof CreditCard;
  position?: string;
};

const produtos: Produto[] = [
  {
    titulo: "Brindes Personalizados",
    desc: "Caneca, agenda, caneta e kit com a sua marca. Fecha bem como presente de cliente.",
    img: brindesAsset.url,
    servico: "Brindes personalizados",
    position: "50% 50%",
  },
  {
    titulo: "Kits Corporativos",
    desc: "Montamos o kit inteiro: sacola, embalagem e o que vai dentro, tudo com a sua identidade.",
    img: kitR2,
    servico: "Kits e sacolas",
    position: "50% 60%",
  },
  {
    titulo: "Agendas e Canecas com Nome",
    desc: "Agenda 2026 com capa personalizada e caneca com nome, foto ou frase.",
    img: agendaCaneca,
    servico: "Agendas e canecas",
    position: "50% 50%",
  },
  {
    titulo: "Cartões de Visita",
    desc: "Papel bom, laminação fosca ou brilho.",
    icon: CreditCard,
    servico: "Cartões de visita",
    img: cartaoAsset.url,
    position: "50% 40%",
  },
  {
    titulo: "Adesivos e Tags",
    desc: "Recortado, rótulo de embalagem e folder.",
    icon: Sticker,
    servico: "Adesivos e tags",
    img: adesivosAsset.url,
    position: "50% 50%",
  },
  {
    titulo: "Banners e Lonas",
    desc: "Grande formato pra evento e fachada.",
    icon: Flag,
    servico: "Banners e lonas",
    img: bannersAsset.url,
    position: "50% 50%",
  },
  {
    titulo: "Troféus e Medalhas",
    desc: "Premiação de corrida, campeonato e festival.",
    icon: Trophy,
    servico: "Troféus e medalhas",
    img: trofeusAsset.url,
    position: "50% 60%",
  },
  {
    titulo: "Papelaria",
    desc: "Papel de seda com a marca, bloco, envelope e timbrado.",
    icon: FileText,
    servico: "Papelaria",
    img: papelariaAsset.url,
    position: "50% 50%",
  },
  {
    titulo: "Fitas Personalizadas",
    desc: "Cetim impresso em hot stamping dourado, com a sua marca.",
    icon: Ribbon,
    servico: "Fitas personalizadas",
    img: fitasAsset.url,
    position: "50% 50%",
  },
  {
    titulo: "Datas Comemorativas",
    desc: "Lembrancinha, caixa e decoração impressa.",
    icon: PartyPopper,
    servico: "Datas comemorativas",
    img: datasAsset.url,
    position: "50% 50%",
  },
  {
    titulo: "Placas QR Code",
    desc: "Display de balcão pra agendamento, cardápio e WhatsApp.",
    icon: QrCode,
    servico: "Placas QR Code",
    img: qrCodeAsset.url,
    position: "50% 50%",
  },
  {
    titulo: "Kits Executivos",
    desc: "Caneta e porta-cartão em estojo, pronto pra presentear.",
    icon: Briefcase,
    servico: "Kits executivos",
    img: kitExecutivoAsset.url,
    position: "50% 50%",
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

      <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {produtos.map((p) => {
          const Icon = p.icon;

          return (
            <button
              key={p.titulo}
              type="button"
              onClick={() => abrirOrcamento("catalogo", p.servico)}
              className="group flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-card transition-colors hover:border-lime"
            >
              <div className="h-44 w-full shrink-0 overflow-hidden">
                <img
                  src={p.img}
                  alt={`${p.titulo} — NC Copiadora`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: p.position ?? "50% 50%" }}
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 h-6">
                  {Icon ? <Icon className="size-6 text-brand" aria-hidden="true" /> : null}
                </div>

                <h3 className="min-h-[48px] text-lg leading-tight">{p.titulo}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>

                <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-bold text-brand">
                  <WhatsAppIcon className="size-4 text-lime" aria-hidden="true" />
                  Pedir orçamento
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
