import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useServerFn } from "@tanstack/react-start";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/nc";
import { enviarLeadPlanilha } from "@/lib/orcamento.functions";
import { pushDataLayer } from "@/lib/gtm";

export const SERVICOS = [
  "Brindes personalizados",
  "Kits e sacolas",
  "Agendas e canecas",
  "Cartões de visita",
  "Adesivos e tags",
  "Banners e lonas",
  "Troféus e medalhas",
  "Papelaria",
  "Fitas personalizadas",
  "Datas comemorativas",
  "Placas QR Code",
  "Kits executivos",
  "Outro / não sei ainda",
] as const;

type OrcamentoContextValue = {
  /** Abre o formulário. `origem` identifica de qual CTA veio o lead. */
  abrirOrcamento: (origem?: string, servicoInicial?: string) => void;
};

/**
 * O contexto é guardado em `globalThis` para sobreviver a recargas parciais
 * (HMR), quando o módulo pode ser avaliado duas vezes e gerar dois contextos
 * distintos — provider em um, consumidor em outro.
 */
const GLOBAL_KEY = "__nc_orcamento_ctx__";
const globalStore = globalThis as typeof globalThis & {
  [GLOBAL_KEY]?: React.Context<OrcamentoContextValue | null>;
};
const OrcamentoContext =
  globalStore[GLOBAL_KEY] ??
  (globalStore[GLOBAL_KEY] = createContext<OrcamentoContextValue | null>(null));

export function useOrcamento() {
  const ctx = useContext(OrcamentoContext);
  if (!ctx) throw new Error("useOrcamento precisa estar dentro de <OrcamentoProvider>");
  return ctx;
}

type Erros = Partial<Record<"nome" | "telefone" | "servicos", string>>;

export function OrcamentoProvider({ children }: { children: ReactNode }) {
  const [aberto, setAberto] = useState(false);
  const [origem, setOrigem] = useState("site");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servicos, setServicos] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  const salvarPlanilha = useServerFn(enviarLeadPlanilha);

  const abrirOrcamento = useCallback((o = "site", servicoInicial?: string) => {
    setOrigem(o);
    setErros({});
    setErroEnvio(null);
    if (servicoInicial) setServicos((s) => (s.includes(servicoInicial) ? s : [...s, servicoInicial]));
    pushDataLayer("abriu_forms", { origem: o });
    setAberto(true);
  }, []);

  const fechar = useCallback(() => setAberto(false), []);

  const alternarServico = (s: string) =>
    setServicos((atual) => (atual.includes(s) ? atual.filter((x) => x !== s) : [...atual, s]));

  const validar = (): boolean => {
    const e: Erros = {};
    if (nome.trim().length < 2) e.nome = "Diga seu nome.";
    if (telefone.replace(/\D/g, "").length < 10) e.telefone = "Telefone com DDD, por favor.";
    if (servicos.length === 0) e.servicos = "Escolha pelo menos um item.";
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const enviar = async () => {
    if (enviando) return;
    setErroEnvio(null);
    if (!validar()) return;
    setEnviando(true);

    const payload = {
      nome: nome.trim(),
      telefone: telefone.trim(),
      servicos,
      mensagem: mensagem.trim(),
      origem,
    };

    // O registro na planilha é best-effort: uma falha de logging nunca pode
    // impedir o cliente de chegar ao WhatsApp (perda direta de lead).
    try {
      const resultado = await salvarPlanilha({ data: payload });
      if (resultado.ok) {
        // Lead confirmado pela planilha: só aqui disparamos a conversão.
        pushDataLayer("lead", { origem: payload.origem });
      } else {
        console.error("Planilha não confirmou o lead", resultado.mensagem);
      }
    } catch (err) {
      console.error("Falha ao registrar lead na planilha", err);
    }


    const texto =
      `Olá! Quero um orçamento.\n\n` +
      `Nome: ${payload.nome}\n` +
      `Telefone: ${payload.telefone}\n` +
      `Serviços: ${servicos.join(", ")}\n` +
      (payload.mensagem ? `Detalhes: ${payload.mensagem}\n` : "") +
      `\n(via site · ${origem})`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener",
    );

    setEnviando(false);
    setAberto(false);
    setMensagem("");
  };


  const value = useMemo(() => ({ abrirOrcamento }), [abrirOrcamento]);

  return (
    <OrcamentoContext.Provider value={value}>
      {children}

      {aberto && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Solicitar orçamento"
          onClick={fechar}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card p-6 shadow-card sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl">Solicite seu orçamento</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Preenche rapidinho que a gente volta com prazo e valor no WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={fechar}
                aria-label="Fechar formulário"
                className="rounded-full px-2 py-1 text-xl leading-none text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                void enviar();
              }}
            >
              <div>
                <label htmlFor="nc-nome" className="text-sm font-semibold">
                  Nome
                </label>
                <input
                  id="nc-nome"
                  value={nome}
                  maxLength={100}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:border-brand"
                />
                {erros.nome && <p className="mt-1 text-xs text-destructive">{erros.nome}</p>}
              </div>

              <div>
                <label htmlFor="nc-tel" className="text-sm font-semibold">
                  Telefone
                </label>
                <input
                  id="nc-tel"
                  value={telefone}
                  inputMode="tel"
                  maxLength={30}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(73) 90000-0000"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:border-brand"
                />
                {erros.telefone && (
                  <p className="mt-1 text-xs text-destructive">{erros.telefone}</p>
                )}
              </div>

              <div>
                <span className="text-sm font-semibold">O que você precisa?</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SERVICOS.map((s) => {
                    const ativo = servicos.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={ativo}
                        onClick={() => alternarServico(s)}
                        className={cn(
                          "rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors",
                          ativo
                            ? "border-lime bg-lime text-lime-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-brand",
                        )}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
                {erros.servicos && (
                  <p className="mt-1 text-xs text-destructive">{erros.servicos}</p>
                )}
              </div>

              <div>
                <label htmlFor="nc-msg" className="text-sm font-semibold">
                  Mensagem
                </label>
                <textarea
                  id="nc-msg"
                  value={mensagem}
                  maxLength={1000}
                  rows={4}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Quantidade, prazo, se já tem a arte pronta..."
                  className="mt-1.5 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:border-brand"
                />
              </div>

              {erroEnvio && (
                <p
                  role="alert"
                  className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {erroEnvio}
                </p>
              )}


              <button type="submit" disabled={enviando} className="btn-lime w-full disabled:opacity-60">
                <WhatsAppIcon className="size-5" aria-hidden="true" />
                {enviando ? "Enviando..." : "Enviar no WhatsApp"}
              </button>
            </form>
          </div>
        </div>
      )}
    </OrcamentoContext.Provider>
  );
}
