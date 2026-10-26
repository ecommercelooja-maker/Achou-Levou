"use client";

import { useEffect, useRef } from "react";

/*
 * Motor de efeitos de rolagem. Um único listener (via requestAnimationFrame) que escreve
 * variáveis CSS; o CSS decide o que fazer com elas.
 *   :root --rolagem           0→1 da página inteira (barra de progresso, botão de topo)
 *   [data-progresso] --p      0→1 enquanto o elemento atravessa a tela
 *   [data-sticky]    --p      0→1 enquanto a seção "grudada" é rolada
 *   [data-parallax="0.2"]     desloca o elemento no eixo Y proporcional à posição
 * Também liga inclinação 3D + brilho que segue o mouse em [data-tilt].
 */
export function Movimento() {
  useEffect(() => {
    const raiz = document.documentElement;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pendente = false;

    const atualizar = () => {
      pendente = false;
      const vh = window.innerHeight;
      const total = raiz.scrollHeight - vh;
      raiz.style.setProperty("--rolagem", String(total > 0 ? window.scrollY / total : 0));
      if (reduzir) return;

      document.querySelectorAll<HTMLElement>("[data-progresso]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        const p = (vh - r.top) / (vh + r.height);
        el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
      });

      document.querySelectorAll<HTMLElement>("[data-sticky]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const curso = r.height - vh;
        const p = curso > 0 ? -r.top / curso : 0;
        el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const fator = parseFloat(el.dataset.parallax || "0.15");
        const centro = r.top + r.height / 2 - vh / 2;
        el.style.setProperty("--py", `${(-centro * fator).toFixed(1)}px`);
      });
    };

    const agendar = () => {
      if (!pendente) {
        pendente = true;
        requestAnimationFrame(atualizar);
      }
    };

    atualizar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);

    // Inclinação 3D + brilho seguindo o mouse (só em mouse de verdade).
    const finos = window.matchMedia("(pointer: fine)").matches && !reduzir;
    const hero = document.querySelector<HTMLElement>(".hero");
    const mover = (e: PointerEvent) => {
      if (hero && e.clientY < hero.getBoundingClientRect().bottom) {
        hero.style.setProperty("--hx", `${e.clientX}px`);
        hero.style.setProperty("--hy", `${e.clientY - hero.getBoundingClientRect().top}px`);
      }
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", `${((0.5 - y) * 8).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((x - 0.5) * 10).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    };
    const sair = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
      if (!el || el.contains(e.relatedTarget as Node)) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    if (finos) {
      document.addEventListener("pointermove", mover, { passive: true });
      document.addEventListener("pointerout", sair, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      document.removeEventListener("pointermove", mover);
      document.removeEventListener("pointerout", sair);
    };
  }, []);

  return <div className="barra-progresso" aria-hidden="true" />;
}

/* Vídeo em loop que só carrega quando chega perto da tela e pausa fora dela. */
export function VideoLoop({ nome, className = "", rotulo }: { nome: string; className?: string; rotulo?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          if (!v.src) v.src = `/video/${nome}.mp4`;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [nome]);
  return (
    <video
      ref={ref}
      className={className}
      poster={`/video/${nome}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
    />
  );
}

/* Botão "voltar ao topo" com anel de progresso da página. */
export function VoltarTopo() {
  return (
    <button
      type="button"
      className="voltar-topo"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="21" className="vt-trilho" />
        <circle cx="24" cy="24" r="21" className="vt-anel" pathLength={1} />
        <path d="M24 32V17M17 23l7-7 7 7" className="vt-seta" />
      </svg>
    </button>
  );
}
