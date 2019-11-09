const steps = {
    pomo: {length: 25},
    shortBreak: {length: 5},
    longBreak: {length: 15}
}

let time;
let pomos = 0;
let step = steps.pomo;

let timeEl = document.getElementById("time");
let infoEl = document.getElementById("info");

let startTimer = _ => {
    // Update time
    time = step.length;
    // Animation
    if(step == steps.pomo){
        document.getElementsByTagName("main")[0].className = "pulse";
    }else{
        document.getElementsByTagName("main")[0].className = "";
    }
    // Run timer
    tickTimer();
}

let getInfo = _ => {
    if(step == steps.pomo){
        document.title = time + " min study";
        return "start!";
    } 
    if(step == steps.shortBreak){
        document.title = time + " min break";
        return `take a short break...`;
    }
    if(step == steps.longBreak){
        document.title = time + " min break";
        return "take a long break...";
    }
}

let tickTimer = _ => {
    // Update info
    infoEl.innerHTML = getInfo();
    timeEl.innerHTML = time;
    time--;

    setTimeout(_ => {

        if(time < 0){
            // Beep
            let beep = new Audio("notify.ogg");
            beep.play();

            // Determine next timer
            if(step == steps.shortBreak){ 
                step = steps.pomo; 
                pomos++; 
            } 
            else if(step == steps.longBreak) { 
                step = steps.pomo; 
                pomos = 0; 
            } 
            else if(step == steps.pomo){
                if(pomos >= 3){
                    step = steps.longBreak;
                    pomos = 0;
                }else{
                    step = steps.shortBreak;
                }
            }
            startTimer();
        }else{
            tickTimer();
        }
    }, 60*1000);
}

let start = _ => {
    document.getElementById("hand").classList.add("rotate");
    startTimer();
    window.removeEventListener("click", start);
}

window.addEventListener("click", start);