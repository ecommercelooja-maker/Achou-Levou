// Ícone da etiqueta (mesmo desenho do logo): corpo + ponto + seta para baixo.
export function IconeEtiqueta({ corpo = "#c8102e", simbolo = "#fff" }: { corpo?: string; simbolo?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 120" role="img" aria-label="Achou, Levou">
      <path
        d="M6 38a18 18 0 0 1 18-18h56a10 10 0 0 1 8 4l26 33a5 5 0 0 1 0 6l-26 33a10 10 0 0 1-8 4H24A18 18 0 0 1 6 82z"
        fill={corpo}
      />
      <circle cx="34" cy="60" r="9" fill={simbolo} />
      <path d="M68 38v34" stroke={simbolo} strokeWidth="10" strokeLinecap="round" fill="none" />
      <path
        d="M55 61l13 13 13-13"
        stroke={simbolo}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function IconeZap() {
  // Ícone removido dos botões
  return null;
}

export function IconeTelegram() {
  // Ícone removido dos botões
  return null;
}
