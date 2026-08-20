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

/**
 * Envia o lead para uma planilha do Google via Apps Script Web App.
 * Se a URL não estiver configurada, retorna { enviado: false } sem quebrar
 * o fluxo — o WhatsApp continua funcionando normalmente.
 */
export const enviarLeadPlanilha = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env["GOOGLE_SHEETS_WEBHOOK_URL"];
    if (!url) return { enviado: false, motivo: "webhook_nao_configurado" as const };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          servicos: data.servicos.join(", "),
          enviadoEm: new Date().toISOString(),
        }),
      });
      if (!res.ok) return { enviado: false, motivo: "erro_webhook" as const };
      return { enviado: true, motivo: null };
    } catch {
      return { enviado: false, motivo: "falha_rede" as const };
    }
  });
