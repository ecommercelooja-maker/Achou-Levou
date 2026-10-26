/* eslint-disable @next/next/no-img-element */
import { MOSTRAR_PRECOS, NICHOS, type Nicho } from "@/config";
import dados from "@/data/ofertas.json";

type Exemplo = {
  ativo: boolean;
  nome: string;
  imagem: string;
  loja: string;
  nicho: Nicho;
  precoDe: string;
  precoPor: string;
};

const EXEMPLOS = (dados.ofertas as Exemplo[]).filter((o) => o.ativo);

// Placeholder "R$ 0,00" nunca vai para a página, mesmo com MOSTRAR_PRECOS ligado.
const temPreco = (o: Exemplo) => MOSTRAR_PRECOS && !/^R\$\s*0,00$/.test(o.precoPor.trim());

/* Grid de exemplos estáticos: sem link, sem botão por card. */
export function GridExemplos() {
  return (
    <div className="exemplos">
      {EXEMPLOS.map((o) => (
        <article key={o.imagem} className="exemplo">
          <div className="exemplo-foto">
            <img src={o.imagem} alt={o.nome} loading="lazy" />
          </div>
          <div className="exemplo-corpo">
            <span className="exemplo-nicho">{NICHOS[o.nicho]}</span>
            <h3 className="exemplo-nome">{o.nome}</h3>
            {temPreco(o) && (
              <p className="exemplo-precos">
                <s>
                  <span className="sr">De </span>
                  {o.precoDe}
                </s>
                <b>
                  <span className="sr">Por </span>
                  {o.precoPor}
                </b>
              </p>
            )}
            <p className="exemplo-loja">Loja: {o.loja}</p>
            <p className="exemplo-nota">Preço e disponibilidade sujeitos a alteração. Exemplo ilustrativo de oferta já divulgada.</p>
          </div>
        </article>
      ))}
    </div>
  );
}
