// ==========================================
// ARQUIVO GESTOR DE TRÁFEGO E CONFIG. GERAIS
// ==========================================

const CONFIG = {
    // 1. DADOS DA EMPRESA E ATENDIMENTO
    empresa: {
        nome1: "SOBRE",
        nome2: "PISOS", // Aparece em destaque (com a cor primária)
        whatsapp: "5521990435695" // Apenas números
    },

    // 2. OPÇÕES DE PISOS E PREÇOS (O Select será populado sozinho no HTML)
    pisos: [
        {
            categoria: "Piso Laminado",
            nome: "Laminado + Rodapé + Instalação",
            preco: 159.90,
            // Inclui: todos os perfis e acessórios necessários
            descricao: "Incluso todos os perfis e acessórios necessários"
        },
        {
            categoria: "Piso Vinílico",
            nome: "Vinílico + Rodapé + Instalação",
            preco: 179.90,
            // Inclui: massa niveladora, perfis e acessórios necessários
            descricao: "Incluso massa niveladora, perfis e acessórios necessários"
        }
    ],

    // 3. OPÇÕES DE PISO ATUAL (Select 1)
    opcoesPisoAtual: [
        { valor: "Contrapiso", texto: "Contrapiso (Cimento)" },
        { valor: "Cerâmica", texto: "Cerâmica / Porcelanato" },
        { valor: "Madeira", texto: "Madeira / Taco" },
        { valor: "Outro", texto: "Outro / Não sei" }
    ],

    // 4. BÔNUS E INCLUSÕES NO ORÇAMENTO (Aparece no final, no modal)
    bonus: [
        { titulo: "Rodapé Instalado", subtitulo: "INCLUSO", strike: "", gratis: true },
        { titulo: "Perfis e Acessórios", subtitulo: "INCLUSO", strike: "", gratis: true },
        { titulo: "Frete", subtitulo: "A Consultar", strike: "", gratis: false },
        { titulo: "Visita Técnica", subtitulo: "A Combinar", strike: "", gratis: false }
    ]
};
