import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Validação compartilhada do lead. Mantida aqui para que o servidor nunca
 * confie no que o browser enviou (o cliente valida antes, mas isso é UX).
 */
const leadSchema = z.object({
  nome: z.string().trim().min(2).max(100),
  telefone: z.string().trim().min(8).max(30),
  servicos: z.array(z.string().trim().max(60)).min(1).max(20),
  mensagem: z.string().trim().max(1000).default(""),
  origem: z.string().trim().max(60).default("site"),
});

export type LeadInput = z.input<typeof leadSchema>;

export type EnvioLeadResultado = {
  ok: boolean;
  /** Motivo técnico curto, usado para escolher a mensagem exibida ao usuário. */
  motivo: MotivoFalha | null;
  /** Texto pronto para exibir no formulário quando `ok` é falso. */
  mensagem: string | null;
};

type MotivoFalha =
  | "webhook_nao_configurado"
  | "erro_http"
  | "resposta_invalida"
  | "recusado_pelo_script"
  | "falha_rede";

const MENSAGENS: Record<MotivoFalha, string> = {
  webhook_nao_configurado:
    "O registro de orçamentos ainda não está configurado. Fale com a gente pelo WhatsApp.",
  erro_http: "Não conseguimos registrar seu pedido agora. Tente novamente em instantes.",
  resposta_invalida:
    "Não conseguimos registrar seu pedido agora. Tente novamente em instantes.",
  recusado_pelo_script:
    "Não conseguimos registrar seu pedido agora. Tente novamente em instantes.",
  falha_rede: "Sem conexão com nosso registro. Verifique a internet e tente de novo.",
};

const TIMEOUT_MS = 12_000;
const TRECHO_LOG = 500;

function falha(motivo: MotivoFalha, detalhe?: string): EnvioLeadResultado {
  if (detalhe) console.error(`[lead->planilha] ${motivo}: ${detalhe.slice(0, TRECHO_LOG)}`);
  else console.error(`[lead->planilha] ${motivo}`);
  return { ok: false, motivo, mensagem: MENSAGENS[motivo] };
}

/**
 * Envia o lead para uma planilha do Google via Apps Script Web App.
 * A URL do webhook vive apenas no servidor (secret) e nunca é devolvida ao
 * cliente — o retorno carrega só o resultado e uma mensagem já traduzida.
 */
export const enviarLeadPlanilha = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }): Promise<EnvioLeadResultado> => {
    const url = process.env["GOOGLE_SHEETS_WEBHOOK_URL"];
    if (!url) return falha("webhook_nao_configurado", "secret ausente no servidor");

    const corpo = JSON.stringify({
      nome: data.nome,
      telefone: data.telefone,
      servicos: data.servicos.join(", "),
      mensagem: data.mensagem,
      origem: data.origem,
      enviadoEm: new Date().toISOString(),
    });

    let res: Response;
    let texto: string;
    try {
      res = await fetch(url, {
        method: "POST",
        // O Apps Script aceita JSON cru em e.postData.contents.
        headers: { "content-type": "application/json" },
        body: corpo,
        // O Web App redireciona para script.googleusercontent.com antes de responder.
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      texto = await res.text();
    } catch (err) {
      return falha("falha_rede", err instanceof Error ? err.message : String(err));
    }

    if (!res.ok) return falha("erro_http", `status ${res.status}: ${texto}`);

    // O Apps Script devolve HTTP 200 com uma página HTML de erro quando a
    // implantação não tem doPost ou o script quebra. Só JSON conta como sucesso.
    let payload: unknown;
    try {
      payload = JSON.parse(texto);
    } catch {
      return falha("resposta_invalida", `resposta não-JSON: ${texto}`);
    }

    if (typeof payload === "object" && payload !== null && "ok" in payload) {
      if ((payload as { ok?: unknown }).ok === false) {
        return falha("recusado_pelo_script", texto);
      }
    }

    return { ok: true, motivo: null, mensagem: null };
  });
