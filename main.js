// CARREGANDO NOVAS PAGES (use o mesmo ID para os botões das outras páginas para reaproveitar esse trecho)
const novoJogador_button = document.getElementById('newPlayer-button')
novoJogador_button.addEventListener('click', function() {
    window.location.href = 'cadastro.html';
})

const ranking_button = document.getElementById('ranking-button')
ranking_button.addEventListener('click', function() {
    window.location.href = 'ranking.html';
})