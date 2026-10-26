import { IconeEtiqueta, IconeTelegram, IconeZap } from "@/components/Logo";
import { Anim } from "@/components/Pecas";
import { Medicao, Navegacao } from "@/components/Conversao";
import { Movimento, VoltarTopo } from "@/components/Movimento";
import { AVISO_TOPO, LOJAS, TEXTO_AFILIADO_RODAPE } from "@/config";
import { CNPJ, EMAIL_CONTATO, ENDERECO, RAZAO_SOCIAL } from "@/lib/empresa";

export const LINK_PRINCIPAL = "/g/achadinhos";
export const LINK_TELEGRAM = "/g/achadinhos?p=telegram";

// Na home os links do menu rolam até a seção; nas outras páginas voltam para a home.
const ancora = (home: boolean, id: string) => (home ? `#${id}` : `/#${id}`);

/* Topo + aviso de curadoria independente (logo abaixo do topo, em todas as páginas). */
export function Cabecalho({ home = false }: { home?: boolean }) {
  return (
    <>
      <div className="topbar">
        <div className="topbar-int">
          <a className="topbar-marca" href="/">
            <span className="topbar-icone">
              <IconeEtiqueta />
            </span>
            <span>
              Achou,<em>Levou</em>
            </span>
          </a>
          <nav className="topbar-nav" aria-label="Menu">
            <a href={ancora(home, "exemplos")}>Exemplos</a>
            <a href={ancora(home, "como-funciona")}>Como funciona</a>
            <a href={ancora(home, "porque")}>Como nos mantemos</a>
            <a href={ancora(home, "faq")}>Dúvidas</a>
            <a href="/sobre">Sobre nós</a>
          </nav>
          <a className="topbar-btn" href={LINK_PRINCIPAL}>
            Entrar no grupo <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <p className="aviso-topo">{AVISO_TOPO}</p>
    </>
  );
}

export function Rodape({ home = false }: { home?: boolean }) {
  return (
    <footer className="rodape" data-progresso>
      <svg className="rodape-onda" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path className="onda o1" d="M0 60c120-30 240-30 360 0s240 30 360 0 240-30 360 0 240 30 360 0 240-30 360 0 240 30 360 0V120H0z" />
        <path className="onda o2" d="M0 70c120-25 240-25 360 0s240 25 360 0 240-25 360 0 240 25 360 0 240-25 360 0 240 25 360 0V120H0z" />
        <path className="onda o3" d="M0 84c120-18 240-18 360 0s240 18 360 0 240-18 360 0 240 18 360 0 240-18 360 0 240 18 360 0V120H0z" />
      </svg>
      <div className="rodape-corpo">
        <div className="rodape-particulas" aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 47) % 100}%`,
                animationDelay: `${(i % 11) * -1.3}s`,
                animationDuration: `${9 + (i % 6) * 2}s`,
                width: `${4 + (i % 4) * 3}px`,
                height: `${4 + (i % 4) * 3}px`,
              }}
            />
          ))}
        </div>

        <div className="wrap rodape-topo">
          <div className="rodape-cta">
            <Anim n="foguete" t={48} />
            <div>
              <b>Entre e veja como é.</b>
              <span>Se não gostar, sai em dois toques.</span>
            </div>
            <a className="btn-zap" href={LINK_PRINCIPAL}>
              <IconeZap /> Entrar no grupo
              <span className="btn-brilho" aria-hidden="true" />
            </a>
          </div>

          <div className="rodape-colunas">
            <div className="rodape-marca-bloco">
              <p className="rodape-marca">
                <span className="rodape-icone">
                  <IconeEtiqueta corpo="#fff" simbolo="#c8102e" />
                </span>
                Achou,<em>Levou</em>
              </p>
              <p>
                Curadoria independente de promoções de eletrônicos, eletrodomésticos e enxoval, divulgadas em grupo no
                WhatsApp e canal no Telegram. Não vendemos produtos: a compra é feita direto na loja.
              </p>
              <div className="rodape-selos">
                <span>🔒 Sem cadastro</span>
                <span>✓ Só o admin envia</span>
                <span>💚 Sem mensalidade</span>
              </div>
            </div>
            <nav className="rodape-col" aria-label="Navegação">
              <b>Navegação</b>
              <a href={ancora(home, "exemplos")}>Exemplos</a>
              <a href={ancora(home, "como-funciona")}>Como funciona</a>
              <a href={ancora(home, "porque")}>Como nos mantemos</a>
              <a href={ancora(home, "faq")}>Dúvidas</a>
              <a href={LINK_TELEGRAM}>Canal no Telegram</a>
            </nav>
            <nav className="rodape-col" aria-label="Institucional">
              <b>Institucional</b>
              <a href="/sobre">Sobre Nós</a>
              <a href="/privacidade">Política de Privacidade</a>
              <a href="/termos">Termos de Uso</a>
              <a href="/contato">Contato</a>
              <a href="/cookies">Política de cookies</a>
              <a href="/afiliados">Aviso de afiliados</a>
            </nav>
          </div>
        </div>

        <div className="rodape-gigante" aria-hidden="true">
          <span>Achou, Levou</span>
        </div>

        <div className="wrap rodape-base">
          <p className="rodape-afiliado">{TEXTO_AFILIADO_RODAPE}</p>
          <p>
            {RAZAO_SOCIAL} — CNPJ {CNPJ} · {ENDERECO}
          </p>
          <p>
            Contato: <a href={`mailto:${EMAIL_CONTATO}`}>{EMAIL_CONTATO}</a>
          </p>
          <p>
            {LOJAS.join(", ")} e demais marcas citadas pertencem a seus respectivos titulares. O Achou, Levou não vende
            produtos e não representa essas empresas. Confira preço, estoque e condições na loja antes de comprar.
          </p>
          <p>
            © {new Date().getFullYear()} Achou, Levou · Emojis animados:{" "}
            <a href="https://googlefonts.github.io/noto-emoji-animation/">Google Noto Emoji</a> (CC BY 4.0) · Fotos:{" "}
            <a href="https://unsplash.com">Unsplash</a> · Vídeos: <a href="https://mixkit.co">Mixkit</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Botões de entrada: WhatsApp em destaque e Telegram como opção secundária. */
export function Botoes({ grande = false, texto = "Entrar no grupo", claro = false }: { grande?: boolean; texto?: string; claro?: boolean }) {
  return (
    <div className="hero-ctas">
      <a className={`btn-zap${grande ? " grande" : ""}`} href={LINK_PRINCIPAL}>
        <IconeZap />
        {texto}
        <span className="btn-brilho" aria-hidden="true" />
      </a>
      <a className={`btn-tele${claro ? " claro" : ""}`} href={LINK_TELEGRAM}>
        <IconeTelegram />
        Prefiro Telegram
      </a>
    </div>
  );
}

/* Moldura das páginas internas (Sobre, Contato e páginas legais): mesmo topo e rodapé da home. */
export function PaginaInterna({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Movimento />
      <Cabecalho />
      {children}
      <Rodape />
      <Navegacao />
      <Medicao />
      <VoltarTopo />
    </>
  );
}
