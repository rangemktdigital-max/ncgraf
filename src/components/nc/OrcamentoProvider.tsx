import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/nc";
import { enviarLeadPlanilha } from "@/lib/orcamento.functions";
import { pushDataLayer } from "@/lib/gtm";

export const SERVICOS = [
  "Brindes Personalizados",
  "Cartões de Visita",
  "Adesivos e Tags",
  "Banners e Lonas",
  "Troféus e Medalhas",
  "Papelaria",
  "Fitas Personalizadas",
  "Datas Comemorativas",
  "Placas QR Code",
  "Kits Executivos",
] as const;

const TIPOS_ADESIVOS = [
  {
    value: "Embalagens (Lacres, selo, fecho, promo)",
    label: "Embalagens",
    detail: "Lacres, selo, fecho, promo",
  },
  { value: "Vitrine", label: "Vitrine" },
  { value: "Papel de parede", label: "Papel de parede" },
  { value: "Outros/Ainda não sei exatamente", label: "Outros/Ainda não sei exatamente" },
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

type Erros = Partial<Record<"nome" | "email" | "telefone" | "servico", string>>;

export type OrcamentoVariant = "padrao" | "adesivos";

export function OrcamentoProvider({
  children,
  variant = "padrao",
}: {
  children: ReactNode;
  variant?: OrcamentoVariant;
}) {
  const [aberto, setAberto] = useState(false);
  const [origem, setOrigem] = useState("site");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState<string>("");
  const [tipoAdesivoAberto, setTipoAdesivoAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  const salvarPlanilha = useServerFn(enviarLeadPlanilha);

  const abrirOrcamento = useCallback((o = "site", servicoInicial?: string) => {
    setOrigem(o);
    setErros({});
    setErroEnvio(null);
    setTipoAdesivoAberto(false);
    if (servicoInicial) setServico(servicoInicial);
    pushDataLayer("abriu_forms", { origem: o });
    setAberto(true);
  }, []);

  const fechar = useCallback(() => {
    setAberto(false);
    setTipoAdesivoAberto(false);
  }, []);

  const selecionarServico = (s: string) => setServico(s);

  const validar = (): boolean => {
    const e: Erros = {};
    if (nome.trim().length < 2) e.nome = "Diga seu nome.";
    if (variant === "adesivos" && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      e.email = "Informe um e-mail válido.";
    }
    if (telefone.replace(/\D/g, "").length < 10) e.telefone = "Telefone com DDD, por favor.";
    if (!servico) e.servico = "Escolha um serviço.";
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
      email: email.trim(),
      telefone: telefone.trim(),
      servico,
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
      (payload.email ? `E-mail: ${payload.email}\n` : "") +
      `Telefone: ${payload.telefone}\n` +
      `Serviço: ${servico}\n` +
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
          className={cn(
            "fixed inset-0 z-[100] flex justify-center backdrop-blur-sm",
            variant === "adesivos"
              ? "items-center bg-black/70 p-4"
              : "items-end bg-foreground/60 p-0 sm:items-center sm:p-4",
          )}
          role="dialog"
          aria-modal="true"
          aria-label={variant === "adesivos" ? "Pedir Orçamento!" : "Solicitar orçamento"}
          onClick={fechar}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "max-h-[92vh] w-full overflow-y-auto shadow-card",
              variant === "adesivos"
                ? "max-w-md rounded-2xl bg-card p-6 sm:p-7"
                : "max-w-lg rounded-t-3xl bg-card p-6 sm:rounded-3xl",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl">
                  {variant === "adesivos" ? "Pedir Orçamento!" : "Solicite seu orçamento"}
                </h2>
                {variant === "padrao" && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Preenche rapidinho que a gente volta com prazo e valor no WhatsApp.
                  </p>
                )}
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
                  Nome{variant === "adesivos" && " *"}
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

              {variant === "adesivos" && (
                <div>
                  <label htmlFor="nc-email" className="text-sm font-semibold">
                    E-mail *
                  </label>
                  <input
                    id="nc-email"
                    type="email"
                    value={email}
                    maxLength={254}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@empresa.com"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:border-brand"
                  />
                  {erros.email && <p className="mt-1 text-xs text-destructive">{erros.email}</p>}
                </div>
              )}

              <div>
                <label htmlFor="nc-tel" className="text-sm font-semibold">
                  Telefone{variant === "adesivos" && " *"}
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
                {variant === "adesivos" ? (
                  <>
                    <label htmlFor="nc-servico-select" className="text-sm font-semibold">
                      Tipo de adesivos *
                    </label>
                    <div className="relative mt-1.5">
                      <button
                        id="nc-servico-select"
                        type="button"
                        aria-label="Tipo de adesivos *"
                        aria-haspopup="listbox"
                        aria-expanded={tipoAdesivoAberto}
                        onClick={() => setTipoAdesivoAberto((aberto) => !aberto)}
                        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3 text-left text-sm outline-none focus-visible:border-brand"
                      >
                        {(() => {
                          const selecionado = TIPOS_ADESIVOS.find((tipo) => tipo.value === servico);
                          if (!selecionado) {
                            return <span className="text-muted-foreground">Selecione um tipo</span>;
                          }

                          return (
                            <span>
                              {selecionado.label}
                              {selecionado.detail && (
                                <span className="ml-1 text-xs font-normal text-muted-foreground opacity-70">
                                  ({selecionado.detail})
                                </span>
                              )}
                            </span>
                          );
                        })()}
                        <span aria-hidden="true" className="text-muted-foreground">
                          ⌄
                        </span>
                      </button>

                      {tipoAdesivoAberto && (
                        <div
                          role="listbox"
                          aria-label="Tipos de adesivos"
                          className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-lg border border-border bg-card p-1 shadow-card"
                        >
                          {TIPOS_ADESIVOS.map((tipo) => (
                            <button
                              key={tipo.value}
                              type="button"
                              role="option"
                              aria-selected={servico === tipo.value}
                              onClick={() => selecionarServico(tipo.value)}
                              className="block w-full rounded-md bg-white px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                            >
                              <span>{tipo.label}</span>
                              {tipo.detail && (
                                <span className="ml-1 text-xs text-muted-foreground opacity-70">
                                  ({tipo.detail})
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-semibold">O que você precisa?</span>
                    <div className="mt-2 space-y-2">
                      {SERVICOS.map((s) => {
                        const ativo = servico === s;
                        return (
                          <label
                            key={s}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                              ativo
                                ? "border-lime bg-lime/10 text-foreground"
                                : "border-border bg-background text-muted-foreground hover:border-brand",
                            )}
                          >
                            <input
                              type="radio"
                              name="nc-servico"
                              value={s}
                              checked={ativo}
                              onChange={() => selecionarServico(s)}
                              className="size-4 accent-lime"
                            />
                            <span className="text-sm font-semibold">{s}</span>
                          </label>
                        );
                      })}
                    </div>
                  </>
                )}
                {erros.servico && <p className="mt-1 text-xs text-destructive">{erros.servico}</p>}
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
                  placeholder={
                    variant === "adesivos"
                      ? "Descreva seu projeto ou necessidade..."
                      : "Quantidade, prazo, se já tem a arte pronta..."
                  }
                  className="mt-1.5 w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:border-brand"
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

              <button
                type="submit"
                disabled={enviando}
                className={cn(
                  "w-full disabled:opacity-60",
                  variant === "adesivos"
                    ? "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#20bd5a]"
                    : "btn-lime",
                )}
              >
                <WhatsAppIcon className="size-5" aria-hidden="true" />
                {enviando
                  ? "Enviando..."
                  : variant === "adesivos"
                    ? "Pedir Orçamento!"
                    : "Enviar no WhatsApp"}
              </button>
            </form>
          </div>
        </div>
      )}
    </OrcamentoContext.Provider>
  );
}
