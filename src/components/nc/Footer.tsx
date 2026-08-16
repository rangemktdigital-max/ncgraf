import { MessageCircle, Instagram, MapPin, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { wa, NC, WHATSAPP_NUMBER } from "@/lib/nc";

export function Footer() {
  return (
    <footer className="surface-brand">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-brand-foreground/75">
            Gráfica rápida em Ilhéus/BA. Especialistas em desenvolvimento gráfico e apaixonados por
            impressos.
          </p>
        </div>

        <div className="text-sm text-brand-foreground/80">
          <h3 className="text-base text-brand-foreground">Contato</h3>
          <a
            href={wa("Olá, vim pelo rodapé do site e quero um orçamento")}
            target="_blank"
            rel="noopener"
            className="mt-3 flex items-center gap-2 font-bold text-lime"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            (73) 3634-7138 · WhatsApp
          </a>
          <a
            href={NC.instagram}
            target="_blank"
            rel="noopener"
            className="mt-2 flex items-center gap-2"
          >
            <Instagram className="size-4" aria-hidden="true" />
            @nccopiadora
          </a>
        </div>

        <div className="text-sm text-brand-foreground/80">
          <h3 className="text-base text-brand-foreground">Loja</h3>
          <p className="mt-3 flex gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {NC.endereco}
          </p>
          <p className="mt-2 flex gap-2">
            <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {NC.horario}
          </p>
        </div>
      </div>

      <div className="border-t border-brand-foreground/12 px-4 py-5 text-center text-xs text-brand-foreground/60">
        {NC.nome} · CNPJ {NC.cnpj} · wa.me/{WHATSAPP_NUMBER}
      </div>
    </footer>
  );
}
