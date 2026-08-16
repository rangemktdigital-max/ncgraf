import { WhatsAppIcon } from "./WhatsAppIcon";
import { wa } from "@/lib/nc";

export function WhatsAppFab() {
  return (
    <a
      href={wa("Olá, vim pelo botão flutuante do site e quero um orçamento")}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-lime text-lime-foreground shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="size-7" aria-hidden="true" />
    </a>
  );
}
