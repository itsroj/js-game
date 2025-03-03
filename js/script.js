// handles the event listeners

window.onload = function () {  // means: call this function when all the assets load
    const startButtonElement = document.getElementById("start-button");
    const restartButtonElement = document.getElementById("restart-button");
    let ourNewGame;

// all event listeners 
    startButtonElement.addEventListener("click", function () {
        ourNewGame = new Game();           // ourNewGame (new) has all of the properties and methods of class Game
        startGame();
    });

// all functions
    function startGame() {
        ourNewGame.start();
    }
}