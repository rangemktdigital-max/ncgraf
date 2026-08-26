# Descobrir por que os leads não chegam na planilha

## O que já verifiquei agora

- O segredo `GOOGLE_SHEETS_WEBHOOK_URL` está salvo no projeto e disponível para o servidor.
- A URL tem o formato certo: `https://script.google.com/macros/s/.../exec` (implantação final, não a de teste `/dev`).
- Ao acessar essa URL, o Google responde normalmente (não é tela de login), ou seja, a implantação parece pública.

Ainda não está confirmado onde o envio se perde. Hoje o site engole qualquer falha em silêncio: se a planilha não responde, o WhatsApp abre do mesmo jeito e ninguém fica sabendo do erro. Por isso não dá para saber, só olhando a tela, se o problema é no site ou no Apps Script.

## Plano

1. **Teste direto no webhook** — mandar um envio de teste (nome "TESTE NC") para a URL do Apps Script e ler a resposta exata do Google: sucesso, erro de permissão, erro no código do script ou função inexistente. Isso separa "problema no site" de "problema no Apps Script" em um passo.
2. **Teste do fluxo real** — preencher e enviar o formulário do site em um navegador automatizado e capturar o que a função de servidor devolve/registra.
3. **Corrigir conforme o resultado**, entre os casos prováveis:
   - Implantação com acesso restrito ou versão antiga publicada → orientar a nova implantação com os ajustes exatos.
   - Formato do corpo que o `doPost` não entende → passar a enviar também como `text/plain` ou `form-urlencoded`, que é o que o Apps Script aceita sem tropeço.
   - Redirecionamento interno do Google não seguido corretamente pelo servidor → tratar o redirecionamento na chamada.
4. **Parar de falhar em silêncio** — registrar o motivo real da falha no log do servidor e mostrar um aviso discreto no formulário quando o registro não acontecer (o WhatsApp continua abrindo normalmente, o lead nunca se perde).

## Detalhes técnicos

- `src/lib/orcamento.functions.ts`: retornar e logar `status` + trecho da resposta do Apps Script em caso de erro; ajustar `content-type`/`redirect: "follow"` se o teste indicar.
- `src/components/nc/OrcamentoProvider.tsx`: usar o retorno para exibir um aviso curto quando `enviado === false`, sem bloquear o envio ao WhatsApp.
- Nenhuma mudança de layout ou de texto da página.

## Observação

O teste do passo 1 grava uma linha de teste na sua planilha, se tudo estiver certo. É só apagá-la depois.
