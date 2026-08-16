import { MapPin, Clock, MessageCircle } from "lucide-react";
import lojaAsset from "@/assets/20251204_191515.jpg.asset.json";
import { wa, NC } from "@/lib/nc";

export function Localizacao() {
  return (
    <section id="localizacao" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <span className="eyebrow">Localização</span>
        <h2 className="mt-4 max-w-2xl text-3xl sm:text-5xl">
          Atendemos <span className="text-brand">Ilhéus e Itabuna</span>
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <img
            src={lojaAsset.url}
            alt="Loja da NC Copiadora no Centro de Ilhéus com balcão de atendimento e brindes"
            loading="lazy"
            width={900}
            height={700}
            className="h-72 w-full rounded-2xl object-cover shadow-card sm:h-96"
          />

          <div className="flex flex-col gap-4">
            <iframe
              src={NC.mapsEmbed}
              title="Mapa da NC Copiadora em Ilhéus"
              loading="lazy"
              className="h-56 w-full rounded-2xl border border-border shadow-card sm:h-64"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <p className="flex gap-3 text-sm">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                {NC.endereco}
              </p>
              <p className="mt-3 flex gap-3 text-sm">
                <Clock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                {NC.horario}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={wa("Olá, vim pela seção de localização e quero um orçamento")}
                  target="_blank"
                  rel="noopener"
                  className="btn-lime !py-2.5 text-sm"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Chamar no WhatsApp
                </a>
                <a
                  href={NC.maps}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center rounded-full border-2 border-brand px-5 py-2.5 font-display text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
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
