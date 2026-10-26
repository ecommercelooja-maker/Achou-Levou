/* eslint-disable @next/next/no-img-element */

// Foto responsiva: o navegador escolhe entre 640, 1280 e 2560px (originais em 4K+, do Unsplash).
export function Foto({
  nome,
  alt = "",
  sizes = "(min-width: 900px) 50vw, 100vw",
  className,
  prioridade = false,
}: {
  nome: string;
  alt?: string;
  sizes?: string;
  className?: string;
  prioridade?: boolean;
}) {
  const base = `/fotos/${nome}`;
  return (
    <img
      className={className}
      src={`${base}-1280.webp`}
      srcSet={`${base}-640.webp 640w, ${base}-1280.webp 1280w, ${base}-2560.webp 2560w`}
      sizes={sizes}
      alt={alt}
      loading={prioridade ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
