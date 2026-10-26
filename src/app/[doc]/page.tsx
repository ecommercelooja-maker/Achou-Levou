import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MARCA, SITE_URL } from "@/config";
import { PaginaInterna } from "@/components/Site";
import { CNPJ, EMAIL_CONTATO, ENDERECO, LINHA_EMPRESA, RAZAO_SOCIAL } from "@/lib/empresa";

type Doc = { titulo: string; descricao: string; secoes: [string, string][]; atualizado?: string };

// Dados de medição: hoje só o Google (Ads e Analytics), carregado após o aceite no aviso de cookies.
// TODO Meta Pixel: quando for ativado, citar a Meta em "privacidade" e "cookies".
const DOCS: Record<string, Doc> = {
  sobre: {
    titulo: "Sobre nós",
    descricao: `Quem somos, como funciona e como o ${MARCA} se mantém: curadoria independente de promoções, sem venda direta.`,
    secoes: [
      ["Quem somos", `O ${MARCA} é uma curadoria independente de promoções de eletrônicos, eletrodomésticos e enxoval, operada por ${RAZAO_SOCIAL}, CNPJ ${CNPJ}.`],
      ["Como funciona", "Buscamos ofertas em lojas online, conferimos o preço e a reputação do vendedor e divulgamos nos nossos grupos de WhatsApp e no canal do Telegram. Não vendemos produtos: a compra é feita direto no site da loja, que cuida do pagamento, da entrega, da troca e da garantia."],
      ["Como ganhamos dinheiro", "Recebemos comissão de programas de afiliados quando alguém compra pelos nossos links. Você não paga nada a mais por isso: o preço é o mesmo de quem entra direto no site da loja. Como Associado da Amazon, ganhamos com compras qualificadas."],
      ["Nosso compromisso", "Sem spam: só o administrador envia mensagens e ninguém te chama no privado. Ofertas verificadas: conferimos o histórico de preço antes de divulgar. Liberdade: você sai do grupo ou do canal a qualquer momento, em dois toques, sem precisar avisar ninguém."],
      ["Contato", `Fale com a gente pelo e-mail ${EMAIL_CONTATO}. ${RAZAO_SOCIAL}, CNPJ ${CNPJ}, ${ENDERECO}.`],
    ],
  },
  contato: {
    titulo: "Contato",
    descricao: `Fale com o ${MARCA}: e-mail e dados da empresa responsável pelo site.`,
    secoes: [
      ["E-mail", `Dúvidas, sugestões, pedidos sobre seus dados (LGPD) ou para sair de uma lista: ${EMAIL_CONTATO}.`],
      ["Empresa responsável", `${RAZAO_SOCIAL}, CNPJ ${CNPJ}, ${ENDERECO}.`],
      ["Pedidos e entregas", `O ${MARCA} não vende produtos. Questões sobre pagamento, entrega, troca ou garantia de uma compra são resolvidas direto com a loja onde o pedido foi feito.`],
    ],
  },
  privacidade: {
    titulo: "Política de Privacidade",
    descricao: `Como o ${MARCA} trata dados pessoais: medição com consentimento, links de afiliado, grupos de WhatsApp e Telegram e seus direitos pela LGPD.`,
    atualizado: "19/10/2026",
    secoes: [
      ["Quem somos", `O ${MARCA} é operado por ${RAZAO_SOCIAL}, CNPJ ${CNPJ}, responsável (controlador) pelo tratamento dos dados descritos nesta política.`],
      ["Quais dados coletamos", `O ${MARCA} não pede cadastro, e-mail, CPF nem dados de pagamento. Coletamos apenas dados de navegação (como páginas visitadas, cliques nos botões, tipo de aparelho e origem da visita) e, se você entrar em um grupo, o número de telefone que o próprio WhatsApp ou Telegram mostra aos administradores.`],
      ["Cookies e pixels de anúncio", "Com o seu consentimento, usamos a tag do Google (Google Ads e Google Analytics) para medir visitas e saber quais anúncios trazem pessoas ao site, inclusive o clique para entrar no grupo. Essas ferramentas usam cookies e identificadores do navegador. Antes do aceite, ficam desativadas (Modo de Consentimento do Google com tudo negado). Você pode recusar no aviso de cookies sem perder nenhuma função do site. Detalhes na Política de cookies."],
      ["Links de afiliado", "As ofertas divulgadas nos grupos usam links de afiliado. Ao clicar, a loja pode registrar que você veio por nós para calcular a nossa comissão. Esse registro é feito pela loja, conforme a política de privacidade dela, e não muda o preço que você paga."],
      ["Não vendemos produtos", "Não fazemos venda direta, não recebemos pagamentos e não temos acesso aos dados das suas compras. O pedido, o pagamento e a entrega acontecem no site da loja, que tem a própria política de privacidade."],
      ["Preços e estoque", "Preços, cupons e estoque são definidos pelas lojas e podem mudar a qualquer momento. Não nos responsabilizamos por alterações feitas pelas lojas depois da divulgação."],
      ["Compartilhamento", "Não vendemos nem alugamos dados pessoais. Dados de navegação são tratados pelo Google apenas com o seu consentimento, como descrito acima."],
      ["Seus direitos (LGPD)", `Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir confirmação do tratamento, acesso, correção, anonimização ou exclusão dos seus dados e revogar o consentimento a qualquer momento. Basta escrever para ${EMAIL_CONTATO}.`],
      ["Contato", `Dúvidas sobre esta política: ${EMAIL_CONTATO}.`],
    ],
  },
  cookies: {
    titulo: "Política de cookies",
    descricao: `Quais cookies o ${MARCA} usa, como funciona o consentimento e como desativar no navegador.`,
    secoes: [
      ["O que são cookies", "São pequenos arquivos salvos no navegador que ajudam a lembrar preferências e medir o uso do site."],
      ["Como usamos", "Com o seu aceite, usamos cookies de medição (Google Analytics) e de anúncios (Google Ads) para saber de onde vêm as visitas e quais anúncios funcionam. Não usamos cookies para identificar você pessoalmente."],
      ["Seu consentimento", "Antes do aceite, os cookies de medição e de anúncios ficam desativados: usamos o Modo de Consentimento do Google com armazenamento de anúncios e de análise negados. Você pode recusar no aviso de cookies sem perder nenhuma função do site."],
      ["Como desativar", "Você pode bloquear ou apagar cookies nas configurações do seu navegador. O site continua funcionando normalmente."],
    ],
  },
  termos: {
    titulo: "Termos de Uso",
    descricao: `Regras de uso do ${MARCA}: o que o serviço oferece, preços definidos pelas lojas, links de afiliado, marcas e regras dos grupos.`,
    atualizado: "19/10/2026",
    secoes: [
      ["O serviço", `O ${MARCA} (${RAZAO_SOCIAL}, CNPJ ${CNPJ}) é uma curadoria independente de promoções, sem custo para o usuário, que divulga ofertas de lojas online em grupos de WhatsApp e em um canal do Telegram.`],
      ["Não somos loja", "Não fazemos venda direta, não recebemos pagamentos e não entregamos produtos. A compra, o pagamento, a entrega, a troca e a garantia são de responsabilidade da loja onde o pedido foi feito."],
      ["Preços e disponibilidade", "Preços, cupons e estoque são definidos pelas lojas e podem mudar a qualquer momento, inclusive logo depois da divulgação. O valor final é sempre o da loja no momento da compra. Os produtos mostrados no site são exemplos ilustrativos de ofertas já divulgadas e não garantem preço ou disponibilidade atuais."],
      ["Links de afiliado", "Os links das ofertas são de afiliado: quando você compra por eles, a loja pode nos pagar uma comissão, sem custo extra para você. Como Associado da Amazon, ganhamos com compras qualificadas. Também participamos de outros programas de afiliados."],
      ["Marcas", "Mercado Livre, Shopee, Magalu, Amazon e demais marcas citadas pertencem a seus respectivos titulares. Não temos vínculo oficial com essas empresas nem as representamos; participamos apenas dos programas de afiliados abertos ao público."],
      ["Regras do grupo", "Os grupos são só para receber ofertas. Podemos remover participantes que usem o grupo para spam ou condutas abusivas. Você pode sair a qualquer momento."],
      ["Privacidade", "O tratamento de dados pessoais segue a nossa Política de Privacidade, de acordo com a LGPD."],
      ["Contato", `Dúvidas sobre estes termos: ${EMAIL_CONTATO}.`],
    ],
  },
  afiliados: {
    titulo: "Aviso de afiliados",
    descricao: `Como o ${MARCA} se mantém: programas de afiliados das lojas, sem custo adicional para você.`,
    secoes: [
      ["Como nos mantemos", `O ${MARCA} participa de programas de afiliados de lojas como Mercado Livre, Shopee, Magalu e Amazon. Quando você compra por um link nosso, a loja pode nos pagar uma comissão. Como Associado da Amazon, ganhamos com compras qualificadas.`],
      ["Sem custo para você", "A comissão não altera o preço. Você paga exatamente o mesmo valor que pagaria entrando direto no site da loja."],
      ["Independência", "Somos uma curadoria independente, sem vínculo oficial com as lojas. Procuramos divulgar apenas ofertas com desconto conferido no histórico de preço; a comissão não é critério para enviar uma oferta. Também participamos de outros programas de afiliados."],
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(DOCS).map((doc) => ({ doc }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { doc: string } }): Metadata {
  const d = DOCS[params.doc];
  if (!d) return {};
  const titulo = `${d.titulo} — ${MARCA}`;
  // Canonical da própria página (o layout raiz aponta para a home).
  const url = `${SITE_URL}/${params.doc}`;
  return {
    title: titulo,
    description: d.descricao,
    alternates: { canonical: url },
  };
}

export default function PaginaLegal({ params }: { params: { doc: string } }) {
  const d = DOCS[params.doc];
  if (!d) notFound();
  return (
    <PaginaInterna>
      <main className="legal">
        <div className="wrap">
          <a className="legal-voltar" href="/">
            ← Voltar para a página inicial
          </a>
          <h1>{d.titulo}</h1>
          {d.secoes.map(([t, p]) => (
            <section key={t}>
              <h2>{t}</h2>
              <p>{p}</p>
            </section>
          ))}
          <p style={{ marginTop: 36, fontSize: 14 }}>{LINHA_EMPRESA}</p>
          {d.atualizado && <p style={{ fontSize: 14 }}>Última atualização: {d.atualizado}</p>}
        </div>
      </main>
    </PaginaInterna>
  );
}
