'use strict';
// catch html elements
const chosenX = document.getElementById("cheseXcubeId");
const chesenO = document.getElementById("cheseOcubeId");
const vsCPU = document.getElementsByClassName("newGameCPU")[0];
const vsPlayer = document.getElementsByClassName("newGamePlayer")[0];


// catch clicks and make moves
chosenX.addEventListener('click');
chesenO.addEventListener('click');
vsCPU.addEventListener('click');
vsPlayer.addEventListener('click');