import { Star, Instagram } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { NC } from "@/lib/nc";
import { useOrcamento } from "./OrcamentoProvider";
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
    nome: "Rose Cunha",
    texto:
      "Atendimento acolhedor. Pessoal competente e solícito. Produtos impecáveis e prazos cumpridos perfeitamente. Recomendo sempre.",
  },
  {
    nome: "Saulo Fabian Borges Sória",
    texto:
      "Excelente atendimento da equipe de recepção e técnica de impressão. Atendimento do Ruan diferenciado.",
  },
  {
    nome: "Caique Alca",
    texto:
      "Atendimento profissional e prazos atrativos com preços adequados. Recomendo para impressões e serviços do gênero.",
  },
];

function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/).filter((p) => p.length > 0);
  if (partes.length === 0) return "?";
  const a = partes[0][0] ?? "";
  const b = partes.length === 1 ? a : (partes[partes.length - 1][0] ?? "");
  return (a + b).toUpperCase();
}

export function ProvaSocial() {
  const { abrirOrcamento } = useOrcamento();

  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <span className="eyebrow">
        <Star className="size-3.5 fill-current" aria-hidden="true" />
        Avaliações do Google
      </span>
      <h2 className="mt-4 max-w-2xl text-3xl sm:text-5xl">
        Quem já <span className="text-brand">imprime com a gente</span>
      </h2>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-foreground">{NC.googleNota}</span>
          <span className="text-sm text-muted-foreground">/5</span>
        </div>
        <div className="flex items-center gap-0.5 text-yellow-500" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="size-5 fill-current" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{NC.googleAvaliacoes} avaliações</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {depoimentos.map((d) => (
          <figure
            key={d.nome}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div
                className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-brand-foreground"
                aria-hidden="true"
              >
                {iniciais(d.nome)}
              </div>
              <div className="min-w-0">
                <figcaption className="truncate font-semibold text-foreground">{d.nome}</figcaption>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <div className="flex gap-0.5 text-yellow-500" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Avaliação no Google</span>
                </div>
              </div>
            </div>
            <blockquote className="mt-4 flex-1 text-foreground leading-relaxed">
              “{d.texto}”
            </blockquote>
            <a
              href={NC.google}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center self-start text-sm font-semibold text-brand hover:underline underline-offset-4"
            >
              Ver no Google
            </a>
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

      <p className="mt-12 max-w-2xl text-muted-foreground">Alguns pedidos que saíram daqui:</p>

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
          <button type="button" onClick={() => abrirOrcamento("prova-social")} className="btn-lime">
            <WhatsAppIcon className="size-5" aria-hidden="true" />
            Falar no WhatsApp
          </button>
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
