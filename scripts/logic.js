let timeStarted = false;
let time = 59;
let timer_dom = document.getElementById("timer");
let words_dom = document.getElementById("words");
let typing_box_dom = document.getElementById("typing_box");
let current_word = '';
let current_word_dom = '';
let wpm_dom = document.getElementById("wpm");
let right_words = 0;
let wrong_words = 0;

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function initApp() {
    setWords();
    timer_dom.innerHTML = time;
}

function setWords(count = 10) {
    let setter = '<span class="word current_word">' + getRandomWord() + '</span> ';

    for (let i = 0; i < count - 1; i++) {
        setter += '<span class="word">' + getRandomWord() + '</span> ';
    }

    words_dom.innerHTML = setter;
}

function tick() {
    if (!timeStarted) {
        timer();
        timeStarted = true;
    }
}

document.body.onkeydown = e => {
    if (e.keyCode === 32) {
        current_word_dom = document.getElementsByClassName("current_word")[0];
        current_word = current_word_dom.innerText;

        if (typing_box_dom.value.trim() === current_word) {
            right_words++;
        } else {
            wrong_words++;
        }

        typing_box_dom.value = '';
        current_word_dom.remove();
        document.getElementsByClassName("word")[0].className += " current_word";
        words_dom.innerHTML += '<span class="word">' + getRandomWord() + '</span> ';
    }
};

function timer() {
    let x = setInterval(_ => {
        if (time > 1) {
            timer_dom.innerHTML = --time;
        } else {
            clearInterval(x);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    timer_dom.innerHTML = 0;
    typing_box_dom.disabled = "disabled";
    console.log("right words: " + right_words);
    console.log("wrong words: " + wrong_words);
}

initApp();