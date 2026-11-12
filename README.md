# 🌌 Meu Universo Técnico — Portfólio Interativo

Portfólio pessoal desenvolvido como uma experiência de exploração espacial interativa, inspirado no universo do **Pequeno Príncipe**. Cada projeto é um asteroide a ser descoberto.

---

## ✨ Funcionalidades

- **Mapa Estelar Interativo** — Navegue por asteroides clicáveis no mapa central
- **Modo de Viagem** — Animação de warp ao clicar em um asteroide
- **Cursor HUD Personalizado** — Mira espacial que reage ao passar sobre os asteroides
- **Carrossel de Imagens** — Screenshots de cada projeto com lightbox em tela cheia
- **Painel de Projetos** — Descrição, stack tecnológica e link para o repositório
- **Efeito Máquina de Escrever** — Descrição digitada ao abrir cada projeto
- **Skills em Destaque** — Tecnologias usadas no projeto se iluminam automaticamente
- **Fundo Dinâmico** — Estrelas, nebulosas, asteroides flutuantes, estrelas cadentes e foguetes animados
- **Radar Girando** — Braço de radar animado no centro do mapa

---

## 🪐 Asteroides (Projetos)

| Asteroide | Projeto | Tecnologias |
|-----------|---------|-------------|
| B-612 | Base Estelar (Você) | — |
| 325 | NEXOS | React, Supabase, Groq, Pluggy |
| 329 | ViagemPro | Next.js, MySQL, JWT |
| 328 | ATLAS | n8n, Llama 3, Airtable |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** — Estrutura e SVG do mapa estelar
- **CSS3** — Animações, Grid Layout, efeitos visuais
- **JavaScript Vanilla (ES Modules)** — Interatividade, Canvas API, partículas
- **Google Fonts** — Orbitron, Share Tech Mono, Exo 2
- **Canvas API** — Starfield, asteroides, foguetes e estrelas cadentes

---

## 🚀 Como Rodar Localmente

> ⚠️ O projeto usa **ES Modules** (`import/export`), por isso **não funciona abrindo o `index.html` diretamente** no navegador. É necessário um servidor local.

```bash
# Clone o repositório
git clone https://github.com/MChaves-21/universo-tecnico.git

cd universo-tecnico

# Inicie um servidor local (Node.js necessário)
npx serve .
```

Acesse `http://localhost:3000` no navegador.

---

## 🌐 Deploy

Publicado via **GitHub Pages**:

> `https://mchaves-21.github.io/universo-tecnico`

Para ativar o GitHub Pages:
1. Vá em **Settings → Pages**
2. Em **Branch**, selecione `main` e pasta `/ (root)`
3. Clique em **Save**

---

## 📁 Estrutura do Projeto

```
universo-tecnico/
├── index.html              # HTML principal
├── README.md               # Este arquivo
│
├── css/
│   └── style.css           # Estilos globais e animações
│
├── js/
│   ├── main.js             # Ponto de entrada — orquestra os módulos
│   ├── background.js       # BackgroundEngine — estrelas, foguetes, asteroides
│   ├── cursor.js           # CursorEngine + TravelEngine
│   ├── map.js              # MapEngine — radar, tooltip, nós do mapa
│   └── ui.js               # UIEngine — carrossel, lightbox, projetos
│
├── data/
│   └── projects.js         # Dados dos projetos e caminhos das imagens
│
└── assets/
    └── images/             # Screenshots dos projetos (.webp)
        ├── nexos-dashboard.webp
        ├── nexos-investimentos.webp
        ├── nexos-openfinance.webp
        ├── viagempro-dashboard.webp
        ├── viagempro-usuarios.webp
        ├── viagempro-relatorios.webp
        ├── atlas-workflow.webp
        ├── atlas-airtable.webp
        └── atlas-email.webp
```

---

## 📬 Contato

- **GitHub** — [github.com/MChaves-21](https://github.com/MChaves-21)
- **LinkedIn** — [linkedin.com/in/murilo-chaves](https://www.linkedin.com/in/murilo-chaves)
- **Email** — murilochaves211105@gmail.com

---

<p align="center">Feito com ☕ e muito código por <strong>Murilo Chaves</strong></p>
