let MOUSEDOWN = false;
let selectedLetters = [];
let validWords = [];
let validWordsClone = validWords;
let points;
let wordStarted = false;
let foundWords = 0;
let currentWord = '';
// track x and y in an svg
let pt = new DOMPoint();
let cx,cy;

// Set up game
async function gameSetup(word) {
	// Clear out stuff
	resetSelection();
	validWords = [];
	validWordsClone = [];
	foundWords = 0;
	currentWord = '';

	// Clear all buttons from menuInner
	const menuInner = document.querySelector(".menuInner");
	while (menuInner.firstChild) {
		menuInner.removeChild(menuInner.firstChild);
	}

	document.querySelector(".foundWords").textContent = "0";
	document.querySelector(".totalWords").textContent = '';

	// Get anagrams for new word
	await getAnagrams(word).then((results) => {
		word = results[0];
		let anagrams = results[1];
		validWords = anagrams.all
			.map((word) => word.toUpperCase()) // Capitalize strings
			.filter((word) => word.length > 2); // Remove 1&2-letter words

		validWordsClone = [...validWords];

		if (validWords.length < 7) {
			gameSetup(randomGameName());
			return;
		}
		// Make buttons for each word
		validWords.forEach((word) => {
			const button = document.createElement("button");
			const span = document.createElement("span");
			const spanCover = document.createElement("span");
			let uniqueBtnClass = getUUID();
			button.classList.add("reveal");
			button.classList.add(`btn${uniqueBtnClass}`);
			span.classList.add("noTouch");
			span.textContent = word;
			spanCover.classList.add("blurry");

			// Set the button's text content
			button.appendChild(span);
			button.appendChild(spanCover);
			button.setAttribute("data-word", word);
			button.title = 
			`${word.length}-letter word. Click to reveal!
(Cost: ${word.length + 1} coins)`;
			button.setAttribute('data-hint-given', 'false');

			button.addEventListener('click', () => {
				if (button.getAttribute('data-hint-given') === 'false') {
					button.classList.add('paidInFull');
					button.title = 
			`${word.length}-letter word. Click to reveal!
(Purchased!)`;
					
					addCoins('.awards', `.btn${uniqueBtnClass}`, word.length + 1, undefined, 0);
					let totalCoinsEarned = parseInt(localStorage.getItem('coinsEarnedWordscapes')) || 0;
					localStorage.setItem('coinsEarnedWordscapes', totalCoinsEarned - word.length + 1);
					document.querySelector(".awardCounter").textContent = totalCoinsEarned;
					button.setAttribute('data-hint-given', 'true');
				}
			});
			menuInner.appendChild(button);
		});

		document.querySelector(".totalWords").textContent = validWords.length;
		points = drawCirclePoints(word, 27, { x: 50, y: 50 });
	});
}

window.addEventListener("mousedown", () => (MOUSEDOWN = true));
window.addEventListener("mouseup", () => {
	MOUSEDOWN = false;
	if (wordStarted) completeWord();
});
window.addEventListener("touchstart", () => (MOUSEDOWN = true));
window.addEventListener("touchend", () => {
	MOUSEDOWN = false;
	if (wordStarted) completeWord();
});

document.querySelector(".shuffle").addEventListener("click", () => randomize(points));

function getUUID() {
	let d = new Date().getTime();
	let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			let r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
		}
	);
	return uuid;
};
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function drawCirclePoints(word, radius, center) {
	document.querySelector("#gameArea").innerHTML = "";
	let pts = word.length;
	let slice = (2 * Math.PI) / pts;
	let pointsArray = [];

	for (let i = 0; i < pts; i++) {
		let angle = slice * i;
		let newX = (center.x + radius * Math.cos(angle)).toFixed(3);
		let newY = (center.y + radius * Math.sin(angle)).toFixed(3);
		let p = { x: newX * 1, y: newY * 1 };
		pointsArray.push([p]);

		document.querySelector("#gameArea").innerHTML += `<g class="letter" data-letter="${word[i].toUpperCase()}" data-letter-id="${word[i].toUpperCase()}${getUUID()}" transform="translate(${newX * 1}, ${newY * 1})">
            <circle class="letterCircle" cx="0" cy="0" r="11" fill="rgba(255,255,255,0.5)" />
            <text class="letterText" x="0" y="2" font-size="16" text-anchor="middle" dominant-baseline="middle">${word[i].toUpperCase()}</text>
        </g>`;
	}

	addLetterEventListeners();
	return pointsArray;
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function randomize(arr) {
	arr = shuffleArray(arr);
	let letters = document.querySelectorAll(".letter");
	let lettersC = document.querySelectorAll(".letterCircle");
	for (let i = arr.length - 1; i > -1; i--) {
		//lettersC[i].setAttribute('cx', arr[i][0]["x"]);
		//lettersC[i].setAttribute('cy', arr[i][0]["y"]);

		letters[i].setAttribute(
			"transform",
			`translate(${arr[i][0]["x"]}, ${arr[i][0]["y"]})`
		);
	}
	addLetterEventListeners();
}

function addLetterEventListeners() {
	let allLetters = document.querySelectorAll(".letter");

	allLetters.forEach((letter) => {
		letter.addEventListener("mousedown", (event) => {
			event.preventDefault();
			selectLetter(letter);
			startDrawingPath(letter);
		});

		letter.addEventListener("mouseover", (event) => {
			event.preventDefault();
			if (MOUSEDOWN) {
				selectLetter(letter);
				updatePath(letter);
			}
		});

		letter.addEventListener("touchstart", (event) => {
			event.preventDefault();
			selectLetter(letter);
			startDrawingPath(letter);
		});

		letter.addEventListener("touchmove", (event) => {
			event.preventDefault();
			if (MOUSEDOWN) {
				handleTouchMove(event, true);
			}
		});
	});

	document.querySelector("#wordscapesGame").addEventListener("mousemove", (e) => {
		if (MOUSEDOWN) {
			updatePath(null, e);
		}
	});

	document.querySelector("#wordscapesGame").addEventListener("touchmove", (e) => {
		if (MOUSEDOWN) {
			handleTouchMove(e);
		}
	});
}

function handleTouchMove(event, pathOnly) {
	let touch = event.touches[0];
	let element = document.elementFromPoint(touch.clientX, touch.clientY);
	if (!pathOnly) {
		if (element && element.closest('.letter')) {
			let letter = element.closest('.letter');
			selectLetter(letter);
			updatePath(letter);
		}
	} else {
		updatePath(null, event);
	}
}

function selectLetter(letter) {
	letter.querySelector(".letterCircle").classList.add("selected");
	let letterID = letter.getAttribute("data-letter-id");
	let letterText = letter.getAttribute("data-letter");
	if (!selectedLetters.includes(letterID)) {
		selectedLetters.push(letterID);
		currentWord += letterText;
		document.querySelector(".currentWord").innerText = currentWord;
	}
}

function startDrawingPath(letter) {
	wordStarted = true;
	let transform = letter.getAttribute("transform");
	let [startX, startY] = extractCoordinates(transform);
	document.querySelector(".connector").setAttribute("d", `M ${startX} ${startY}`);
	document.querySelector(".connectedLetters").setAttribute("d", `M ${startX} ${startY}`);
}

function updatePath(letter, event) {
	let connector = document.querySelector(".connector");
	let connectedLetters = document.querySelector(".connectedLetters");
	let path = connector.getAttribute("d");
	let connectorPath = connectedLetters.getAttribute("d");
	if (letter) {
		let transform = letter.getAttribute("transform");
		let [endX, endY] = extractCoordinates(transform);
		path += ` L ${endX} ${endY}`;
		connectorPath += ` L ${endX} ${endY}`;
		connectedLetters.setAttribute("d", connectorPath);
		connector.setAttribute("d", `M ${endX} ${endY}`);
	} else if (event) {
		let { x, y } = cursorPoint(event);
		path = path.split("L")[0] + ` L ${(cx * 1).toFixed(3)} ${(cy * 1).toFixed(3)}`;
		connector.setAttribute("d", path);
	}
}

async function getAnagrams(word) {
	const url = `http://www.anagramica.com/all/:${word}`;
	try {
		const proxyUrl = "https://api.allorigins.win/raw?url=" + url;
		const response = await fetch(proxyUrl);
		if (!response.ok) throw new Error("Failed to fetch");
		const json = await response.json();
		return [word, json];
	} catch (error) {
		console.error(error.message);
		word = "GREETA";
		return [word, {
			all: [
				"AGREE", "EAGER", "EATER", "GRATE", "GREAT", "GEAR", "RAGE", "GATE", "RATE", "TARE", "TEAR", "EGRET", "GREET", "TREE", "AGE", "ARE", "EAR", "ERA", "ATE", "EAT", "ETA", "TEA", "ART", "RAT", "TAR", "GET"
			]
		}]
	}
}

function randomGameName() {
	const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
	const vowels = ['A', 'E', 'I', 'O', 'U'];
	return `${vowels[randInt(0, vowels.length - 1)]}${consonants[randInt(0, consonants.length - 1)]}${vowels[randInt(0, vowels.length - 1)]}${consonants[randInt(0, consonants.length - 1)]}${vowels[randInt(0, vowels.length - 1)]}${consonants[randInt(0, consonants.length - 1)]}`;
}

function completeWord() {
	if (validWords.includes(currentWord)) {
		document.querySelector(".circleShadow").setAttribute("fill", "#fff");
		document.querySelector(".circleShadow").setAttribute("r", 45);
		setTimeout(() => {
			document.querySelector(".circleShadow").setAttribute("r", 38);
		}, 500);
		document.querySelector(".circleBG").setAttribute("r", 44);
		setTimeout(() => {
			document.querySelector(".circleBG").setAttribute("r", 40);
		}, 200);
		validWords = validWords.filter((word) => word !== currentWord);
		validWordsClone = validWords;
		foundWords++;
		document.querySelector(".foundWords").innerText = foundWords;
		const wordBtn = document.querySelector(`[data-word='${currentWord}']`);
		wordBtn.classList.add("strike");
		wordBtn.querySelector('.blurry').classList.remove("blurry");
		wordBtn.setAttribute('data-hint-given', 'true');
		wordBtn.title = "Word found!";
		addCoins('.coinSource', '.awards', currentWord.length);
		confetti(document.querySelector(".circleBG"), {
			type: [currentWord],
			spread: 300,
			flakes: 10,
			speed: 5000,
			spin: false,
			fadeout: true,
			drop: 500,
			angleEmoji: 180,
			angle: 180,
			scale: 0.8
		});
		
		// Update local storage when a coin is earned
		let coinsEarned = parseInt(localStorage.getItem('coinsEarnedWordscapes')) || 0;
		localStorage.setItem('coinsEarnedWordscapes', coinsEarned + currentWord.length);
		document.querySelector(".awardCounter").textContent = coinsEarned;
		if (validWords.length == 0) {
			// Update local storage when all words are found
			let currentLevel = parseInt(localStorage.getItem('completedWordscapesLevels')) || 1;
			addCoins('.coinSource', '.awards', currentLevel, '#fff');
			// addCoins('.coinSource', '.awards', currentLevel, '#E5E4E2');
			// Update local storage when a level coin is earned
			let totalCoinsEarned = parseInt(localStorage.getItem('coinsEarnedWordscapes')) || 0;
			localStorage.setItem('coinsEarnedWordscapes', totalCoinsEarned + currentLevel);
			// Update local storage when level is complete
			localStorage.setItem('completedWordscapesLevels', currentLevel + 1);

			// Display the updated level number
			document.querySelector(".level").textContent = currentLevel + 1;
			confetti(document.querySelector(".circleBG"), {
				spread: 500,
				flakes: 300,
				delay: 150,
				speed: 8000,
				drop: 800
			});
			gameSetup(randomGameName());
		}
	} else {
		document.querySelector(".circleShadow").setAttribute("fill", "#000");
		document.querySelector(".circleShadow").setAttribute("r", 39.5);
		document.querySelector(".circleBG").setAttribute("r", 38);
		setTimeout(() => {
			document.querySelector(".circleBG").setAttribute("r", 40);
		}, 200);
	}
	resetSelection();
}

function resetSelection() {
	document.querySelectorAll(".letterCircle").forEach((circle) => circle.classList.remove("selected"));
	selectedLetters = [];
	currentWord = "";
	document.querySelector(".connector").setAttribute("d", "");
	document.querySelector(".connectedLetters").setAttribute("d", "");
	document.querySelector(".currentWord").textContent = "";
	wordStarted = false;
}

function extractCoordinates(transform) {
	let regex = /[0-9\.]+/g;
	let [x, y] = transform.match(regex).map(Number);
	return [x, y];
}

function cursorPoint(e) {
	let svg = document.querySelector("#wordscapesGame");
	let event = e;
	// Check if the event is a touch event
	if (e.touches && e.touches.length > 0) {
		event = e.touches[0]; // Use the first touch point
	} else if (e.changedTouches && e.changedTouches.length > 0) {
		event = e.changedTouches[0]; // Use the first touch point in changedTouches
	}

	if (event && (event.pageX || event.pageY)) {
		pt.x = event.pageX;
		pt.y = event.pageY;
	} else if (event && (event.clientX || event.clientY)) {
		pt.x = event.clientX;
		pt.y = event.clientY;
	}

	let svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
	cx = svgPoint.x;
	cy = svgPoint.y;
	return { x: svgPoint.x, y: svgPoint.y };
}

function randomGame() {
	gameSetup(randomGameName());
}

let counter = 0;

function getOffset(el) {
	let _x = 0, _y = 0;
	while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
};

function removeElementsByClass(className) {
	const elements = document.getElementsByClassName(className);
	while (elements.length > 0) {
		elements[0].parentNode.removeChild(elements[0]);
	}
};

function moveToDest(elem, destinationElement, topOffset=0, leftOffset=0) {
	const el = document.querySelector(`.${elem}`);
	const destEl = document.querySelector(destinationElement);

	if (el && destEl) {
		const { left: destX, top: destY } = getOffset(destEl);
		el.style.top = `${destY + destEl.offsetHeight / 2 + topOffset}px`;
		el.style.left = `${destX + destEl.offsetWidth / 2 + leftOffset}px`;
	}
};

function addCoins(originElement, destinationElement, totalCoins, coinColor="rgb(229, 249, 141)", topOffset=-6) {
	const newClassArray = [];
      const addCoinBtn = document.querySelector(originElement);
      const btnRect = addCoinBtn.getBoundingClientRect();
      const addBtnH = btnRect.height;
      const addBtnW = btnRect.width;

	for (let i = 0; i < totalCoins; i++) {
		const newClass = `coin${getUUID()}`;
		newClassArray.push(newClass);

		const coin = document.createElement("span");
		coin.className = `coin ${newClass}`;
		coin.style.backgroundColor = coinColor;
		coin.style.height = '15px';
		coin.style.width = '15px';
		coin.style.position = 'absolute';
		coin.style.borderRadius = '50%';
		coin.style.transition = '800ms';
		coin.style.transform = 'translate(-50%, -50%)';
		coin.style.zIndex = '100';
		coin.style.boxShadow = '0px 0px 2px rgba(0, 0, 0, 0.3)';
		coin.style.pointerEvents = 'none';
		coin.style.userSelect = 'none';
		const { top: btnTop, left: btnLeft } = addCoinBtn.getBoundingClientRect();
		const addBtnH = addCoinBtn.offsetHeight;
		const addBtnW = addCoinBtn.offsetWidth;
		coin.style.top = `${btnRect.top + addBtnH / 2}px`;
    coin.style.left = `${btnRect.left + addBtnW / 2}px`;
		document.body.appendChild(coin);
		
		setTimeout(() => {
			coin.style.top = `${(btnRect.top + addBtnH / 2) + randInt(-40,40)}px`;
			coin.style.left = `${(btnRect.left + addBtnW / 2) + randInt(-40,40)}px`;
		}, 20);

		setTimeout(() => {
			moveToDest(newClass, destinationElement, topOffset);
		}, 850);
	}

	setTimeout(() => {
		newClassArray.forEach(className => removeElementsByClass(className));
	}, 1800);
    };

document.querySelector('.newGame').addEventListener('click', randomGame);

document.addEventListener("DOMContentLoaded", () => {
	// Retrieve the level number from local storage
	let completedLevels = parseInt(localStorage.getItem('completedWordscapesLevels')) || 1;
	// Update the level number displayed
	document.querySelector(".level").textContent = completedLevels;
	// Retrieve the coins earned from local storage
	let coinsEarned = parseInt(localStorage.getItem('coinsEarnedWordscapes')) || 0;
	// Update coins displayed
	document.querySelector(".awardCounter").textContent = coinsEarned;
	
	// Start the game setup
	gameSetup(randomGameName());
});
