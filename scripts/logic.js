let timeStarted = false;
let time = 5;
let timer_dom = document.getElementById("timer");
let words_dom = document.getElementById("words");
let typing_box_dom = document.getElementById("typing_box");
let wpm_dom = document.getElementById("wpm");

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function initApp() {
    setWords();
    timer_dom.innerHTML = time;
}

function setWords(count = 10) {
    let setter = '<span class="word current-word">' + getRandomWord() + '</span> ';

    for (let i = 0; i < count - 1; i++) {
        setter += '<span class="word">' + getRandomWord() + '</span> ';
    }

    words_dom.innerHTML = setter;
}

function startTimer() {
    if (!timeStarted) {
        timer();
        timeStarted = true;
    }
}

function timer() {
    setInterval(_ => {
        if (time > 1) {
            timer_dom.innerHTML = --time;
        } else {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    timer_dom.innerHTML = 0;
    typing_box_dom.disabled = "disabled";
}

initApp();