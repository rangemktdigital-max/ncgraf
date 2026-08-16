import { MessageCircle } from "lucide-react";
import { wa } from "@/lib/nc";

const passos = [
  { n: "01", t: "Chame no WhatsApp", d: "Conte o que precisa, a quantidade e a data de entrega." },
  { n: "02", t: "Receba o orçamento", d: "Enviamos valor, prazo de produção e formas de pagamento." },
  { n: "03", t: "Aprove a arte", d: "Você manda o arquivo ou a gente cria e envia para aprovação." },
  { n: "04", t: "Retire ou receba", d: "Retirada na loja no Centro de Ilhéus ou entrega combinada." },
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
        <MessageCircle className="size-5" aria-hidden="true" />
        Começar meu pedido
      </a>
    </section>
  );
}
