import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        title: "Análise Covid-19",
        description: "Plataforma de visualização de dados da pandemia no Brasil. Apresenta gráficos interativos desenvolvidos com Recharts e um mapa dinâmico que exibe informações detalhadas de cada estado brasileiro. Construído com Next.js para performance otimizada.",
        image: "/covid.png",
        link: "https://analise-covid19.vercel.app/",
        tags: ["Next.js", "Recharts", "Mapas", "Api"]
    },
    {
        title: "Wiki Leviatan",
        description: "Wiki interativa para organização de campanhas de RPG. Sistema completo de personagens e histórias renderizados dinamicamente. Implementa Framer Motion para transições suaves, View Transitions API para navegação fluida e Supabase como banco de dados.",
        image: "/wiki.png",
        link: "https://leviatan-wiki.vercel.app/",
        tags: ["Next.js", "Framer Motion", "Supabase", "RPG"]
    },
    {
        title: "Chico no Clima",
        description: "Website oficial do projeto vencedor do edital Jovens no Clima, apresentado na COP30. Apresenta Chico, um caranguejo interativo que promove educação ambiental e sustentabilidade. Desenvolvido em Next.js com suporte multilíngue (i18n).",
        image: "/chico.png",
        link: "https://chiconoclima.vercel.app/",
        tags: ["Next.js", "i18n", "Sustentabilidade", "COP30"]
    },
    {
        title: "Psicóloga Juliane Reis",
        description: "Portfólio profissional desenvolvido para psicóloga clínica. O site apresenta serviços oferecidos, conteúdo sobre saúde mental e formulário de contato. Interface clean e acessível, construída com HTML e CSS puro.",
        image: "/psi.png",
        link: "https://www.psijulianereis.com.br/",
        tags: ["HTML", "CSS", "Landing Page", "UX"]
    },
]