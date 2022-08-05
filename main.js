'use strict';
// catch html elements
const chosenX = document.getElementById("cheseXcubeId");
const chesenO = document.getElementById("cheseOcubeId");
const vsCPU = document.getElementsByClassName("newGameCPU")[0];
const vsPlayer = document.getElementsByClassName("newGamePlayer")[0];
const SecStartGame = document.getElementsByClassName("startGame")[0];
const cellElements = document.querySelectorAll('[data-cell]');
const winMessage = document.getElementsByClassName('notification')[0];
const roundTied = document.getElementsByClassName('tied')[0];
const restartSec = document.getElementsByClassName('restart')[0];
const restartB = document.getElementsByClassName('restartB')[0];
const cancel = document.getElementsByClassName('cancel')[0];
const quitB_1 = document.getElementsByClassName('qButton')[0];
const quitB_2 = document.getElementsByClassName('qButton')[1];
const defNewGame = document.getElementsByClassName('newGame')[0];
const nextRound_1 = document.getElementsByClassName('nextRoundB')[0];
const nextRound_2 = document.getElementsByClassName('nextRoundB')[1];
const starter = document.getElementsByClassName('newGame')[0];
const xClass = 'xClass'
const oClass = 'oClass'


//variables for chosen buttons
let currentPlayer;
let tiesText = document.getElementsByClassName('tiesText')[0].innerHTML = 'TIES';
let xScores = document.getElementsByClassName('XandChosenNumber')[0];
let tieScores = document.getElementsByClassName('tiesNumber')[0];
let oScores = document.getElementsByClassName('oandChosenNumber')[0];
let circleTurn = false;
let xArrey = [];
let oArrey = [];
let currentClass ;
let xScoresWinn = 0;
let oScoresWin = 0;
let tieScoresWin = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


// catch clicks and make moves
chosenX.addEventListener('click', palyerIsX);
chesenO.addEventListener('click', palyerIsO);
// vsCPU.addEventListener('click', playerChosesCPU);
vsPlayer.addEventListener('click', playerChosesMulty);
restart.addEventListener('click', restartGamge);
restartB.addEventListener('click', restartFunc);
cancel.addEventListener('click', cancelFunc);
quitB_1.addEventListener('click', quitFunc);
nextRound_1.addEventListener('click', nextFunc);
quitB_2.addEventListener('click', quitFunc);
nextRound_2.addEventListener('click', nextFunc);


// functions for clicks :

// 1. if person choses X mark
function palyerIsX() {
    currentPlayer = 'X';
    chosenX.style.backgroundColor = "#A8BFC9";
    document.getElementsByClassName('notChoseX')[0].style.display = "none";
    document.getElementsByClassName('ChoseX')[0].style.display = "flex";
    chesenO.style.backgroundColor = "#1A2A33";
    document.getElementsByClassName('choseO')[0].style.display = "none";
    document.getElementsByClassName('notChoseO')[0].style.display = "flex";
}

// 2. if person choses O mark
function palyerIsO() {
    currentPlayer = 'O';
    chesenO.style.backgroundColor = "#A8BFC9";
    document.getElementsByClassName('notChoseO')[0].style.display = "none";
    document.getElementsByClassName('choseO')[0].style.display = "flex";
    chosenX.style.backgroundColor = "#1A2A33";
    document.getElementsByClassName('ChoseX')[0].style.display = "none";
    document.getElementsByClassName('notChoseX')[0].style.display = "flex";
}

// 3. player choses CPU 
function playerChosesMulty() {
    if (currentPlayer === 'X') {
        document.getElementsByClassName('newGame')[0].style.display = "none";
        SecStartGame.style.display = "flex";
        document.getElementsByClassName('turnImageX')[0].style.display = "flex";
        document.getElementsByClassName('XandChosen')[0].innerHTML = 'X (YOU)';
        xScores.innerHTML = 0;
        tiesText;
        tieScores.innerHTML = 0;
        document.getElementsByClassName('oandChosen')[0].innerHTML = 'O (CPU)';
        oScores.innerHTML = 0;
    } else if (currentPlayer === 'O') {
        document.getElementsByClassName('newGame')[0].style.display = "none";
        SecStartGame.style.display = "flex";
        document.getElementsByClassName('turnImageO')[0].style.display = "flex";
        document.getElementsByClassName('XandChosen')[0].innerHTML = 'X (CPU)';
        xScores.innerHTML = 0;
        tiesText;
        tieScores.innerHTML = 0;
        document.getElementsByClassName('oandChosen')[0].innerHTML = 'O (YOU)';
        oScores.innerHTML = 0;
    }
}



// element click X or O

startGame();

function startGame() {
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
        cell.addEventListener('mouseover', handHover);
    })
}


function handleClick(e) {
    const cell = e.target;
    currentClass = circleTurn ? oClass : xClass;
    if (!circleTurn) {
        xArrey.push(Number(this.getAttribute("cellIndex")));
    } else {
        oArrey.push(Number(this.getAttribute("cellIndex")));
    }
    placeMark(cell, currentClass);
    e.target.removeEventListener('mousover', handHover);
    removeHoverClass();
    changeTurnImage();
    checkWin(currentClass);
}

function changeTurnImage() {
    if (currentClass === xClass) {
        document.getElementsByClassName("turnImageX")[0].style.display = 'none'
        document.getElementsByClassName("turnImageO")[0].style.display = 'flex'
    } else {
        document.getElementsByClassName("turnImageX")[0].style.display = 'flex'
        document.getElementsByClassName("turnImageO")[0].style.display = 'none'
    }
}

function removeHoverClass() {
    for (let i = 0; i < cellElements.length; i++) {
        cellElements[i].classList.remove("oClasshover");
        cellElements[i].classList.remove("xClasshover");
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.classList.remove("uncklicked");
    changeTurnes();
}

function changeTurnes() {
    circleTurn = !circleTurn;
}

function handHover(e) {
    let grid = e.target.classList;
    if (grid.contains('uncklicked')) {
        let hoverClass = circleTurn ? "oClasshover" : "xClasshover";
        grid.add(hoverClass);
    }
}

function checkWin(currentClass) {
    for (let i = 0; i < winningCombinations.length; i++) {
        let catchWin = winningCombinations[i].every(index => {
            return currentClass === xClass ? xArrey.includes(index) : oArrey.includes(index);
        })
        if (catchWin && currentClass === xClass) {
            document.getElementsByClassName('resultNotification')[0].innerHTML = 'PLAYER 1 WINS!'
            xScoresWinn++;
            xScores.innerHTML = xScoresWinn;
            winMessage.style.display = 'flex';

        } else if (catchWin && currentClass === oClass) {
            document.getElementsByClassName('resultNotification')[0].innerHTML = 'PLAYER 2 WINS!';
            document.getElementsByClassName('notYellowXimage')[0].style.display = 'none';
            document.getElementsByClassName('notYellowOimage')[0].style.display = 'block';
            document.getElementsByClassName('xWinstext')[0].style.color = '#F2B137';
            oScoresWin++;
            oScores.innerHTML = oScoresWin;
            winMessage.style.display = 'flex';
        } else if (xArrey.length === 5 && oArrey.length === 4 && i === winningCombinations.length - 1) {
            winMessage.style.display = 'none';
            roundTied.style.display = 'flex';
            tieScoresWin++;
            tieScores.innerHTML = tieScoresWin;
        }
    }
}

function restartGamge() {
    winMessage.style.display = 'none';
    roundTied.style.display = 'none';
    restartSec.style.display = 'flex';
}


//needes to fish restart hovers 
function restartFunc() {
    restartSec.style.display = 'none';
    cellElements.forEach(cell => {
        cell.classList.remove('xClass', 'oClass');
        cell.classList.remove("oClasshover", "xClasshover");
        cell.classList.add('uncklicked');
    })
    currentClass = null;
    xArrey = [];
    oArrey = [];
    xScoresWinn = 0;
    oScoresWin = 0;
    tieScoresWin = 0;
    xScores.innerHTML = xScoresWinn;
    oScores.innerHTML = oScoresWin;
    tieScores.innerHTML = tieScoresWin;
    startGame();
    currentClass = xClass;
}

function cancelFunc() {
    restartSec.style.display = 'none';
}

function quitFunc(){
    winMessage.style.display = 'none';
    SecStartGame.style.display = 'none';
    roundTied.style.display = 'none';
    starter.style.display = 'flex';
    cellElements.forEach(cell => {
        cell.classList.remove('xClass', 'oClass');
        cell.classList.remove("oClasshover", "xClasshover");
        cell.classList.add('uncklicked');
    })
    xArrey = [];
    oArrey = [];
    xScoresWinn = 0;
    oScoresWin = 0;
    tieScoresWin = 0;
    xScores.innerHTML = xScoresWinn;
    oScores.innerHTML = oScoresWin;
    tieScores.innerHTML = tieScoresWin;
    currentClass = xClass;
}

function nextFunc(){
    winMessage.style.display = 'none';
    cellElements.forEach(cell => {
        cell.classList.remove('xClass', 'oClass');
        cell.classList.remove("oClasshover", "xClasshover");
        cell.classList.add('uncklicked');
    })
    currentClass = null;
    xArrey = [];
    oArrey = [];
    startGame();
    currentClass = xClass;
}