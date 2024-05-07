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

// SALVAR CREDENCIAIS DO JOGADOR

var nome;
var email;
var telefone;

const cadastrar_button = document.getElementById('cadastro-button');
cadastrar_button.addEventListener('click', () => {
    nome = document.getElementById('participante').value;
    email = document.getElementById('email').value;
    telefone = document.getElementById('telefone').value;
    document.getElementById('current-player').innerHTML = nome;
})

// ENVIANDO PARA O DATABASE

const enviar_button = document.getElementById('timerSend-button');
enviar_button.addEventListener('click', () => {
    const dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        tempo_total: total_time,
        minutos: minutos,
        segundos: segundos
    };

    console.log(dados);
})