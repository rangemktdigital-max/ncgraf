import { Timer, CreditCard } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { wa } from "@/lib/nc";

const itens = [
  {
    icon: MessageCircle,
    titulo: "Atendimento via WhatsApp",
    desc: "Manda a arte pronta ou só a ideia. A gente responde no horário da loja e resolve tudo por lá mesmo.",
  },
  {
    icon: Timer,
    titulo: "Prazo dito na hora",
    desc: "O prazo vai junto com o valor, antes de você fechar. Ninguém merece descobrir atraso na véspera do evento.",
  },
  {
    icon: CreditCard,
    titulo: "Até 3x sem juros",
    desc: "Cartão de crédito em até 3x sem juros. Também aceitamos pix e dinheiro na loja.",
  },
];

export function Diferenciais() {
  return (
    <section className="surface-brand">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <span className="eyebrow">Por que a NC</span>
        <h2 className="mt-4 max-w-2xl text-3xl text-brand-foreground sm:text-5xl">
          Rápida de verdade, <span className="text-lime">e com gente aqui do lado</span>
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {itens.map(({ icon: Icon, titulo, desc }) => (
            <div
              key={titulo}
              className="rounded-2xl border border-brand-foreground/12 bg-brand-foreground/5 p-6"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-lime text-lime-foreground">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl text-brand-foreground">{titulo}</h3>
              <p className="mt-2 text-sm text-brand-foreground/75">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={wa("Olá, vi os diferenciais no site e quero falar com um atendente")}
            target="_blank"
            rel="noopener"
            className="btn-lime"
          >
            <WhatsAppIcon className="size-5" aria-hidden="true" />
            Falar com um atendente
          </a>
        </div>
      </div>
    </section>
  );
}
