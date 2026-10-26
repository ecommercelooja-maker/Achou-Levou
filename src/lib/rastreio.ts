// Dispara eventos para a Google tag (Google Ads / GA4) — só se ela tiver sido carregada (NEXT_PUBLIC_GADS_ID).
// A tag respeita o Consent Mode v2: sem aceite no aviso de cookies, não grava cookies.
// `transport_type: "beacon"` garante o envio mesmo com a página saindo para o WhatsApp/Telegram.
import { ADS_ID, ADS_ROTULO } from "@/config";

type Janela = Window & { gtag?: (...a: unknown[]) => void };

export function rastrear(evento: string, dados: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  (window as Janela).gtag?.("event", evento, { ...dados, transport_type: "beacon" });
  // TODO Meta Pixel: quando for ativado, o fbq("track", ...) correspondente entra aqui.
}

// Conversão do Google Ads: clique para entrar em um grupo.
export function converter() {
  if (typeof window === "undefined" || !ADS_ID || !ADS_ROTULO) return;
  (window as Janela).gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_ROTULO}`, transport_type: "beacon" });
}
