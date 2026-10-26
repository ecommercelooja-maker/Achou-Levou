"use client";

import { useEffect, useState } from "react";
import { IconeTelegram, IconeZap } from "@/components/Logo";
import { ADS_ID, SITE_URL, TEXTO_INDICACAO } from "@/config";
import { converter, rastrear } from "@/lib/rastreio";

/* ------------------------------------------------------------------ */
/* Indicar para amigos                                                 */
/* ------------------------------------------------------------------ */
export function Indicar() {
  const [copiado, setCopiado] = useState(false);
  const [nativo, setNativo] = useState(false);
  const url = `${SITE_URL}/?ref=indicacao`;
  const texto = TEXTO_INDICACAO + url;

  useEffect(() => setNativo(typeof navigator !== "undefined" && !!navigator.share), []);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      rastrear("compartilhar", { canal: "copiar_link" });
      setTimeout(() => setCopiado(false), 1800);
    } catch {}
  };
  const compartilhar = async () => {
    try {
      await navigator.share({ title: "Achou, Levou", text: TEXTO_INDICACAO, url });
      rastrear("compartilhar", { canal: "nativo" });
    } catch {}
  };

  return (
    <div className="indique-botoes">
      <a
        className="btn-zap"
        href={`https://wa.me/?text=${encodeURIComponent(texto)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => rastrear("compartilhar", { canal: "whatsapp" })}
      >
        <IconeZap /> Enviar no WhatsApp
      </a>
      <a
        className="btn-indicar tele"
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(TEXTO_INDICACAO)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => rastrear("compartilhar", { canal: "telegram" })}
      >
        <IconeTelegram /> Telegram
      </a>
      <button type="button" className="btn-indicar" onClick={copiar}>
        {copiado ? "✓ Link copiado" : "🔗 Copiar link"}
      </button>
      {nativo && (
        <button type="button" className="btn-indicar" onClick={compartilhar}>
          ↗ Mais opções
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navegação: topo em vidro ao rolar + seção ativa + clique rastreado   */
/* ------------------------------------------------------------------ */
export function Navegacao() {
  useEffect(() => {
    const raiz = document.documentElement;
    const rolar = () => raiz.classList.toggle("rolou", window.scrollY > 40);
    rolar();
    window.addEventListener("scroll", rolar, { passive: true });

    const links = [...document.querySelectorAll<HTMLAnchorElement>(".topbar-nav a[href^='#']")];
    const secoes = links.map((a) => document.querySelector(a.hash)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (ens) =>
        ens.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("ativo", a.hash === `#${en.target.id}`));
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secoes.forEach((s) => io.observe(s));

    // Todo clique para entrar em grupo (WhatsApp ou Telegram) vira conversão do Google Ads e evento entrar_grupo.
    // Listener delegado no document, sem preventDefault: os eventos vão por beacon e a navegação segue normal.
    const clique = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='/g/']");
      if (!a) return;
      const grupo = a.pathname.split("/")[2] || "achadinhos";
      const secao = a.closest("section, header, footer, .cta-fixa")?.className.split(" ")[0] || "pagina";
      try {
        sessionStorage.setItem("al-entrou", "1");
      } catch {}
      converter();
      rastrear("entrar_grupo", {
        grupo,
        plataforma: a.search.includes("telegram") ? "telegram" : "whatsapp",
        origem: secao,
      });
    };
    document.addEventListener("click", clique);

    return () => {
      window.removeEventListener("scroll", rolar);
      io.disconnect();
      document.removeEventListener("click", clique);
    };
  }, []);
  return null;
}

/* ------------------------------------------------------------------ */
/* Aviso de cookies (LGPD) + Consent Mode v2 do Google.                 */
/* A tag é carregada no layout raiz (só com NEXT_PUBLIC_GADS_ID), já    */
/* com tudo "denied" e aplicando a escolha salva em visitas anteriores. */
/* ------------------------------------------------------------------ */
type JanelaMedicao = Window & { gtag?: (...a: unknown[]) => void };

const CHAVE_COOKIES = "al-cookies";

export function Medicao() {
  const [mostrar, setMostrar] = useState(false);
  const ativa = Boolean(ADS_ID);

  useEffect(() => {
    if (!ativa) return;
    let v: string | null = null;
    try {
      v = localStorage.getItem(CHAVE_COOKIES);
    } catch {}
    if (v !== "sim" && v !== "nao") setMostrar(true);
  }, [ativa]);

  const decidir = (sim: boolean) => {
    try {
      localStorage.setItem(CHAVE_COOKIES, sim ? "sim" : "nao");
    } catch {}
    if (sim) {
      (window as JanelaMedicao).gtag?.("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
      // TODO Meta Pixel: quando for ativado, carregar o pixel aqui (só depois do aceite).
    }
    setMostrar(false);
  };

  if (!mostrar) return null;
  return (
    <div className="cookies" role="region" aria-label="Aviso de cookies">
      <p>
        🍪 Usamos cookies para medir as visitas e os anúncios. Eles só são ativados com o seu aceite. Veja a{" "}
        <a href="/cookies">política de cookies</a>.
      </p>
      <div>
        <button type="button" className="cookies-nao" onClick={() => decidir(false)}>
          Recusar
        </button>
        <button type="button" className="cookies-sim" onClick={() => decidir(true)}>
          Aceitar
        </button>
      </div>
    </div>
  );
}
