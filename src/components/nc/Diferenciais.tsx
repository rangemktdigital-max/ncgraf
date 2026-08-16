import { MessageCircle, Timer, CreditCard } from "lucide-react";
import { wa } from "@/lib/nc";

const itens = [
  {
    icon: MessageCircle,
    titulo: "Atendimento via WhatsApp",
    desc: "Envie a arte ou só a ideia: a gente responde no horário comercial e resolve tudo por lá.",
  },
  {
    icon: Timer,
    titulo: "Prazo de produção claro",
    desc: "Você recebe o prazo junto com o orçamento — sem surpresa em cima da data do seu evento.",
  },
  {
    icon: CreditCard,
    titulo: "Até 3x sem juros",
    desc: "Pague no cartão de crédito em até 3x sem juros, além de pix e dinheiro na loja.",
  },
];

export function Diferenciais() {
  return (
    <section className="surface-brand">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <span className="eyebrow">Por que a NC</span>
        <h2 className="mt-4 max-w-2xl text-3xl text-brand-foreground sm:text-5xl">
          Gráfica rápida de verdade, <span className="text-lime">com gente perto de você</span>
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
            <MessageCircle className="size-5" aria-hidden="true" />
            Falar com um atendente
          </a>
        </div>
      </div>
    </section>
  );
}
