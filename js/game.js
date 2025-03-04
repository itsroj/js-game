// handles the game
class Game {
    constructor() {
        this.startScreenElement = document.getElementById("game-intro");
        this.gameScreenElement = document.getElementById("game-screen");
        this.gameOverScreenElement = document.getElementById("game-end");
        this.player = new Player(
            this.gameScreenElement, 
            550, 
            635, 
            196, 
            218, 
            "./images/player4.png"); // constructor of Player inside the parenthesis
        this.height = 800;
        this.width = 1200;
        this.obstacles = [new Obstacle(this.gameScreenElement)];        // array of enemies
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null; 
        this.gameLoopFrequency = Math.round(1000/60);
    }

    start() {
        // set height & width of game screen
        this.gameScreenElement.style.height = `${this.height}px`
        this.gameScreenElement.style.width = `${this.width}px`

        // hide start screen and show game screen
        this.startScreenElement.style.display = 'none';
        this.gameScreenElement.style.display = 'block';
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
    }

    gameLoop() {
        this.update();

        // check if the game is over
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
    }

    update() {
        this.player.move()  // this moves the player
        // this moves all of the obstacles inside the this.obstacle array:
        for (let i=0; i<this.obstacles.length; i++){
            const currentObstacle = this.obstacles[i];
            currentObstacle.move();
        }
    }
}