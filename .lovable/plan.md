# Corrigir o envio de leads para a planilha

Escopo: apenas a integração com o Google Sheets. Nada de UI, textos, CTAs, WhatsApp, banco de dados ou publicação.

## O que está errado hoje

O envio falha em silêncio: a função de servidor devolve `{ enviado: false }` em qualquer erro, o cliente ignora o retorno, fecha o modal e abre o WhatsApp. Assim não dá para saber se o problema foi segredo ausente, resposta de erro do Apps Script ou falha de rede.

## O que vou fazer

1. **Servidor (`src/lib/orcamento.functions.ts`)**
   - Ler `GOOGLE_SHEETS_WEBHOOK_URL` apenas dentro do handler (nunca no cliente). Sem o segredo, lançar erro de configuração claro (`webhook_nao_configurado`).
   - POST em JSON com `{ nome, telefone, servicos, mensagem, origem }` (mais data/hora) para a URL `/exec`, com `redirect: "follow"` (o Apps Script redireciona internamente antes de responder).
   - Tratar como erro: resposta não-2xx **e** corpo JSON com `{ ok: false }`. Em ambos os casos, lançar erro com status + trecho da resposta, e registrar no log do servidor.
   - Retornar `{ ok: true }` só quando o Apps Script confirmar.

2. **Cliente (`src/components/nc/OrcamentoProvider.tsx`)**
   - Aguardar o sucesso do envio antes de fechar o modal e abrir o WhatsApp.
   - Em caso de falha: manter o modal aberto, manter os dados preenchidos e mostrar uma mensagem de erro visível acima do botão, com o motivo resumido. Botão volta ao estado normal para nova tentativa.

3. **Diagnóstico durante a correção**
   - Chamar a URL do Apps Script direto do servidor com um lead de teste ("TESTE NC") e ler a resposta exata do Google. Isso mostra na hora se o problema é permissão da implantação, versão publicada antiga ou erro dentro do `doPost`. Se for do lado do Apps Script, te aviso exatamente o que ajustar na implantação.
   - Reproduzir o envio real no navegador automatizado e conferir o log do servidor.

4. **Validação**
   - Rodar typecheck e informar arquivos e funções alterados.

## Observações

- A URL do webhook continua exclusivamente no servidor; nada dela chega ao navegador.
- O teste do passo 3 pode gravar uma linha "TESTE NC" na planilha — é só apagar.
- Mudança de comportamento intencional: se a planilha falhar, o WhatsApp **não** abre mais automaticamente, conforme pedido. O modal fica aberto com o erro.
