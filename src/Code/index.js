const displayTimer = document.querySelector('.timer')
const pomodoro = document.querySelector('.pomodoro')
const shortBreak = document.querySelector('.shortBreak')
const longBreak = document.querySelector('.longBreak')
const btns = document.querySelectorAll('.button__iten')
const startPause = document.querySelector('.startPause')
const refresh = document.querySelector('.refresh')
const btnCloseConfig = document.querySelector('.close__Config')
const btnOpenConfig = document.querySelector('.config__btn')
const configDisplay = document.querySelectorAll(".config__Display");
const btnsConfigNav = document.querySelectorAll(".btn__Config")
const btnConfigGeral = document.querySelector(".config__Geral");
const btnConfigTimer = document.querySelector(".config__Timer");
const btnConfigSound = document.querySelector(".config__Sound");
const btnConfigHistorico = document.querySelector(".historico")
const configGeralItem = document.querySelector(".config__Geral__Iten")
const configTimerItem = document.querySelector(".config__Timer__Iten")
const configSoundIten = document.querySelector(".config__Sound__iten");
const config_HistoricoItem = document.querySelector(".config_Historico");
const historicoPomodro = document.querySelector(".pomodoroHistorico")
const historicoShort = document.querySelector(".shortBreakHistorico")
const historicoLong = document.querySelector(".longBreakhistorico")
const optionTheme = document.querySelector("#opTheme");
const body = document.querySelector(".alterarTema");
const timePomodoro = document.querySelector("#Timer__pomodoro");
const timeShortBreak = document.querySelector("#timer__ShortBreak");
const timeLongBreak = document.querySelector("#Timer__LongBreak");
const btnLimparHistorico = document.querySelector(".btnLimpaHistorico")
let tagSelecionada = pomodoro;
//audio
const optionAudio = document.querySelector("#opSound");
let audioSelecionado;
let audio;

const controleVolume = document.querySelector("#volume-controle");


//Essa função vou ultilizar para remover as seleção de display ou ativo dos buttons com passada de parametro
function removeSelecao(btns,classe){
btns.forEach(e => {
    e.classList.remove(classe)
});
} 

//Adiciona uma classe em um elemento
function adicionarClasse(elemento,classe){
    elemento.classList.add(classe)
}
function vereficarClassNone(){
    for(let n of configDisplay){
        if(!n.classList.contains("none")){
            n.classList.add("none")
        }
}
}
//audio


function tocarAudio(){
audio.play();
}

//Animação de giro do refresh
let angle = 0
let animationID = ''

function rotate(){
    angle += 1
    refresh.style.transform = 'rotate('+ angle+'deg)';
    animationID = requestAnimationFrame(rotate)
    if(angle == 360){
        cancelAnimationFrame(animationID)
        angle = 0
    }
       
    
}
document.addEventListener("tempoFinalizado",()=>{
    tocarAudio();
    historicoTempos();
})
function verificaTempo(tempo){
    if(tempo<= 0){
        btnCloseConfig.disabled = true
        return false;
    }else{
        btnCloseConfig.disabled = false
        return true;
    }
}

pomodoro.addEventListener('click',(e)=>{
    removeSelecao(btns,'active');
    adicionarClasse(pomodoro,'active');
    verificaTempoAtivo()
    pausar();
    atualizaTitle (tempoSegundos);
    tagSelecionada = pomodoro;
})

shortBreak.addEventListener('click',()=>{
    removeSelecao(btns,'active');
    adicionarClasse(shortBreak,'active')
    verificaTempoAtivo()
    pausar();
    atualizaTitle (tempoSegundos);
    tagSelecionada = shortBreak;
})

longBreak.addEventListener('click',()=>{
    removeSelecao(btns,'active');
    adicionarClasse(longBreak,'active')
    verificaTempoAtivo()
    pausar();
    atualizaTitle (tempoSegundos);
   tagSelecionada = longBreak
})

startPause.addEventListener('click',()=>{
    historicoTempos();
    new Audio("./src/sounds/pause-start.mp3").play();
    if(startPause.innerHTML == 'Start'){
        start();
        startPause.innerHTML = 'Pause'
    }else{
        clearInterval(interval);
        startPause.innerHTML = 'Start'
    }
    tempoPassado = 0;
})

refresh.addEventListener('click',()=>{
    rotate();
    pausar();
    verificaTempoAtivo();

})

btnCloseConfig.addEventListener('click',()=>{
    document.querySelector('.container__Geral-Config').classList.add('none')
})

btnOpenConfig.addEventListener('click',()=>{
    document.querySelector('.container__Geral-Config').classList.remove('none')
})


btnConfigGeral.addEventListener("click",()=>{
    removeSelecao(btnsConfigNav,"select");
    adicionarClasse(btnConfigGeral,'select')
    vereficarClassNone()
    configGeralItem.classList.remove("none")
})
btnConfigTimer.addEventListener("click",()=>{
    removeSelecao(btnsConfigNav,"select");
    adicionarClasse(btnConfigTimer,'select')
    vereficarClassNone()
    configTimerItem.classList.remove("none")
    
})
btnConfigSound.addEventListener("click",()=>{
    removeSelecao(btnsConfigNav,"select");
    adicionarClasse(btnConfigSound,'select');
    vereficarClassNone()
    configSoundIten.classList.remove("none")
})

btnConfigHistorico.addEventListener("click",()=>{
    removeSelecao(btnsConfigNav,"select");
    adicionarClasse(btnConfigHistorico,'select');
    vereficarClassNone()
    config_HistoricoItem.classList.remove("none")
    
})
optionTheme.addEventListener("change",()=>{
    alterarBackground();
})

optionAudio.addEventListener("change",()=>{
    trocaAudio();
})

controleVolume.addEventListener("change",()=>{
    volumeAudio();
})

timePomodoro.addEventListener("change",(e)=>{
    
    if(verificaTempo(timePomodoro.value)){
        timer();
    }
})
timeShortBreak.addEventListener("change",()=>{
    if(verificaTempo(timeShortBreak.value)){
        timer();
    }
})
timeLongBreak.addEventListener("change",()=>{
    if(verificaTempo(timeLongBreak.value)){
        timer();
    }
})

btnLimparHistorico.addEventListener("click",()=>{
    historico = {pomodoro:0,shortBreak:0,longBreak:0};
    historicoTempos();
})