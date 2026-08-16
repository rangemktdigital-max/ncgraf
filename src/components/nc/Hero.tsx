import { MessageCircle, MapPin, Clock, CreditCard } from "lucide-react";
import heroAsset from "@/assets/20251204_191350.jpg.asset.json";
import { wa } from "@/lib/nc";

export function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden pt-16">
      <img
        src={heroAsset.url}
        alt="Parque gráfico da NC Copiadora em Ilhéus com impressoras e produtos personalizados"
        width={1200}
        height={900}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <span className="eyebrow">Ilhéus · Itabuna · Bahia</span>

        <h1 className="mt-5 font-display text-[2.6rem] leading-[0.98] text-brand-foreground sm:text-6xl">
          IMPRESSÃO COM PRAZO
          <br />
          <span className="text-lime">GRÁFICA RÁPIDA DE ILHÉUS</span>
        </h1>

        <p className="mt-5 max-w-xl text-base text-brand-foreground/85 sm:text-lg">
          Somos especialistas em desenvolvimento gráfico e apaixonados por impressos, porque a
          impressão cria conexões humanas e conectamos seu produto ao seu cliente. Atendemos Ilhéus
          e Itabuna com produção própria no Centro.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={wa("Olá, quero um orçamento")}
            target="_blank"
            rel="noopener"
            className="btn-lime text-base"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Fale Conosco
          </a>
          <a
            href={wa("Olá, vim pelo hero do site e quero solicitar um orçamento")}
            target="_blank"
            rel="noopener"
            className="btn-ghost-lime text-base"
          >
            Solicite um Orçamento
          </a>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { icon: MapPin, text: "Loja física no Centro de Ilhéus" },
            { icon: Clock, text: "Seg a sex 9h–17h · Sáb 9h–12h" },
            { icon: CreditCard, text: "Cartão em até 3x sem juros" },
          ].map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-2.5 rounded-full bg-brand-foreground/10 px-4 py-2.5 text-sm font-semibold text-brand-foreground backdrop-blur-sm"
            >
              <Icon className="size-4 shrink-0 text-lime" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
