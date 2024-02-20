const html = document.querySelector('html'),
    focoBt = document.querySelector('.app__card-button--foco'),
    curtoBt = document.querySelector('.app__card-button--curto'),
    longoBt = document.querySelector('.app__card-button--longo'),
    banner = document.querySelector('.app__image'),
    titulo = document.querySelector('.app__title'),
    botoes = document.querySelectorAll('.app__card-button'),
    musicaFocoInput = document.querySelector("#alternar-musica"),
    startPauseBt = document.querySelector('#start-pause'),
    iniciarOuPausarBt = document.querySelector('#start-pause span'),
    imgPauseStart = document.querySelector('.app__card-primary-button-icon'),
    tempoNaTela = document.querySelector('#timer'),
    
    musica = new Audio('/sons/luna-rise-part-one.mp3'),
    audioPause = new Audio ('/sons/pause.mp3'),
    audioPlay = new Audio ('/sons/play.wav'),
    audioTempoFinalizado = new Audio('./sons/beep.mp3')
    musica.loop = true

    let tempoDecorridoEmSegundos = 1500
    

musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
})



focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})
    

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
                titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
                titulo.innerHTML =`Qua tal dar uma respirada,<br>
                <strong class="app__title-strong">faça uma pausa curta.</strong>`

            break;
        case "descanso-longo":
                titulo.innerHTML = `Hora de voltar a superfície,<br>
                <strong class="app__title-strong">faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -=1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

let intervaloId = null

function iniciarOuPausar(){
    if(intervaloId){
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    imgPauseStart.setAttribute('src', './imagens/pause.png')
    
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'
    imgPauseStart.setAttribute('src', './imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()



