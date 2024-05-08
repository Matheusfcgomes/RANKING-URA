// TROCANDO DE PÁGINA
const inicio_button = document.getElementById('inicio-button');
inicio_button.addEventListener('click', () => {
    window.location.href = 'index.html';
})

// OBTENDO DADOS DO DATABASE

fetch('http://localhost:3000/ranking').then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {

    const participantes = data.map(participante => ({
        nome: participante.nome,
        email: participante.email,
        telefone: participante.telefone,
        tempo_total: participante.tempo_total,
        minutos: participante.minutos,
        segundos: participante.segundos,
    }));

    // FORMATANDO MINUTOS E SEGUNDOS NO MODELO 00:00
    for(let i=0; i<participantes.length; i++){
        if(participantes[i].minutos < 10){
            participantes[i].minutos = '0' + participantes[i].minutos
        }
        if(participantes[i].segundos < 10){
            participantes[i].segundos = '0' + participantes[i].segundos
        }
    }

    // ORDENANDO POR TEMPO
    participantes.sort((a, b) => a.tempo_total - b.tempo_total)

    // ATUALIZANDO PÓDIO
    for(let i=0; i<participantes.length && i<3; i++){
        document.getElementById(`podioNome${i+1}`).innerHTML = participantes[i].nome;
        document.getElementById(`podioTempo${i+1}`).innerHTML = `${participantes[i].minutos}:${participantes[i].segundos}`;
    }

    // ATUALIZANDO RANKING
    for(let i=0; i<participantes.length && i<10; i++){
        document.getElementById(`nome${i+1}`).innerHTML = participantes[i].nome;
        document.getElementById(`telefone${i+1}`).innerHTML = participantes[i].telefone;
        document.getElementById(`email${i+1}`).innerHTML = participantes[i].email;
        document.getElementById(`tempo${i+1}`).innerHTML = `${participantes[i].minutos}:${participantes[i].segundos}`;
    }

}).catch(function (err) {   
    console.warn('Algo deu errado!' , err);
});

atualizar_pagina = setInterval( () => {
    location.reload();
},30000)