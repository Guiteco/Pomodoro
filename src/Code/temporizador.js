const timerInput = document.querySelectorAll(".timer__Input");
const titlePagina = document.querySelector(".title-pagina");
for(let i of timerInput){
    i.addEventListener("change",()=>{
        verificaTempoAtivo();
        pausar();
    })
}



let interval
let tempoSegundos
let minutos
let segundos
let tempoSelecionado;

function verificaTempoAtivo(){
    for(let i of btns){
        if(i.classList.contains('active')){
            tempoSelecionado = tempos[i.classList[1]]
            tempoSegundos = (tempoSelecionado *60) 
    }
}
atualizarTempo();
}

function atualizarTempo(){
    displayTimer.innerHTML = `${formatarHora(tempoSegundos)}`
    atualizaTitle(tempoSegundos);
}

function formatarHora(tempo){
    minutos = Math.floor(tempo/ 60)
    segundos = tempo % 60;
    return (minutos < 10 ? 0: '') + minutos + ":" + (segundos < 10 ? 0 :"") + segundos
}

let tempoPassado = 0;

verificaTempoAtivo();

function decrementarTempo(){
    if(tempoSegundos == 0){
        pausar();
        const evento = new CustomEvent('tempoFinalizado')
        document.dispatchEvent(evento) 
        return;
    }
        tempoSegundos--;
        tempoPassado++;
        atualizarTempo();
}
function start(){
    interval = setInterval(decrementarTempo,1000)
}  
function pausar(){
    
    if(startPause.innerHTML == 'Pause'){
    startPause.dispatchEvent(new Event("click"))
    
}
}

function atualizaTitle (tempo){
    let possui
  for(let i of btns){
    if(i.classList.contains("active")){
        possui = i
    }
  }
  if(possui.classList.contains("pomodoro")){
    return titlePagina.innerHTML = `${formatarHora(tempo)} | time to focus`
  }
  return titlePagina.innerHTML = `${formatarHora(tempo)} | time to break`
}
atualizaTitle (tempoSegundos);

let historico = {};
let ultimoValor = 0;

function historicoTempos(){
        if(  historico[tagSelecionada.classList[1]] == null){
        historico[tagSelecionada.classList[1]] = 0;
    }
    historico[tagSelecionada.classList[1]] +=tempoPassado;

    valoreNaExibicaoDoHistorico(historico)
    localStorage.setItem("historico",JSON.stringify(historico))

}

function valoreNaExibicaoDoHistorico(historico){

    historicoPomodro.innerHTML = formatarHora(historico.pomodoro);
    historicoShort.innerHTML = formatarHora(historico.shortBreak);
    historicoLong.innerHTML = formatarHora(historico.longBreak);
}

if(JSON.parse(localStorage.getItem("historico"))){
    
     historico = JSON.parse(localStorage.getItem("historico"))
     valoreNaExibicaoDoHistorico(historico)
}else{
    
     valoreNaExibicaoDoHistorico(historico)
}






