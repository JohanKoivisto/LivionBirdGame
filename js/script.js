let birds = ["Ostrich", "Treecreeper", "Oxpecker", "Mockinbird", "Snowfinch", "Whitestart", "Meadowlark", "Oropendola", "Crescentchest", "Bustard"]
let easymode = false;
const birdOutput = document.getElementById("bird-name");
let birdCountOutput = document.getElementById("bird-count")
birdOutput.innerHTML = birds[0]
let currentBird = birds[0]
let birdsLeft = birds.length
birdCountOutput.innerHTML = `There are ${birdsLeft} birds remaining`;
let key = "";
let newGame = false;

const getKey = e => { 
    e = e || window.event; 
    let charCode = e.keyCode || e.which; 
    return String.fromCharCode(charCode); 
  } 

/**
 * Store keypress to variable, call birdGame(), load new game if previous ended
 */
window.addEventListener('keypress', e => { 
    key = getKey();
    newGame ? newGameInit() : null;
    birdGame();
}, false);

const birdGame = () => {
   if (key === currentBird[0].slice(0, 1)) {
    currentBird = currentBird.slice(1).split("").map(char => char === key ? char = "" : char = char).reverse().join("")
    birds[0] = birds[0].split("").map(char => char === key ? char = "_" : char = char).join("")
    easymode ? birdOutput.innerHTML = birds[0].replace(currentBird[0], `<span class="current-key">${currentBird[0]}</span>`)
    : birdOutput.innerHTML = birds[0]
    birds[0].replace(/_/g, "").length === 0 ? nextBird() : null
    birdCountOutput.innerHTML = `There are ${birdsLeft} birds remaining`
    birds.length === 0 ? gameOver() : null
   } else if (birds.length === 0){
    gameOver()
   }
}

const newGameInit = () => {
    birdOutput.innerHTML = birds[0]
    newGame = false;
    birdsLeft = birds.length
    birdCountOutput.innerHTML = `There are ${birdsLeft} birds remaining`
}

/**
 * Display "game over", reset and shuffle birds and start new on any key
 */
const gameOver = () => {
    birdOutput.innerHTML = `Well done! Press any key to play again`
    birds = ["Ostrich", "Treecreeper", "Oxpecker", "Mockinbird", "Snowfinch", "Whitestart", "Meadowlark", "Oropendola", "Crescentchest", "Bustard"]
    shuffle(birds)
    currentBird = birds[0]
    birdsLeft = birds.length
    newGame = true;
}

/**
 * Loads next bird, updates counter and DOM
 */
const nextBird = () => {
    birds.shift();
        birdsLeft--;
        currentBird = birds[0]
        birdOutput.innerHTML = birds[0];
}


/**
 * Toggle easymode On / Off. easymode hilights character player needs to type
 */
const toggleDifficulty = () => {
    easymode === false ? easymode = true : easymode = false;
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}