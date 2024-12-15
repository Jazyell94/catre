// Função para carregar e exibir os pacotes
function exibirPacotes() {
    fetch('pacotes.json')  // Carrega o arquivo JSON
        .then(response => response.json())  // Converte a resposta para JSON
        .then(pacotes => {
            const pacoteContainer = document.getElementById('pacote-container');
            
            pacotes.forEach(pacote => {
                // Monta o HTML com innerHTML
                const pacoteHTML = `
                    <div class="pacote">
                        <div class="image">
                            <div class="swiper-slide">
                                <img src="${pacote.imagem}" alt="${pacote.titulo} Foto">
                            </div>
                        </div>
                        <div class="infos">
                            <h3 class="title">${pacote.titulo}</h3>
                            <span>${pacote.periodo}</span>
                            <div class="inputs">
                                <input type="number" placeholder="Nº Adultos" data-translate="packages-input-placeholder1">
                                <input type="number" placeholder="Nº Crianças" data-translate="packages-input-placeholder2">
                            </div>
                            <div class="buttom">
                                <a href="${pacote.url_reserva}" class="reserve-now" data-translate="packages-buttom">Reservar</a>
                            </div>
                        </div>
                    </div>
                `;
                
                // Adiciona o HTML gerado ao container
                pacoteContainer.innerHTML += pacoteHTML;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}

// Chama a função para exibir os pacotes
exibirPacotes();
