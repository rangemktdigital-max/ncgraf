import { useEffect, useState } from "react";
import { MapPin, Clock, CreditCard } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import carrossel1 from "@/assets/carrossel-1.webp.asset.json";
import carrossel2 from "@/assets/carrossel-2.webp.asset.json";
import carrossel3 from "@/assets/carrossel-3.webp.asset.json";
import carrossel4 from "@/assets/carrossel-4.webp.asset.json";
import { useOrcamento } from "./OrcamentoProvider";
const slides = [
  {
    url: carrossel1.url,
    alt: "Balcão da NC Copiadora com canecas e agendas personalizadas",
    position: "35% 60%",
  },
  {
    url: carrossel2.url,
    alt: "Fachada da NC Copiadora no Centro de Ilhéus",
    position: "50% 50%",
  },
  {
    url: carrossel3.url,
    alt: "Clientes sendo atendidos na loja da NC Copiadora",
    position: "50% 50%",
  },
  {
    url: carrossel4.url,
    alt: "Impressora de grande formato imprimindo adesivos personalizados",
    position: "50% 50%",
  },
];

export function Hero() {
  const { abrirOrcamento } = useOrcamento();
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setAtivo((i) => (i + 1) % slides.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="topo" className="relative isolate overflow-hidden pt-16">
      <div className="absolute inset-0 -z-20" aria-hidden={undefined}>
        {slides.map((slide, i) => (
          <img
            key={slide.url}
            src={slide.url}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 size-full object-cover transition-opacity duration-700 ease-in-out"
            style={{
              opacity: i === ativo ? 1 : 0,
              objectPosition: slide.position,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <span className="eyebrow">Ilhéus - itabuna e região</span>

        <h1 className="mt-5 font-display text-[2.6rem] leading-[0.98] text-brand-foreground sm:text-6xl">
          IMPRESSÃO COM PRAZO
          <br />
          <span className="text-lime">GRÁFICA RÁPIDA DE ILHÉUS</span>
        </h1>

        <p className="mt-5 max-w-xl text-base text-brand-foreground/85 sm:text-lg">
          Somos especialistas em desenvolvimento gráfico e apaixonados por impressos, porque a impressão cria conexões
          humanas e conectamos seu produto ao seu cliente. Atendemos Ilhéus e Itabuna com produção própria no Centro.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => abrirOrcamento("hero")} className="btn-lime text-base">
            <WhatsAppIcon className="size-5" aria-hidden="true" />
            Solicite orçamento
          </button>
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
