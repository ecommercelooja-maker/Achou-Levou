/* eslint-disable @next/next/no-img-element */
import { Foto } from "@/components/Foto";
import { IconeTelegram, IconeZap } from "@/components/Logo";
import { Movimento, VideoLoop, VoltarTopo } from "@/components/Movimento";
import { CtaFixa, Revelar } from "@/components/Vivos";
import { Indicar, Medicao, Navegacao } from "@/components/Conversao";
import { GridExemplos } from "@/components/Exemplos";
import { Anim } from "@/components/Pecas";
import { Botoes, Cabecalho, LINK_PRINCIPAL, LINK_TELEGRAM, Rodape } from "@/components/Site";
import { LOJAS, NICHOS, TEXTO_AFILIADO } from "@/config";

/* Texto que "acende" palavra por palavra conforme a rolagem. Palavras entre *asteriscos* ganham destaque. */
function TextoRolagem({ texto }: { texto: string }) {
  const palavras = texto.split(" ");
  return (
    <p className="texto-rolagem" style={{ ["--n" as string]: palavras.length }}>
      {palavras.map((w, i) => {
        const destaque = w.startsWith("*");
        return (
          <span key={i} className={destaque ? "tr-destaque" : undefined} style={{ ["--i" as string]: i }}>
            {w.replace(/\*/g, "")}{" "}
          </span>
        );
      })}
    </p>
  );
}

// [foto, legenda, emoji, texto alternativo]
const GALERIA_1: [string, string, string, string][] = [
  ["comemora", "Olhando o celular", "olhos", "Mulher comemorando com o celular na mão"],
  ["amigas-shopping", "Compras com as amigas", "presente", "Amigas fazendo compras no shopping"],
  ["recebeu", "Encomenda chegando", "caixa", "Mulher sorrindo com uma caixa de presente nas mãos"],
  ["sacolas", "Voltando das compras", "carrinho", "Pessoa segurando várias sacolas de compras"],
  ["rindo", "Conferindo uma oferta", "check", "Jovem rindo enquanto olha o celular"],
  ["compra-cartao", "Pagando no site da loja", "cifrao", "Mulher pagando uma compra com cartão pelo celular"],
];
const GALERIA_2: [string, string, string, string][] = [
  ["acenando", "Dia de compras", "carrinho", "Mulher acenando em uma chamada de vídeo no celular"],
  ["shopping-caminhando", "Passeio no shopping", "olhos", "Amigas caminhando no shopping com sacolas"],
  ["caixinha", "Presente embalado", "presente", "Mulher abrindo uma caixa de maquiagem"],
  ["casal-celular", "Escolhendo juntos", "check", "Casal olhando o celular no sofá"],
  ["sacolas-rua", "Compras do mês", "caixa", "Pessoas andando na rua com sacolas de compras"],
  ["cartao-sofa", "Comprando pelo celular", "cifrao", "Mulher no sofá com cartão e celular na mão"],
];

function LinhaGaleria({ itens, reverso = false }: { itens: [string, string, string, string][]; reverso?: boolean }) {
  const dobro = [...itens, ...itens];
  return (
    <div className={`galeria-linha${reverso ? " reverso" : ""}`}>
      {dobro.map(([foto, chip, emoji, alt], i) => (
        // A segunda metade repete a primeira só para o efeito de rolagem contínua: fica oculta para leitores de tela.
        <figure key={i} className="galeria-item" aria-hidden={i >= itens.length || undefined}>
          <Foto nome={foto} alt={alt} sizes="(min-width: 900px) 360px, 70vw" />
          <figcaption>
            <Anim n={emoji} t={26} /> {chip}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Movimento />
      <Revelar />
      <Cabecalho home />

      {/* HERO com vídeo de fundo */}
      <header className="hero" data-progresso>
        <div className="hero-fundo" aria-hidden="true">
          <VideoLoop nome="hero" className="hero-video" />
        </div>
        <div className="hero-luz" aria-hidden="true" />
        <div className="wrap hero-grade">
          <div className="hero-texto">
            <span className="hero-pilula">
              <Anim n="carrinho" t={22} />
              <span>
                <b>Grupo de ofertas</b> no WhatsApp e no Telegram
              </span>
            </span>
            <h1>
              Achou a oferta? <span className="destaque-off">Levou com desconto</span>
            </h1>
            <p className="hero-sub">
              A gente garimpa <b>eletrônicos, eletrodomésticos e enxoval</b> nas lojas online e manda só o que vale a pena
              no grupo. Deixe no silencioso e abra quando for comprar alguma coisa.
            </p>
            <Botoes texto="Quero ver as ofertas" />
            <ul className="hero-garantias">
              <li>
                <Anim n="check" t={20} /> Sem custo adicional
              </li>
              <li>
                <Anim n="check" t={20} /> Sem cadastro
              </li>
              <li>
                <Anim n="check" t={20} /> Só o admin envia
              </li>
            </ul>
          </div>

          <div className="hero-visual">
            <Foto
              nome="casal-celular"
              alt="Casal olhando ofertas no celular"
              sizes="(min-width: 960px) 40vw, 90vw"
              className="hero-foto"
              prioridade
            />
          </div>
        </div>
        <a className="hero-rolar" href="#numeros" aria-label="Rolar para baixo">
          <span />
        </a>
      </header>

      {/* Lojas: só o nome, em texto discreto (sem logotipos) */}
      <section className="lojas-faixa" aria-label="Lojas onde encontramos ofertas">
        <div className="wrap">
          <p className="lojas-titulo">Lojas onde encontramos ofertas</p>
          <p className="lojas-fileira">{LOJAS.join(" · ")}</p>
        </div>
      </section>

      <main>
        {/* Números */}
        <section className="numeros" id="numeros">
          <div className="wrap numeros-grade">
            <div className="numero rv">
              <Anim n="olhos" t={46} />
              <b>{Object.keys(NICHOS).length}</b>
              <span>nichos: {Object.values(NICHOS).join(", ").toLowerCase()}</span>
            </div>
            <div className="numero rv">
              <Anim n="carrinho" t={46} />
              <b>{LOJAS.length}</b>
              <span>lojas acompanhadas</span>
            </div>
            <div className="numero rv">
              <Anim n="presente" t={46} />
              <b>1 min</b>
              <span>para entrar</span>
            </div>
            <div className="numero rv">
              <Anim n="check" t={46} />
              <b>Sem</b>
              <span>cadastro nem CPF</span>
            </div>
          </div>
        </section>

        {/* Exemplos estáticos + CTA único */}
        <section className="secao faixa" id="exemplos">
          <div className="wrap">
            <p className="sobretitulo rv">Exemplos</p>
            <h2 className="secao-titulo rv">Achados que já passaram pelo grupo</h2>
            <p className="secao-sub rv">
              Alguns produtos que já divulgamos no grupo. As ofertas do dia, com preço e link da loja, são enviadas
              dentro do grupo.
            </p>
            <GridExemplos />
            <div className="exemplos-cta">
              <a className="btn-principal" href={LINK_PRINCIPAL}>
                <IconeZap /> Participe do nosso canal de promoções
              </a>
              <a className="btn-tele claro" href={LINK_TELEGRAM}>
                <IconeTelegram /> Prefiro Telegram
              </a>
            </div>
          </div>
        </section>

        {/* Cinema: vídeo que cresce até tela cheia enquanto rola */}
        <section className="cinema" data-sticky>
          <div className="cinema-palco">
            <div className="cinema-janela">
              <VideoLoop nome="cinema" className="cinema-video" />
              <div className="cinema-veu" />
              <div className="cinema-texto">
                <span className="cinema-linha l1">Vai comprar alguma coisa?</span>
                <span className="cinema-linha l2">Confere no grupo</span>
                <span className="cinema-linha l3">
                  <em>primeiro.</em>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Manifesto palavra por palavra */}
        <section className="secao manifesto" data-progresso>
          <div className="wrap">
            <p className="sobretitulo rv">Como a gente pensa</p>
            <TextoRolagem texto="Preço sobe e desce o tempo todo. Quem fica de *olho* nas *promoções* acha o *momento certo* e paga *menos* pelo mesmo produto." />
          </div>
        </section>

        {/* Como funciona: o caminho de cada oferta */}
        <section className="secao" id="como-funciona">
          <div className="wrap">
            <p className="sobretitulo rv">Como funciona</p>
            <h2 className="secao-titulo rv">Como a oferta chega até você</h2>
            <p className="secao-sub rv">Um trabalho de curadoria simples, feito todo dia.</p>
            <div className="tipo-grid fluxo">
              <article className="tipo rv">
                <span className="tipo-tag hora">1 · A gente procura</span>
                <Anim n="olhos" t={52} />
                <h3>Olhamos as lojas</h3>
                <p>Acompanhamos Shopee, Mercado Livre, Magalu e Amazon ao longo do dia.</p>
              </article>
              <article className="tipo rv" style={{ transitionDelay: "90ms" }}>
                <span className="tipo-tag cupom">2 · Confere</span>
                <Anim n="check" t={52} />
                <h3>Histórico de preço e cupom</h3>
                <p>Vemos se o preço caiu de verdade e se o cupom funciona no carrinho.</p>
              </article>
              <article className="tipo rv" style={{ transitionDelay: "180ms" }}>
                <span className="tipo-tag zap">3 · Manda no grupo</span>
                <Anim n="carrinho" t={52} />
                <h3>Com o link da loja</h3>
                <p>A oferta chega no grupo com foto e link. Você compra direto no site da loja, se quiser.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Galeria que desliza com a rolagem */}
        <section className="galeria" data-progresso aria-label="Galeria de momentos de compra">
          <div className="wrap">
            <p className="sobretitulo claro rv">Compras do dia a dia</p>
            <h2 className="secao-titulo claro rv">Pra hora em que bate a vontade de comprar</h2>
          </div>
          <LinhaGaleria itens={GALERIA_1} />
          <LinhaGaleria itens={GALERIA_2} reverso />
        </section>

        {/* Vídeo + benefícios */}
        <section className="secao faixa">
          <div className="wrap split">
            <div className="split-foto split-video rv">
              <VideoLoop nome="celular" className="split-midia" rotulo="Pessoa conferindo uma oferta no celular" />
            </div>
            <div className="split-texto rv">
              <p className="sobretitulo esquerda">Como é o grupo</p>
              <h2 className="secao-titulo esquerda">Grupo sem bagunça, só achados</h2>
              <ul className="lista-check">
                <li>
                  <Anim n="check" t={24} /> <span><b>Chega sozinho:</b> você não precisa procurar nada.</span>
                </li>
                <li>
                  <Anim n="check" t={24} /> <span><b>Direto ao ponto:</b> foto, preço antigo, preço novo e cupom.</span>
                </li>
                <li>
                  <Anim n="check" t={24} /> <span><b>Compra segura:</b> direto no site da loja, com a garantia dela.</span>
                </li>
                <li>
                  <Anim n="check" t={24} /> <span><b>Sem bagunça:</b> grupo fechado, ninguém te chama no privado.</span>
                </li>
              </ul>
              <Botoes claro />
            </div>
          </div>
        </section>

        {/* Tipos */}
        <section className="secao">
          <div className="wrap">
            <p className="sobretitulo rv">O que chega no seu zap</p>
            <h2 className="secao-titulo rv">O que a gente caça pra você</h2>
            <div className="tipo-grid">
              <article className="tipo rv" data-tilt>
                <span className="brilho-mouse" aria-hidden="true" />
                <Anim n="raio" t={52} />
                <span className="tipo-tag relampago">Promoções</span>
                <h3>Liquidações das lojas</h3>
                <p>Liquidação, queima de estoque e promoções da própria loja. Avisamos assim que encontramos.</p>
              </article>
              <article className="tipo rv" data-tilt style={{ transitionDelay: "90ms" }}>
                <span className="brilho-mouse" aria-hidden="true" />
                <Anim n="alarme" t={52} />
                <span className="tipo-tag hora">Todo dia</span>
                <h3>Garimpo diário</h3>
                <p>Ao longo do dia aparecem coisas novas. Você não precisa procurar: quando precisar, é só abrir o grupo.</p>
              </article>
              <article className="tipo rv" data-tilt style={{ transitionDelay: "180ms" }}>
                <span className="brilho-mouse" aria-hidden="true" />
                <Anim n="presente" t={52} />
                <span className="tipo-tag cupom">Cupons</span>
                <h3>Cupons que funcionam</h3>
                <p>Cupons que não aparecem na página do produto e só descontam no carrinho. Mandamos o código junto.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Como nos mantemos */}
        <section className="secao faixa porque" id="porque">
          <div className="wrap split split-inverso">
            <div className="split-texto rv">
              <p className="sobretitulo esquerda">A pergunta de todo mundo</p>
              <h2 className="secao-titulo esquerda">&ldquo;E como vocês ganham com isso?&rdquo;</h2>
              <p className="porque-aviso">{TEXTO_AFILIADO}</p>
              <div className="porque-lista">
                <article>
                  <span className="porque-n">1</span>
                  <div>
                    <h3>A loja é quem paga</h3>
                    <p>
                      Quando você compra pelo nosso link, a loja nos repassa uma comissão. Seu preço é exatamente o
                      mesmo. Você não paga nada a mais.
                    </p>
                  </div>
                </article>
                <article>
                  <span className="porque-n">2</span>
                  <div>
                    <h3>Só vale se a oferta for boa</h3>
                    <p>Oferta ruim ninguém compra. Nosso interesse é o mesmo que o seu: desconto que valha a pena.</p>
                  </div>
                </article>
                <article>
                  <span className="porque-n">3</span>
                  <div>
                    <h3>Não vendemos nada</h3>
                    <p>Sem estoque, sem pagamento, sem cadastro. Quem vende, cobra e entrega é a loja.</p>
                  </div>
                </article>
                <article>
                  <span className="porque-n">4</span>
                  <div>
                    <h3>Sem plano pago</h3>
                    <p>Não tem plano, assinatura nem &ldquo;acesso VIP&rdquo;. Entra e sai quando quiser.</p>
                  </div>
                </article>
              </div>
            </div>
            <div className="split-foto rv">
              <div className="split-moldura">
                <div className="split-parallax" data-parallax="0.08">
                  <Foto nome="duvida-gratis" alt="Mulher sorrindo segurando o celular" className="split-midia" />
                </div>
              </div>
              <div className="split-selo baixo" data-parallax="0.12">
                <Anim n="cem" t={40} />
                <span>
                  <b>Comissão da loja</b>
                  <small>o seu preço não muda</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona com linha que se desenha */}
        <section className="secao como" data-progresso>
          <div className="wrap">
            <p className="sobretitulo rv">Para entrar</p>
            <h2 className="secao-titulo rv">Entrar leva menos de 1 minuto</h2>
            <div className="passos">
              <div className="passos-linha" aria-hidden="true">
                <span />
              </div>
              <div className="passo rv">
                <span className="passo-n">1</span>
                <Anim n="olhos" t={56} />
                <h3>Toque e entre</h3>
                <p>Toque em &ldquo;Entrar no grupo&rdquo;. Abre direto no WhatsApp ou no Telegram, sem cadastro.</p>
              </div>
              <div className="passo rv" style={{ transitionDelay: "120ms" }}>
                <span className="passo-n">2</span>
                <Anim n="carrinho" t={56} />
                <h3>Receba as ofertas</h3>
                <p>Foto, preço antigo, preço novo e o cupom quando tiver. Direto ao ponto.</p>
              </div>
              <div className="passo rv" style={{ transitionDelay: "240ms" }}>
                <span className="passo-n">3</span>
                <Anim n="caixa" t={56} />
                <h3>Compre e receba</h3>
                <p>Você compra direto no site da loja e recebe em casa, com a garantia dela.</p>
              </div>
            </div>

            <div className="entrega rv">
              <div className="entrega-midia">
                <VideoLoop nome="unboxing" rotulo="Casal abrindo uma encomenda" />
              </div>
              <div className="entrega-txt">
                <Anim n="caixa" t={56} />
                <h3>A compra, a entrega e a garantia são da loja. A gente só avisa da oferta.</h3>
                <a className="btn-zap" href={LINK_PRINCIPAL}>
                  <IconeZap /> Ver ofertas no WhatsApp
                  <span className="btn-brilho" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="regras rv">
              <h2>
                <Anim n="check" t={26} /> Nosso compromisso com você
              </h2>
              <ul>
                <li>
                  <span className="tique">✓</span>
                  <span>
                    <b>Ninguém te chama no privado.</b> Só o administrador envia e o grupo é fechado para conversa.
                  </span>
                </li>
                <li>
                  <span className="tique">✓</span>
                  <span>
                    <b>Sem e-mail, sem CPF, sem cadastro.</b>
                  </span>
                </li>
                <li>
                  <span className="tique">✓</span>
                  <span>
                    <b>Desconto falso não entra.</b> Se o preço não caiu de verdade, a oferta não é enviada.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Curadoria com foto de fundo em parallax */}
        <section className="secao curadoria" id="curadoria">
          <div className="curadoria-fundo" data-parallax="0.18" aria-hidden="true">
            <Foto nome="shopping-caminhando" alt="Amigas caminhando no shopping com sacolas" sizes="100vw" />
          </div>
          <div className="wrap">
            <p className="sobretitulo claro rv">Nosso filtro</p>
            <h2 className="secao-titulo claro rv">Antes de mandar, a gente confere 3 coisas</h2>
            <div className="passos-num">
              <article className="rv">
                <span className="num-passo">01</span>
                <div>
                  <h3>O preço caiu mesmo?</h3>
                  <p>
                    Comparamos com o histórico. Se subiu antes só para &ldquo;baixar&rdquo; agora, não é promoção e fica
                    de fora.
                  </p>
                </div>
              </article>
              <article className="rv" style={{ transitionDelay: "100ms" }}>
                <span className="num-passo">02</span>
                <div>
                  <h3>O cupom funciona?</h3>
                  <p>Testamos no carrinho para ver se o desconto aparece de verdade. Cupom vencido não chega em você.</p>
                </div>
              </article>
              <article className="rv" style={{ transitionDelay: "200ms" }}>
                <span className="num-passo">03</span>
                <div>
                  <h3>O vendedor é confiável?</h3>
                  <p>Priorizamos vendedores bem avaliados e com boa reputação. Preço baixo de vendedor duvidoso é risco.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Indique */}
        <section className="secao indique" id="indique">
          <div className="wrap indique-grade">
            <div className="indique-texto rv">
              <p className="sobretitulo esquerda">
                <Anim n="presente" t={22} /> Faça um favor para alguém
              </p>
              <h2 className="secao-titulo esquerda">Tem um amigo que ama promoção?</h2>
              <p className="indique-sub">
                Mande o link do grupo para a família, os amigos ou aquele grupo do trabalho. Ajude quem você gosta a
                pagar menos nas compras do dia a dia.
              </p>
              <Indicar />
            </div>
            <div className="indique-visual rv" aria-hidden="true">
              <Foto nome="amigas-ofertas" alt="Amigas olhando ofertas no celular" sizes="(min-width: 900px) 45vw, 100vw" className="indique-foto" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="secao faq" id="faq">
          <div className="wrap">
            <p className="sobretitulo rv">Dúvidas</p>
            <h2 className="secao-titulo rv">Ficou alguma dúvida?</h2>
            <div className="faq-lista rv">
              <details open>
                <summary>Tem algum custo para participar?</summary>
                <p>
                  Não. Não cobramos entrada nem mensalidade. A gente se mantém com comissões das lojas, como explicado
                  acima.
                </p>
              </details>
              <details>
                <summary>Meu número fica visível?</summary>
                <p>
                  O grupo é fechado para conversa: só o administrador envia mensagens, então ninguém te chama no privado.
                  Como em qualquer grupo do WhatsApp, os participantes podem ver o número uns dos outros. No Telegram,
                  você pode ocultar seu número nas configurações de privacidade.
                </p>
              </details>
              <details>
                <summary>Vocês ganham alguma coisa com os links?</summary>
                <p>
                  Sim. Participamos dos programas de afiliados da Shopee, Mercado Livre, Magalu e Amazon e recebemos
                  uma comissão da loja quando você compra pelo nosso link, <b>sem nenhum custo extra para você</b>. O
                  preço é o mesmo que você pagaria entrando direto no site.
                </p>
                <p>
                  É isso que mantém o grupo funcionando. E é por isso que só enviamos desconto real: oferta ruim não vende
                  e ainda faz a gente perder a sua confiança.
                </p>
              </details>
              <details>
                <summary>Vocês vendem os produtos?</summary>
                <p>
                  Não. Não somos loja. A compra, o pagamento, a entrega e a garantia são da loja, e qualquer questão do
                  pedido é resolvida direto com ela.
                </p>
              </details>
              <details>
                <summary>Quantas mensagens por dia?</summary>
                <p>Só o que vale a pena. Se achar muito, dá para silenciar o grupo sem sair, o próprio WhatsApp permite.</p>
              </details>
              <details>
                <summary>Como faço para sair?</summary>
                <p>Pelo próprio WhatsApp, em dois toques, quando quiser. Sem precisar avisar ninguém.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Fechamento com vídeo e confete */}
        <section className="fechamento">
          <VideoLoop nome="shopping" className="fechamento-video" />
          <div className="confete" aria-hidden="true">
            {Array.from({ length: 32 }, (_, i) => (
              <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 8) * 0.55}s`, animationDuration: `${5 + (i % 5)}s` }} />
            ))}
          </div>
          <div className="wrap">
            <Anim n="festa" t={84} className="fechamento-emoji" />
            <h2>
              Achou? Levou.
              <br />
              <em>Entra e confere.</em>
            </h2>
            <p>Sem cadastro e sem mensalidade. Deixe silenciado e consulte quando precisar comprar alguma coisa.</p>
            <Botoes grande />
            <p className="fechamento-seguro">🔒 Convite direto pelo WhatsApp · Só o admin envia</p>
          </div>
        </section>
      </main>

      <Rodape home />

      <Navegacao />
      <Medicao />
      <VoltarTopo />

      <CtaFixa>
        <a className="btn-zap" href={LINK_PRINCIPAL}>
          <IconeZap />
          Entrar no grupo
        </a>
        <a className="btn-tele cta-tele" href={LINK_TELEGRAM}>
          <IconeTelegram />
          <span>Prefiro Telegram</span>
        </a>
      </CtaFixa>
    </>
  );
}
