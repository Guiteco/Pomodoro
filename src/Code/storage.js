let tempos ={}
if(JSON.parse(localStorage.getItem("tempo"))){
    tempos = JSON.parse(localStorage.getItem("tempo"));
    timePomodoro.value = tempos.pomodoro
    timeShortBreak.value = tempos.shortBreak;
    timeLongBreak.value =  tempos.longBreak;
   
    
}else{
    tempos = {}
    timer();
}
function timer(){
    tempos.pomodoro = timePomodoro.value;
    tempos.shortBreak = timeShortBreak.value;
    tempos.longBreak = timeLongBreak.value;
    localStorage.setItem("tempo",JSON.stringify(tempos));
    
}
function alterarBackground(){
    let imagem = optionTheme.value
    body.style.backgroundImage =`url(./src/img/${imagem}.jpg)`;
    localStorage.setItem("fundo",imagem)
}

function trocaAudio(){
    let toque = optionAudio.value 
    audio = new Audio(`./src/sounds/${toque}.mp3`);
    localStorage.setItem('audio',toque);
}

function volumeAudio(){
    let volumetoque= Number(controleVolume.value);
    audio.volume = Number(controleVolume.value);
    localStorage.setItem('volume',volumetoque);
}



if(localStorage.getItem("audio")){
    optionAudio.value =  localStorage.getItem("audio")
    trocaAudio();

}else{
    trocaAudio();
}

if(localStorage.getItem('volume')){
    controleVolume.value = localStorage.getItem('volume')
    volumeAudio();
}else{
    volumeAudio();
}

if(localStorage.getItem("fundo")){
    optionTheme.value = localStorage.getItem("fundo");
    alterarBackground();
}else{
    alterarBackground();
}







