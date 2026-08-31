import { MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { NC } from "@/lib/nc";
import { useOrcamento } from "./OrcamentoProvider";

export function Localizacao() {
  const { abrirOrcamento } = useOrcamento();

  return (
    <section id="localizacao" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <span className="eyebrow">Localização</span>
        <h2 className="mt-4 max-w-2xl text-3xl sm:text-5xl">
          Atendemos <span className="text-brand">Ilhéus e Itabuna</span>
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
          <iframe
            src={NC.mapsEmbed}
            title="Mapa da NC Copiadora em Ilhéus"
            loading="lazy"
            className="h-64 w-full rounded-2xl border border-border shadow-card sm:h-72 lg:h-[300px]"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8 lg:self-start">
            <p className="flex gap-3 text-sm">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              {NC.endereco}
            </p>
            <p className="mt-3 flex gap-3 text-sm">
              <Clock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              {NC.horario}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => abrirOrcamento("localizacao")}
                className="btn-lime min-h-11 text-sm"
              >
                <WhatsAppIcon className="size-4" aria-hidden="true" />
                Chamar no WhatsApp
              </button>
              <a
                href={NC.maps}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-brand px-5 py-2.5 font-display text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
              >
                Como chegar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
