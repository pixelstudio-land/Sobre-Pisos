// Função que é chamada ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    inicializarDadosEstruturais();
});

// 1. POPULA OS DADOS VISUAIS (Logo, Nomes, Selects, Bônus)
function inicializarDadosEstruturais() {
    // 1.1 Nome da Marca (Header e Footer)
    const brandElements = document.querySelectorAll('.dynamic-brand');
    brandElements.forEach(el => {
        el.innerHTML = `${CONFIG.empresa.nome1} <span style="color: var(--primary);">${CONFIG.empresa.nome2}</span>`;
    });
    
    // Altera nomes em títulos de feature
    const h2BrandElements = document.querySelectorAll('.dynamic-feature-brand');
    h2BrandElements.forEach(el => {
        el.innerHTML = `<span style="color:var(--primary)">${CONFIG.empresa.nome1} ${CONFIG.empresa.nome2}</span>`;
    });

    // 1.2 Whatsapp Header Link
    const headerZapBtn = document.getElementById('headerZapBtn');
    if(headerZapBtn) {
        headerZapBtn.href = `https://wa.me/${CONFIG.empresa.whatsapp}`;
    }

    // 1.3 Popular Options de Piso Atual
    const pisoAtualSelect = document.getElementById('pisoAtual');
    if(pisoAtualSelect) {
        pisoAtualSelect.innerHTML = '';
        CONFIG.opcoesPisoAtual.forEach(op => {
            const tempOption = document.createElement('option');
            tempOption.value = op.valor;
            tempOption.innerText = op.texto;
            pisoAtualSelect.appendChild(tempOption);
        });
    }

    // 1.4 Popular Select de Modelos de Piso com Categorias
    const modeloSelect = document.getElementById('modelo');
    if(modeloSelect) {
        modeloSelect.innerHTML = '';
        
        // Agrupar por categorias
        const categorias = [...new Set(CONFIG.pisos.map(item => item.categoria))];
        
        categorias.forEach(cat => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = cat;
            
            // Pega pisos da categoria atual
            const pisosDaCategoria = CONFIG.pisos.filter(p => p.categoria === cat);
            pisosDaCategoria.forEach(piso => {
                const tempOption = document.createElement('option');
                tempOption.value = JSON.stringify({ preco: piso.preco, descricao: piso.descricao, nome: piso.nome });
                tempOption.innerText = `${piso.nome} — R$ ${piso.preco.toFixed(2).replace('.', ',')}/m²`;
                optgroup.appendChild(tempOption);
            });
            
            modeloSelect.appendChild(optgroup);
        });
    }

    // 1.5 Popular Lista de Bônus no Modal
    const bonusListContainer = document.getElementById('bonusListRenderer');
    if(bonusListContainer) {
        bonusListContainer.innerHTML = '';
        CONFIG.bonus.forEach(bonus => {
            const div = document.createElement('div');
            div.className = `bonus-item ${bonus.gratis ? 'free' : ''}`;
            
            let strikeHtml = bonus.strike ? `<span class="strike">${bonus.strike}</span> ` : '';
            div.innerHTML = `
                <span><i class="fas fa-check"></i> ${bonus.titulo}</span>
                <span>${strikeHtml}${bonus.subtitulo}</span>
            `;
            bonusListContainer.appendChild(div);
        });
    }
}

// 2. FUNÇÃO DE CALCULAR E ABRIR MODAL
function calcular() {
    const metragemInput = document.getElementById('metragem').value;
    const metragem = parseFloat(metragemInput.replace(',', '.'));
    
    const modeloEl = document.getElementById('modelo');
    const modeloData = JSON.parse(modeloEl.value);
    const modeloPreco = modeloData.preco;
    const modeloNome = modeloData.nome;
    const modeloDescricao = modeloData.descricao;

    const pisoAtual = document.getElementById('pisoAtual');
    const pisoAtualNome = pisoAtual.options[pisoAtual.selectedIndex].text;
    
    const nivelamentoEl = document.getElementById('nivelamento');
    const nivelamentoNome = nivelamentoEl.options[nivelamentoEl.selectedIndex].text;

    if (isNaN(metragem) || metragem < 1) {
        alert("Por favor, digite uma metragem válida.");
        return;
    }

    // Lógica de Preço
    let total = metragem * modeloPreco;
    const valorFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    // Atualiza o subtítulo do modal com o que está incluso
    const modalSubtitle = document.getElementById('modalSubtitle');
    if(modalSubtitle) {
        modalSubtitle.innerText = `✔ ${modeloDescricao}`;
    }

    // Seta visualmente no modal
    document.getElementById('valorFinal').innerText = valorFormatado;

    // Gerar Link do WhatsApp
    const textoZap = `Olá, Sobre Pisos! Fiz uma simulação no site:\n\n` +
        `📐 *Metragem:* ${metragem}m²\n` +
        `🪵 *Serviço:* ${modeloNome}\n` +
        `📋 *Incluso:* ${modeloDescricao}\n` +
        `💰 *Valor Estimado:* ${valorFormatado}\n\n` +
        `ℹ️ *Local Atual:*\n` +
        `- Piso: ${pisoAtualNome}\n` +
        `- Nivelamento: ${nivelamentoNome}\n\n` +
        `Gostaria de confirmar o orçamento e agendar a visita!`;

    const link = `https://wa.me/${CONFIG.empresa.whatsapp}?text=${encodeURIComponent(textoZap)}`;
    document.getElementById('linkZap').href = link;
    
    // Abre modal
    document.getElementById('modalResult').style.display = 'flex';

    // Dispara Evento pro Pixel (função no pixel.js)
    if(typeof trackLead === 'function') {
        trackLead(total);
    }
}

// 3. FECHAR MODAL
function fecharModal() {
    document.getElementById('modalResult').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('modalResult');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
