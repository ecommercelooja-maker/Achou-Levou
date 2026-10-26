import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";
import { NOME, SITE_URL } from "@/config";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--f-titulo" });
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--f-texto" });

const descricao = "As melhores ofertas, achadas para você. Achou, levou!";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: NOME,
  description: descricao,
  robots: { index: true, follow: true },
  openGraph: { title: NOME, description: descricao, locale: "pt_BR", type: "website", siteName: NOME },
};

export const viewport: Viewport = { themeColor: "#E4002B" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
