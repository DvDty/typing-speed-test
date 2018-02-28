let timeStarted = false;
let time = 59;
let timer_dom = document.getElementById("timer");
let words_dom = document.getElementById("words");
let typing_box_dom = document.getElementById("typing_box");
let current_word = '';
let current_word_dom = '';
let wpm_dom = document.getElementById("wpm");
let accuracy_dom = document.getElementById("accuracy");
let points_dom = document.getElementById("points");
let mistyped_dom = document.getElementById("mistyped");
let right_words = 0;
let points = 0;
let wrong_words = 0;
let accuracy = 0;
let wpm = 0;
let mistyped = [];

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
	console.log(time);
	if (time === 0) {
		return;
	}

	if (e.keyCode === 32) {
		current_word_dom = document.getElementsByClassName("current_word")[0];
		current_word = current_word_dom.innerText;

		if (typing_box_dom.value.trim().length <= 2) {
			return;
		}

		if (typing_box_dom.value.trim() === current_word) {
			right_words++;
		} else {
			wrong_words++;
			mistyped.push(current_word);
		}

		typing_box_dom.value = '';
		current_word_dom.remove();
		document.getElementsByClassName("word")[0].className += " current_word";
		words_dom.innerHTML += '<span class="word">' + getRandomWord() + '</span> ';
		wpm = Math.round((right_words + wrong_words) / (60 - time) * 60);
		accuracy = Math.round(right_words / (right_words + wrong_words) * 100);
		wpm_dom.innerHTML = Number(wpm);
		accuracy_dom.innerHTML = Number(accuracy);

		if (accuracy === 100) {
			points = wpm * 135;
		} else if (accuracy < 100 && accuracy >= 95) {
			points = wpm * 95;
		} else if (accuracy < 95 && accuracy >= 80) {
			points = wpm * 70;
		} else if (accuracy < 80 && accuracy >= 60) {
			points = wpm * 50;
		} else if (accuracy < 60 && accuracy >= 50) {
			points = wpm * 40;
		} else if (accuracy < 50 && accuracy >= 20) {
			points = wpm * 20;
		} else {
			points = accuracy;
		}
	}
};

function timer() {
	let x = setInterval(_ => {
		if (time > 0) {
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
	points_dom.innerHTML = "<h4>You got " + points + " points.</h4>";
	let connector = mistyped <= 1 ? " is " : " are ";
	mistyped_dom.innerHTML = mistyped.length > 0 ? "<h4>Your mistyped words " + connector + ": </h4><br>" + mistyped.join(", ") : '';
}

initApp();