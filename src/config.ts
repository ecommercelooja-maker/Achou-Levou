// Tudo que precisa ser trocado pelos dados reais fica aqui.

export const MARCA = "Achou, Levou";

// Endereço oficial do site. Ao conectar o domínio, defina NEXT_PUBLIC_SITE_URL na Vercel
// (ex.: https://www.achoulevou.com.br) e faça um novo deploy — canonical, sitemap e
// prévias de compartilhamento passam a usar o domínio automaticamente.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://achou-levou.vercel.app").replace(/\/$/, "");
// Razão social, CNPJ, endereço e e-mail ficam em src/lib/empresa.ts.

// Links de convite dos grupos de WhatsApp (eletrônicos, eletrodomésticos e enxoval, todos juntos).
// Todos entram pelo primeiro link da lista. Quando o grupo lotar, tire o link dele e o próximo assume.
// Ao criar um grupo novo, adicione o link no fim da lista.
export const LINKS_WHATSAPP: string[] = [
  "https://chat.whatsapp.com/C9sC5BKFqL1BbOjikEjjGB",
  "https://chat.whatsapp.com/H2qtR7CtBEu4WZvpSGlYLP",
  "https://chat.whatsapp.com/KcTgEwKyCI32KwnGRJJjzj",
];

// Grupo da LP. Os botões apontam para /g/<slug>, que redireciona para o WhatsApp (ou Telegram com ?p=telegram).
// Todos os grupos de WhatsApp misturam eletrônicos, eletrodomésticos e enxoval, então a página fala de um grupo só.
// Links antigos de categoria (/g/casa, /g/beleza…) continuam funcionando: caem neste grupo.
// Preencha `whatsapp` só se o grupo ganhar um link próprio; vazio usa LINKS_WHATSAPP.
export const GRUPOS = {
  achadinhos: {
    nome: "Achadinhos",
    desc: "Eletrônicos, eletrodomésticos e enxoval",
    whatsapp: "",
  },
} as const;

export type SlugGrupo = keyof typeof GRUPOS;

export const TELEGRAM = "https://t.me/+_nf4IRpiKBZhZTEx";

// Nichos das ofertas divulgadas (usados nos cards de exemplo e no texto da página).
export const NICHOS = {
  eletronicos: "Eletrônicos",
  eletrodomesticos: "Eletrodomésticos",
  enxoval: "Enxoval",
} as const;

export type Nicho = keyof typeof NICHOS;

// Lojas acompanhadas pela curadoria (só o nome, em texto: sem logotipos).
export const LOJAS = ["Shopee", "Mercado Livre", "Magalu", "Amazon"];

// Preço "de/por" nos cards de exemplo (src/data/ofertas.json). Desligado por decisão de 19/10/2026:
// preço de afiliado muda rápido e um valor desatualizado na página é tratado como enganoso pelo Google Ads.
// Para ligar, preencha precoDe/precoPor com valores reais e troque para true. Cards com "R$ 0,00" nunca mostram preço.
export const MOSTRAR_PRECOS = false;

// Medição (opcional). Preencha na Vercel para ativar (veja .env.example). A tag do Google só carrega com
// ADS_ID (NEXT_PUBLIC_GADS_ID) e começa com consentimento negado (Consent Mode v2) até o aceite no aviso de cookies.
// Os nomes antigos NEXT_PUBLIC_GOOGLE_ADS_* continuam valendo como reserva.
export const ADS_ID = process.env.NEXT_PUBLIC_GADS_ID || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ""; // vazio: sem tag do Google até o Achou, Levou ter a própria conta
export const ADS_ROTULO = process.env.NEXT_PUBLIC_GADS_LABEL || process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL || ""; // conversão "Entrar no grupo"
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""; // ex.: G-XXXXXXX (só é configurado junto com a tag do Ads)
// TODO Meta Pixel: quando for ativado, o ID (NEXT_PUBLIC_META_PIXEL_ID) entra aqui.

// Aviso fixo logo abaixo do topo, em todas as páginas.
export const AVISO_TOPO =
  "O Achou, Levou é uma curadoria independente de promoções. Não somos as lojas nem temos vínculo oficial com as marcas citadas. Podemos receber comissão por compras feitas pelos nossos links, sem custo extra para você.";

// Divulgação de afiliados do rodapé.
export const TEXTO_AFILIADO_RODAPE =
  "Como Associado da Amazon, ganhamos com compras qualificadas. Também participamos de outros programas de afiliados.";

// Aviso de afiliados exibido no hero e na seção "Como nos mantemos".
export const TEXTO_AFILIADO =
  "O Achou, Levou é um serviço independente de curadoria de ofertas. Quando você compra por um link nosso, a loja pode nos pagar uma comissão, sem custo adicional para você.";

// Mensagem usada no botão "Indicar para um amigo".
export const TEXTO_INDICACAO =
  "Achei um grupo de ofertas de eletrônicos, eletrodomésticos e enxoval da Shopee, Mercado Livre, Magalu e Amazon. Não tem mensalidade e dá pra deixar silenciado 👉 ";
