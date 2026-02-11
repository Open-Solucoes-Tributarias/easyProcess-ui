export const tourSteps = {
    "/dashboard": [
        {
            target: "#dashboard-title",
            content: "Bem-vindo ao Dashboard! Aqui você tem uma visão geral do sistema.",
            disableBeacon: true,
        },
        {
            target: "#dashboard-stats",
            content: "Veja rapidamente o status de suas atividades: Concluídas, Pendentes e Atrasadas.",
        },
        {
            target: "#dashboard-charts",
            content: "Analise o desempenho por frente de trabalho e por usuário.",
        },
    ],
    "/painel": [
        {
            target: "#painel-select-contract",
            content: "Comece selecionando um contrato para visualizar suas atividades.",
            disableBeacon: true,
        },
        {
            target: "#painel-content",
            content: "Aqui você gerencia as atividades do contrato selecionado, visualiza status e edita detalhes.",
        },
    ],
    // Adicione outras rotas conforme necessário
};
