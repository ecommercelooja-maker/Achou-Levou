/* eslint-disable @next/next/no-img-element */

/* Emoji animado (Google Noto Animated Emoji, CC BY 4.0). */
export function Anim({ n, t = 40, className = "" }: { n: string; t?: number; className?: string }) {
  return <img className={`anim ${className}`} src={`/anim/${n}.webp`} alt="" aria-hidden="true" width={t} height={t} loading="lazy" />;
}
