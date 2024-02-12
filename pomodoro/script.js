// variables
let progressBar = document.querySelector(".circular-progress");
let valueContainer = document.querySelector(".value-container");

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let progressValue = 0;

let workTime = 2;
let breakTime = 1;

let seconds = "00"

// display
window.onload = () => {
    workTittle.classList.add('active');

    // Set progress bar to 100% at the beginning
    valueContainer.textContent = `${workTime}:${seconds}`;
    progressBar.style.background = `conic-gradient(
        #ba4949 0deg,
        #ee7276 0deg
    )`;
}

// start timer
function start() {
    // change button
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // change the time
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    let totalTime = workTime;
    let minutes = workMinutes;

    breakCount = 0;

    // countdown
    let timerFunction = () => {

        // Update progress bar
        progressValue = 100 - ((minutes * 60 + seconds) / (totalTime * 60) * 100);
        valueContainer.textContent = `${formatNumber(minutes)}:${formatNumber(seconds)}`;
        progressBar.style.background = `conic-gradient(
            #ba4949 ${progressValue * 3.6}deg,
            #ee7276 ${progressValue * 3.6}deg
        )`;
    
        // start
        seconds = seconds - 1;
    
        if(seconds === 0) {
            minutes = minutes - 1;
            if(minutes === -1 ){
                if(breakCount % 2 === 0) {
                    // start break
                    totalTime = breakTime;
                    minutes = breakMinutes;
                    breakCount++
    
                    // change the painel
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {
                    // continue work
                    totalTime = workTime;
                    minutes = workMinutes;
                    breakCount++
    
                    // change the painel
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }

    // start countdown
    setInterval(timerFunction, 1000); // 1000 = 1s
}

function formatNumber(num) {
    return num < 10 ? "0" + num : num;
}