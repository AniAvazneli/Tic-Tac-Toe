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
const xClass = 'xClass'
const oClass = 'oClass'


//variables for chosen buttons
let currentPlayer;
let xScores = document.getElementsByClassName('XandChosenNumber')[0];
let tiesText = document.getElementsByClassName('tiesText')[0].innerHTML = 'TIES';
let oScores = document.getElementsByClassName('oandChosenNumber')[0];
let circleTurn = false;
let xArrey = [];
let oArrey = [];
let currentClass ;

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
vsCPU.addEventListener('click', playerChosesCPU);
vsPlayer.addEventListener('click', playerChosesCPU);

// vsPlayer.addEventListener('click');


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
function playerChosesCPU() {
    if (currentPlayer === 'X') {
        document.getElementsByClassName('newGame')[0].style.display = "none";
        SecStartGame.style.display = "flex";
        document.getElementsByClassName('turnImageX')[0].style.display = "flex";
        document.getElementsByClassName('XandChosen')[0].innerHTML = 'X (YOU)';
        xScores.innerHTML = '0';
        tiesText;
        document.getElementsByClassName('tiesNumber')[0].innerHTML = '0';
        document.getElementsByClassName('oandChosen')[0].innerHTML = 'O (CPU)';
        oScores.innerHTML = '0';
    } else if (currentPlayer === 'O') {
        document.getElementsByClassName('newGame')[0].style.display = "none";
        SecStartGame.style.display = "flex";
        document.getElementsByClassName('turnImageO')[0].style.display = "flex";
        document.getElementsByClassName('XandChosen')[0].innerHTML = 'X (CPU)';
        xScores.innerHTML = '0';
        tiesText;
        document.getElementsByClassName('tiesNumber')[0].innerHTML = '0';
        document.getElementsByClassName('oandChosen')[0].innerHTML = 'O (YOU)';
        oScores.innerHTML = '0'
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
    console.log(currentClass);
    if (!circleTurn) {
        xArrey.push(Number(this.getAttribute("cellIndex")));
    } else {
        oArrey.push(Number(this.getAttribute("cellIndex")));
    }
    placeMark(cell, currentClass);
    e.target.removeEventListener('mousover', handHover);
    removeHoverClass();
    checkWin(currentClass);
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
        if (catchWin) {
            // console.log('winner is '+currentClass );
            // return "game is ower"
            document.getElementsByClassName('resultNotification')[0].innerHTML = 'PLAYER 1 WINS!'
            winMessage.style.display = 'flex';
        }else{
            roundTied.style.display = 'flex';
        }
    }
}