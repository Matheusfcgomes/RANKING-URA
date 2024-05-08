// CARREGANDO NOVAS PAGES

const ranking_button = document.getElementById('ranking-button');
ranking_button.addEventListener('click', () => {
    window.location.href = 'ranking.html';
})

// CRONÔMETRO

const segundos_text = document.getElementById('segundos');
const minutos_text = document.getElementById('minutos');
var segundos = 0;
var minutos = 0;
total_time = 0
var timer_state = "parado";

const iniciar_button = document.getElementById('timerStartStop-button');
iniciar_button.addEventListener('click', () => {
    if (timer_state == "parado"){
        timer_state = "contando";
        iniciar_button.innerHTML = "PAUSAR";
        cronometrar = setInterval( () => {
            total_time++;
            segundos = segundos_updater(segundos);
            minutos = minutos_updater(total_time);
            segundos_text.innerHTML = segundos;
            minutos_text.innerHTML = minutos;
        },1000)
    }
    else {
        timer_state = "parado";
        iniciar_button.innerHTML = "INICIAR";
        clearInterval(cronometrar);
    }
})

function segundos_updater(segundos) {
    segundos++;
    if(segundos > 59){
        segundos = 0;
    }
    if(segundos < 10){
        segundos = '0' + segundos;
    }
    return segundos;
}

function minutos_updater(total_time) {
    minutos = Math.floor(total_time/60);
    if(minutos < 10){
        minutos = '0' + minutos;
    }
    return minutos;
}

const zerar_button = document.getElementById('timerReset-button');
zerar_button.addEventListener('click', () => {
    segundos = 0;
    minutos = 0;
    total_time = 0;
    segundos_text.innerHTML = '0' + segundos;
    minutos_text.innerHTML = '0' + segundos;
})

// ENVIANDO INFORMAÇÕES DO JOGADOR

const cadastrar_button = document.getElementById('cadastro-button');
cadastrar_button.addEventListener('click', () => {
    
    // VERIFICA SE OS DADOS NÃO ESTÃO VAZIOS
    if(
        document.getElementById('participante').value.length > 0 &&
        document.getElementById('email').value.length > 0 &&
        document.getElementById('telefone').value.length > 0 &&
        total_time > 0
    )
    {
        minutos = Number(minutos);
        segundos = Number(segundos);
    
        const dados = {
            nome: document.getElementById('participante').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            tempo_total: total_time,
            minutos: minutos,
            segundos: segundos
        };

        fetch('http://localhost:3000/ranking', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dados)
        })
        location.reload();
    }

    // AUSENCIA DE DADOS
    if(
        document.getElementById('participante').value.length == 0 ||
        document.getElementById('email').value.length == 0 ||
        document.getElementById('telefone').value.length == 0
    )
    {
        alert("Por favor preencha os dados do participante!");
    }

    if(total_time == 0){
        alert("Por favor inicie a cronometragem!");
    }
})

// ATUALIZANDO RECORDE
fetch('http://localhost:3000/ranking').then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {

    const participantes = data.map(participante => ({
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

    const recorde_show = document.getElementById('recorde');
    recorde_show.innerHTML = participantes[0].minutos + ':' + participantes[0].segundos;

}).catch(function (err) {   
    console.warn('Algo deu errado!' , err);
});
