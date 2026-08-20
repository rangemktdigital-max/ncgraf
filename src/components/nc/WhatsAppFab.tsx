import { WhatsAppIcon } from "./WhatsAppIcon";
import { useOrcamento } from "./OrcamentoProvider";

export function WhatsAppFab() {
  const { abrirOrcamento } = useOrcamento();

  return (
    <button
      type="button"
      onClick={() => abrirOrcamento("botao-flutuante")}
      aria-label="Solicitar orçamento no WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-lime text-lime-foreground shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="size-7" aria-hidden="true" />
    </button>
  );
}
