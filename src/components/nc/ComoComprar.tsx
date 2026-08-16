import { WhatsAppIcon } from "./WhatsAppIcon";
import { wa } from "@/lib/nc";

const passos = [
  { n: "01", t: "Chame no WhatsApp", d: "Diz o que você precisa, quantas unidades e pra quando." },
  { n: "02", t: "Receba o orçamento", d: "Mandamos valor, prazo de produção e como pagar." },
  { n: "03", t: "Aprove a arte", d: "Você manda o arquivo pronto ou a gente cria e envia pra você conferir." },
  { n: "04", t: "Retire ou receba", d: "Retira na loja, no Centro de Ilhéus, ou combina a entrega." },
];

export function ComoComprar() {
  return (
    <section id="como-comprar" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <span className="eyebrow">Como comprar</span>
      <h2 className="mt-4 max-w-2xl text-3xl sm:text-5xl">
        Do orçamento à entrega em <span className="text-brand">4 passos</span>
      </h2>

      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {passos.map((p) => (
          <li key={p.n} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <span className="font-display text-3xl font-extrabold text-lime">{p.n}</span>
            <h3 className="mt-2 text-lg">{p.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
          </li>
        ))}
      </ol>

      <a
        href={wa("Olá, li o passo a passo no site e quero começar meu pedido")}
        target="_blank"
        rel="noopener"
        className="btn-lime mt-10"
      >
        <WhatsAppIcon className="size-5" aria-hidden="true" />
        Começar meu pedido
      </a>
    </section>
  );
}
