// handles the game
class Game {
    constructor() {
        this.startScreenElement = document.getElementById("game-intro");
        this.gameScreenElement = document.getElementById("game-screen");
        this.gameOverScreenElement = document.getElementById("game-end");
        this.scoreElement = document.getElementById("score");
        this.livesElement = document.getElementById("lives");
        this.timeElement = document.getElementById("time");
        this.player = new Player(
            this.gameScreenElement, 
            550, 
            635, 
            196, 
            218, 
            "./images/player4.png"); // constructor of Player inside the parenthesis
        this.height = 800;
        this.width = 1200;
        this.obstacles = []; // [new Obstacle(this.gameScreenElement)];    // array of enemies
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null; 
        this.gameLoopFrequency = Math.round(1000/60);
        this.counter = 0;
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
        this.counter++;     // create a counter variable that increases on every frame
        
        if(this.counter % 160 === 0){        // pushes an obstacle eg. every second if 60 === 0
            this.obstacles.push(new Obstacle(this.gameScreenElement));
        }

        this.update();

        // check if the game is over
        if (this.gameIsOver) {
            this.gameOver();
        }
    }

    update() {
        this.player.move()  // this moves the player
        // this moves all of the obstacles inside the this.obstacle array:
        for (let i=0; i<this.obstacles.length; i++){
            const currentObstacle = this.obstacles[i];
            currentObstacle.move();

            // check if obstacle is colliding with the player 
            if(this.player.didCollide(currentObstacle)){
                this.obstacles.splice(i,1)      // cut out the aten item in js
                i--;                        // need to take the i and move it back once
                currentObstacle.element.remove();   // cut out the aten item img

                this.score++;                       // collecting points after catching item
                this.scoreElement.innerText = this.score; // changing the score display

                if(this.score === 1){              // end game after collecting X items
                    this.gameIsOver = true;
                }
            }

            // deleting the fallen item
            if(currentObstacle.top > 800){          
                this.obstacles.splice(i,1)      // cut out the first item that passes the bottom in JS
                i--;                            // need to take the i and move it back once
                currentObstacle.element.remove();   // removes the img element from the html (element is the img)
            }
        }
    }

    gameOver(){
        clearInterval(this.gameIntervalId); // stop the loop from running
        this.gameScreenElement.style.display = 'none';              // hide the game screen
        document.getElementById("game-container").style.display = 'none'; // hide game container
        this.gameOverScreenElement.style.display = 'flex';         // show the game over screen
    }
}