import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Factory, MapPin, Star, Truck } from "lucide-react";

import { Footer } from "@/components/nc/Footer";
import { Logo } from "@/components/nc/Logo";
import { OrcamentoProvider, useOrcamento } from "@/components/nc/OrcamentoProvider";
import { WhatsAppFab } from "@/components/nc/WhatsAppFab";
import { WhatsAppIcon } from "@/components/nc/WhatsAppIcon";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { NC } from "@/lib/nc";

const title = "Adesivos Personalizados em Ilhéus | NC Copiadora";
const description =
  "Adesivos personalizados para vitrines, embalagens, rótulos, veículos e materiais promocionais. Produção própria, qualidade e atendimento em Ilhéus e região.";

const googleReviews = [
  {
    name: "Rose Cunha",
    text: "Atendimento acolhedor. Pessoal competente e solícito. Produtos impecáveis e prazos cumpridos perfeitamente. Recomendo sempre.",
  },
  {
    name: "Saulo Fabian Borges Sória",
    text: "Excelente atendimento da equipe de recepção e técnica de impressão. Atendimento do Ruan diferenciado.",
  },
  {
    name: "Caique Alca",
    text: "Atendimento profissional e prazos atrativos com preços adequados. Recomendo para impressões e serviços do gênero.",
  },
];

export const Route = createFileRoute("/adesivos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://orcamento.nccopiadora.com.br/adesivos" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://orcamento.nccopiadora.com.br/adesivos" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Adesivos personalizados",
          description,
          provider: {
            "@type": "PrintingService",
            name: "Nc Copiadora - Comunicação Gráfica",
            telephone: "+557336347138",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rua Visconde de Ouro Preto, 53, Centro",
              addressLocality: "Ilhéus",
              addressRegion: "BA",
              postalCode: "45653-180",
              addressCountry: "BR",
            },
          },
          areaServed: ["Ilhéus", "Itabuna"],
          serviceType: "Adesivos personalizados para empresas",
        }),
      },
    ],
  }),
  component: AdesivosPage,
});

const applications = [
  {
    image: "/images/adesivos/vitrines.png",
    label: "Vitrines",
    alt: "Adesivo promocional aplicado em uma vitrine",
  },
  {
    image: "/images/adesivos/rotulos-promocoes.png",
    label: "Rótulos",
    alt: "Rótulos adesivos dourados personalizados",
  },
  {
    image: "/images/adesivos/lacre.png",
    label: "Lacres",
    alt: "Lacre adesivo personalizado aplicado em uma embalagem",
  },
];

const clientLogos = Array.from({ length: 15 }, (_, index) => ({
  src: `/images/adesivos/logos/novo-${index + 1}.svg`,
}));

const stickerTypes = [
  "Adesivos para vitrines",
  "Rótulos para embalagens",
  "Adesivos em vinil",
  "Adesivos promocionais",
  "Etiquetas personalizadas",
  "Adesivos para veículos",
  "Adesivos para produtos",
];

function AdesivosPage() {
  return (
    <OrcamentoProvider variant="adesivos">
      <div className="min-h-screen bg-background">
        <AdesivosHeader />
        <main>
          <HeroAdesivos />
          <ApplicationsSection />
          <BenefitsSection />
          <TestimonialsSection />
          <TypesSection />
          <CredibilitySection />
          <FinalCta />
        </main>
        <Footer />
        <WhatsAppFab />
      </div>
    </OrcamentoProvider>
  );
}

function AdesivosHeader() {
  const [open, setOpen] = useState(false);
  const { abrirOrcamento } = useOrcamento();
  const links = [
    { href: "#aplicacoes", label: "Aplicações" },
    { href: "#beneficios", label: "Benefícios" },
    { href: "#tipos", label: "Tipos de adesivo" },
    { href: "#contato-adesivos", label: "Orçamento" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 surface-brand shadow-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm font-bold uppercase tracking-wide text-brand-foreground/85 transition-colors hover:text-lime"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => abrirOrcamento("adesivos-menu")}
            className="btn-lime !px-5 !py-2 text-sm"
          >
            <WhatsAppIcon className="size-4" aria-hidden="true" />
            Pedir Orçamento!
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => abrirOrcamento("adesivos-topo-mobile")}
            aria-label="Pedir Orçamento!"
            className="grid size-10 place-items-center rounded-full bg-lime text-lime-foreground"
          >
            <WhatsAppIcon className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-brand-foreground/25 text-brand-foreground"
          >
            <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brand-foreground/10 px-4 pb-4 pt-2 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-brand-foreground/10 py-3 font-display font-bold uppercase tracking-wide text-brand-foreground/90"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function HeroAdesivos() {
  const { abrirOrcamento } = useOrcamento();

  return (
    <section id="topo" className="relative isolate overflow-hidden pt-16">
      <img
        src="/images/adesivos/hero-atendimento-nc.png"
        alt="Interior da NC Copiadora com atendimento e área de produção gráfica"
        className="absolute inset-0 -z-20 size-full object-cover object-center"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand/90 via-brand/65 to-brand/75"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-[5.6rem]">
        <h1 className="max-w-4xl text-[2.7rem] leading-[0.98] text-brand-foreground sm:text-6xl lg:text-7xl">
          Adesivos personalizados em <span className="text-lime">Ilhéus-BA</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-foreground/85 sm:text-lg">
          Produção própria, acabamento profissional e atendimento rápido para vitrines, embalagens,
          rótulos, veículos e materiais promocionais.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => abrirOrcamento("adesivos-hero")}
            className="btn-lime text-base"
          >
            <WhatsAppIcon className="size-5" aria-hidden="true" />
            Pedir Orçamento!
          </button>
          <a href="#aplicacoes" className="btn-ghost-lime text-base">
            Ver aplicações
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Factory, text: "Produção própria" },
            { icon: MapPin, text: "Atendimento em Ilhéus" },
            { icon: Truck, text: "Orçamento rápido" },
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

function ApplicationsSection() {
  const { abrirOrcamento } = useOrcamento();

  return (
    <section id="aplicacoes" className="mx-auto max-w-6xl px-4 py-[3.2rem] sm:py-[4.8rem]">
      <h2 className="max-w-2xl text-3xl sm:text-5xl">Onde usar?</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Use sua identidade visual em pontos de contato que ajudam o cliente a reconhecer, lembrar e
        escolher sua empresa.
      </p>

      <div className="mt-10 grid justify-center gap-5 sm:grid-cols-3">
        {applications.map(({ image, label, alt }) => (
          <article
            key={label}
            className="group relative aspect-[4/5] w-full max-w-[18rem] justify-self-center overflow-hidden rounded-3xl bg-card shadow-card"
          >
            <img
              src={image}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent"
              aria-hidden="true"
            />
            <h3 className="absolute inset-x-5 bottom-5 text-xl text-white sm:text-2xl">{label}</h3>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => abrirOrcamento("adesivos-aplicacoes")}
        className="btn-lime mt-8"
      >
        <WhatsAppIcon className="size-5" aria-hidden="true" />
        Pedir Orçamento!
      </button>
    </section>
  );
}

function BenefitsSection() {
  const { abrirOrcamento } = useOrcamento();

  return (
    <section id="beneficios" className="bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 pb-[2.52rem] pt-[2.4rem] sm:pb-[3.36rem] sm:pt-[3.2rem]">
        <h2 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
          Marcas que confiam na <span className="text-brand">NC</span>
        </h2>

        <p className="mt-5 max-w-2xl text-muted-foreground">
          Adesivos e materiais personalizados produzidos para negócios que querem apresentar sua
          marca com mais presença.
        </p>

        <div className="mt-10 overflow-hidden px-1 py-4 sm:px-2 sm:py-6">
          <div className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24"
              aria-hidden="true"
            />

            <InfiniteSlider gap={48} duration={38} className="w-full">
              {clientLogos.map(({ src }, index) => (
                <div
                  key={`${src}-${index}`}
                  className="flex h-24 w-40 shrink-0 items-center justify-center px-4 py-3 sm:h-28 sm:w-48 sm:px-5"
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-h-16 max-w-full scale-[1.35] object-contain sm:max-h-20"
                  />
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>

        <button
          type="button"
          onClick={() => abrirOrcamento("adesivos-beneficios")}
          className="btn-lime mt-8"
        >
          <WhatsAppIcon className="size-5" aria-hidden="true" />
          Pedir Orçamento!
        </button>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { abrirOrcamento } = useOrcamento();

  return (
    <section id="depoimentos" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-[3.2rem] sm:py-[4.8rem]">
        <div className="rounded-3xl border border-border bg-card p-7 shadow-card sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl">O que dizem sobre nós</h2>
              <h3 className="mt-2 text-xl sm:text-2xl">Avaliações no Google</h3>
            </div>
            <a
              href={NC.google}
              target="_blank"
              rel="noopener"
              className="text-sm font-bold text-brand underline underline-offset-4"
            >
              Ver no Google
            </a>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl font-extrabold text-foreground">{NC.googleNota}</span>
            <div>
              <div className="flex gap-0.5 text-yellow-500" aria-label="4,5 de 5 estrelas">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{NC.googleAvaliacoes} avaliações</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {googleReviews.map((review) => (
              <figure key={review.name} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <figcaption className="font-bold text-foreground">{review.name}</figcaption>
                  <div className="flex gap-0.5 text-yellow-500" aria-label="5 de 5 estrelas">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} className="size-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  “{review.text}”
                </blockquote>
              </figure>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => abrirOrcamento("adesivos-depoimentos")}
          className="btn-lime mt-8"
        >
          <WhatsAppIcon className="size-5" aria-hidden="true" />
          Pedir Orçamento!
        </button>
      </div>
    </section>
  );
}

function TypesSection() {
  const { abrirOrcamento } = useOrcamento();

  return (
    <section id="tipos" className="mx-auto max-w-6xl px-4 py-[3.2rem] sm:py-[4.8rem]">
      <div className="max-w-3xl">
        <h2 className="text-3xl sm:text-5xl">Tipos de adesivos</h2>
        <p className="mt-4 text-muted-foreground">
          Conte onde o adesivo será usado, o tamanho aproximado e a quantidade. A equipe orienta o
          melhor caminho para o seu pedido.
        </p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {stickerTypes.map((type) => (
            <li key={type} className="flex items-center gap-2 text-sm font-semibold">
              <Check className="size-5 shrink-0 text-brand" aria-hidden="true" />
              {type}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => abrirOrcamento("adesivos-tipos")}
          className="btn-lime mt-8"
        >
          <WhatsAppIcon className="size-5" aria-hidden="true" />
          Pedir Orçamento!
        </button>
      </div>
    </section>
  );
}

function CredibilitySection() {
  const { abrirOrcamento } = useOrcamento();

  return (
    <section id="credibilidade" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-[3.2rem] sm:py-[4.8rem]">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div>
            <div className="p-7 sm:p-10">
              <h2 className="text-3xl sm:text-5xl">
                Produção local em <span className="text-brand">Ilhéus</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Produção local de materiais gráficos para empresas e comércios de Ilhéus.
              </p>

              <iframe
                src={NC.mapsEmbed}
                title="Mapa da NC Copiadora em Ilhéus"
                loading="lazy"
                className="mt-6 h-44 w-full rounded-2xl border border-border sm:h-52"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>{NC.endereco}</span>
                </p>
                <p className="flex gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>{NC.horario}</span>
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => abrirOrcamento("adesivos-credibilidade")}
                  className="btn-lime w-full sm:w-auto"
                >
                  <WhatsAppIcon className="size-5" aria-hidden="true" />
                  Pedir Orçamento!
                </button>
                <a
                  href={NC.maps}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-brand px-5 py-2.5 font-display text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-brand-foreground sm:w-auto"
                >
                  Como chegar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const { abrirOrcamento } = useOrcamento();

  return (
    <section id="contato-adesivos" className="surface-brand">
      <div className="mx-auto max-w-4xl px-4 py-[3.2rem] text-center sm:py-[4.8rem]">
        <h2 className="text-3xl text-brand-foreground sm:text-5xl">
          Precisa de adesivos personalizados para sua empresa?
        </h2>
        <button
          type="button"
          onClick={() => abrirOrcamento("adesivos-final")}
          className="btn-lime mt-8 text-base"
        >
          <WhatsAppIcon className="size-5" aria-hidden="true" />
          Pedir Orçamento!
        </button>
      </div>
    </section>
  );
}
