// Dados dos projetos e mapeamento de imagens
// Edite este arquivo para atualizar o conteúdo do portfólio

export const IMAGES = {
  n1: "assets/images/nexos-dashboard.webp",
  n2: "assets/images/nexos-investimentos.webp",
  n3: "assets/images/nexos-openfinance.webp",
  v1: "assets/images/viagempro-dashboard.webp",
  v2: "assets/images/viagempro-usuarios.webp",
  v3: "assets/images/viagempro-relatorios.webp",
  a1: "assets/images/atlas-workflow.webp",
  a2: "assets/images/atlas-airtable.webp",
  a3: "assets/images/atlas-email.webp",
};

export const PROJECTS = {
  proj1: {
    name: "NEXOS",
    tag: "ASTEROIDE 325",
    color: "#60a5fa",
    colorBg: "rgba(96,165,250,.1)",
    category: "Dashboard Financeiro · IA · Open Finance",
    desc: "Plataforma que transforma dados financeiros dispersos em decisões estratégicas. Visão unificada de Patrimônio Líquido, Investimentos e Despesas — com cotações em tempo real (B3 e cripto), categorização por IA e integração Open Finance via Pluggy.",
    tech: ["React 18", "TypeScript", "Supabase", "PostgreSQL", "Groq · Gemini", "Pluggy", "TanStack Query", "Recharts", "Framer Motion"],
    link: "https://github.com/MChaves-21/Nexos",
    insight: "Aprendi que o maior desafio em fintech não é a tecnologia — é fazer dados complexos parecerem simples e acionáveis para o usuário.",
    imgs: ["n1", "n2", "n3"],
  },
  proj2: {
    name: "ViagemPro",
    tag: "ASTEROIDE 329",
    color: "#34d399",
    colorBg: "rgba(52,211,153,.1)",
    category: "Gestão Corporativa · SaaS · Full-Stack",
    desc: "Sistema web completo de gestão de despesas de viagens corporativas. Colaboradores registram viagens, submetem despesas e acompanham reembolsos — com fluxo de aprovação por perfis e relatórios exportáveis em CSV.",
    tech: ["Next.js 15", "TypeScript", "MySQL 8", "JWT", "Recharts", "Vercel", "Aiven Cloud"],
    link: "https://github.com/MChaves-21/controle-viagens",
    insight: "Sistemas corporativos ensinam que permissões e fluxos de aprovação são tão críticos quanto a interface — um erro de acesso pode comprometer toda a operação.",
    imgs: ["v1", "v2", "v3"],
  },
  proj3: {
    name: "ATLAS",
    tag: "ASTEROIDE 328",
    color: "#f472b6",
    colorBg: "rgba(244,114,182,.1)",
    category: "Automação · IA Generativa · News Intelligence",
    desc: "Ecossistema de automação para curadoria de notícias. Varre feeds RSS globais, filtra as últimas 24h, usa Llama 3 (Groq) para resumir, categorizar e analisar sentimento — e entrega um e-mail HTML diário estruturado, salvando tudo no Airtable.",
    tech: ["n8n", "Groq · Llama 3.1", "Airtable", "Gmail API", "JavaScript", "RSS Feeds"],
    link: "https://github.com/MChaves-21/AUTOMACAO-N8N/tree/main/ATLAS",
    insight: "Automatizar curadoria de notícias mostrou que o verdadeiro valor da IA está em filtrar o ruído — não em gerar mais conteúdo, mas em destacar o que realmente importa.",
    imgs: ["a1", "a2", "a3"],
  },
};
