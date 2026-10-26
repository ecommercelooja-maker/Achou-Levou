# Achou, Levou — como conectar o domínio

Projeto na Vercel: **achoulevou** (time *ecommercelooja*)
Endereço da Vercel: https://achoulevou.vercel.app
Repositório: https://github.com/ecommercelooja-maker/Achou-Levou

## 1. Adicionar o domínio na Vercel

Vercel → projeto **achoulevou** → *Settings* → *Domains* → *Add* e adicione os dois:

- `seudominio.com.br`
- `www.seudominio.com.br`

Escolha o principal (recomendado: `www`) e deixe o outro redirecionando para ele (a Vercel oferece isso na tela).

## 2. Configurar o DNS (no painel onde o domínio foi comprado: Registro.br, Hostinger, GoDaddy…)

| Tipo  | Nome / Host | Valor                  |
|-------|-------------|------------------------|
| A     | `@`         | `76.76.21.21`          |
| CNAME | `www`       | `cname.vercel-dns.com` |

- Apague outros registros **A** ou **CNAME** que já existam para `@` e `www` (ex.: "parking" da registradora).
- Não mexa em registros **MX** / **TXT** de e-mail.
- **Registro.br:** em "Editar zona" → modo avançado ("Configurar DNS" → usar os DNS do Registro.br) e crie os registros acima.
- A propagação leva de alguns minutos a poucas horas. O HTTPS (cadeado) é emitido pela Vercel automaticamente.

Se a Vercel mostrar valores diferentes na tela de *Domains*, use os que ela mostrar.

## 3. Avisar o site do endereço novo

Na Vercel → *Settings* → *Environment Variables*, crie para **Production**:

```
NEXT_PUBLIC_SITE_URL = https://www.seudominio.com.br
```

Depois faça um novo deploy (*Deployments* → último → *Redeploy*). Isso atualiza o link canônico, o
`sitemap.xml`, o `robots.txt` e a imagem das prévias de compartilhamento (WhatsApp, Facebook).

## 4. Publicar alterações

Todo push na `main` publica em produção automaticamente; as outras branches geram um link de prévia.

## 5. Conferir

- `https://www.seudominio.com.br` abre a página com cadeado
- `https://seudominio.com.br` redireciona para o `www`
- `https://www.seudominio.com.br/sitemap.xml` lista o domínio novo

## Medição para anúncios (opcional)

A tag do Google fica desligada até o Achou, Levou ter conta própria. Para ligar, crie na Vercel (Production)
e faça um novo deploy (modelo em `.env.example`):

```
NEXT_PUBLIC_GADS_ID     = AW-XXXXXXXXXX
NEXT_PUBLIC_GADS_LABEL  = rótulo da conversão "Entrar no grupo"
NEXT_PUBLIC_GA_ID       = G-XXXXXXXXXX   (Google Analytics 4, opcional)
```

## Ainda falta (src/config.ts e src/lib/empresa.ts)

- Links dos grupos de WhatsApp (`LINKS_WHATSAPP`) e do Telegram (`TELEGRAM`) do Achou, Levou
- Criar a caixa `contato@achoulevou.com.br` (`EMAIL_CONTATO`) depois de registrar o domínio
