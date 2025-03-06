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

    restartButtonElement.addEventListener("click", () =>{
        window.location.reload();               // "refresh" the page
    })

// keyboard event listeners
    window.addEventListener('keydown', (event) => {
        if (event.code === "ArrowLeft") {
            ourNewGame.player.directionX = -16;          // MOVING SPEED OF PLAYER
        }
        else if (event.code === "ArrowRight") {
            ourNewGame.player.directionX = 16;           // MOVING SPEED OF PLAYER
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

        /************  SHOW INITIAL CONTENT  ************/
        
        // Check if timeRemaining exists and is a number, use default if not
        if (typeof ourNewGame.timeRemaining !== 'number') {
            ourNewGame.timeRemaining = 60; // TIME REMAINING IN TOTAL
        }

        // Update time display
        const minutes = Math.floor(ourNewGame.timeRemaining / 60).toString().padStart(2, "0");
        const seconds = (ourNewGame.timeRemaining % 60).toString().padStart(2, "0");
        const timeRemainingContainer = document.getElementById("timeRemaining");
        timeRemainingContainer.innerText = `${minutes}:${seconds}`;

        /************  TIMER  ************/

        let ourInterval = setInterval(() => {
            ourNewGame.timeRemaining--;
            const minutes = Math.floor(ourNewGame.timeRemaining / 60).toString().padStart(2, "0");
            const seconds = (ourNewGame.timeRemaining % 60).toString().padStart(2, "0");
            timeRemainingContainer.innerText = `${minutes}:${seconds}`;
            console.log(ourNewGame.timeRemaining)
            if (ourNewGame.timeRemaining <= 0 || ourNewGame.lives === 0) {
                // Add gameOver function or handle end of game
                gameOver();
                clearInterval(ourInterval);
            }
        }, 1000);
    }

    function gameOver() {
        // Define these elements directly in this function
        const gameScreenElement = document.getElementById("game-screen");
        const gameOverScreenElement = document.getElementById("game-end");
        
        // Hide game screen
        gameScreenElement.style.display = 'none';
        document.getElementById("game-container").style.display = 'none';
        
        // Show game over screen
        gameOverScreenElement.style.display = 'flex';
        seeResult();
        console.log("game over hello")
    }

    function seeResult(){
        const scoreElement = document.getElementById("result");
        const totalScore = ourNewGame.score || 0;       // default to 0 if score is undefined
        scoreElement.innerText = totalScore;
    };
}