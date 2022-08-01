'use strict';
// catch html elements
const chosenX = document.getElementById("cheseXcubeId");
const chesenO = document.getElementById("cheseOcubeId");
const vsCPU = document.getElementsByClassName("newGameCPU")[0];
const vsPlayer = document.getElementsByClassName("newGamePlayer")[0];
const SecStartGame = document.getElementsByClassName("startGame")[0];


const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')


//variables for chosen buttons
let xScores = document.getElementsByClassName('XandChosenNumber')[0];
let tiesText = document.getElementsByClassName('tiesText')[0].innerHTML = 'TIES';
let oScores = document.getElementsByClassName('oandChosenNumber')[0];


// catch clicks and make moves
chosenX.addEventListener('click', palyerIsX);
chesenO.addEventListener('click', palyerIsO);
vsCPU.addEventListener('click', playerChosesCPU);
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
    } else {
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

