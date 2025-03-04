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

// keyboard event listeners
    window.addEventListener('keydown', (event) => {
        if (event.code === "ArrowLeft") {
            ourNewGame.player.directionX = -8;          // moving speed of player
        }
        else if (event.code === "ArrowRight") {
            ourNewGame.player.directionX = 8;           // moving speed of player
        }
    })

// adding this event listener, to react to the release of the buttons
    window.addEventListener('keyup', (event) => {
        if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
            ourNewGame.player.directionX = 0; // stops the movement when a button is released
        }
    });

// all functions
    function startGame() {
        ourNewGame.start();
    }
}