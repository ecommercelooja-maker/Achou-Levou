import { NextResponse, type NextRequest } from "next/server";
import { GRUPOS, LINKS_WHATSAPP, TELEGRAM, type SlugGrupo } from "@/config";

export function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const grupo = GRUPOS[params.slug as SlugGrupo] ?? GRUPOS.achadinhos;
  const destino =
    req.nextUrl.searchParams.get("p") === "telegram" ? TELEGRAM : grupo.whatsapp || LINKS_WHATSAPP[0];

  // Enquanto o link real não for configurado, volta para a LP.
  return NextResponse.redirect(destino || new URL("/#exemplos", req.url), 302);
}
