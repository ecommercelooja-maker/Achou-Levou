"use client";

import { useEffect, useState } from "react";

/* Revela elementos .rv quando entram na tela. */
export function Revelar() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll<HTMLElement>(".rv");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("rv-on"));
      return;
    }
    const io = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("rv-on");
            io.unobserve(en.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

/* Barra de CTA fixa no rodapé: aparece depois que o hero sai da tela. */
export function CtaFixa({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`cta-fixa${on ? " on" : ""}`} aria-hidden={!on}>
      {children}
    </div>
  );
}
