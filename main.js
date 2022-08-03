'use strict';
// catch html elements
const chosenX = document.getElementById("cheseXcubeId");
const chesenO = document.getElementById("cheseOcubeId");
const vsCPU = document.getElementsByClassName("newGameCPU")[0];
const vsPlayer = document.getElementsByClassName("newGamePlayer")[0];
const SecStartGame = document.getElementsByClassName("startGame")[0];
const cellElements = document.querySelectorAll('[data-cell]');
const xClass = 'xClass'
const oClass = 'oClass'


//variables for chosen buttons
let currentPlayer;
let xScores = document.getElementsByClassName('XandChosenNumber')[0];
let tiesText = document.getElementsByClassName('tiesText')[0].innerHTML = 'TIES';
let oScores = document.getElementsByClassName('oandChosenNumber')[0];
let circleTurn = false;


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
    console.log(circleTurn);
    const currentClass = circleTurn ? oClass : xClass;
    placeMark(cell, currentClass);
    e.target.removeEventListener('mousover', handHover);
    e.target.classList.remove("oClasshover");
    e.target.classList.remove("xClasshover");
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.classList.remove("uncklicked");
    circleTurn = !circleTurn;
}

function handHover(e) {
    let grid = e.target.classList;
    if (grid.contains('uncklicked')) {
        let hoverClass = circleTurn ? "oClasshover" : "xClasshover";
        console.log(circleTurn);
        grid.add(hoverClass);
    }
}

