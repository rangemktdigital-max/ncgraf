export const WHATSAPP_NUMBER = "557336347138";

/** Gera link do WhatsApp com texto pré-preenchido por origem do lead. */
export function wa(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const NC = {
  nome: "Nc Copiadora - Comunicação Gráfica",
  endereco: "Rua Visconde de Ouro Preto, nº 53, Centro, Ilhéus/BA — CEP 45.653-180",
  horario: "Seg a sex: 9h às 17h · Sáb: 9h às 12h",
  instagram: "https://instagram.com/nccopiadora",
  cnpj: "96.859.046/0001-30",
  maps: "https://www.google.com/maps/search/?api=1&query=Rua+Visconde+de+Ouro+Preto+53+Centro+Ilheus+BA",
  mapsEmbed:
    "https://www.google.com/maps?q=Rua%20Visconde%20de%20Ouro%20Preto%2053%2C%20Centro%2C%20Ilh%C3%A9us%20-%20BA&output=embed",
};
