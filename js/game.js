// handles the game
class Game {
    constructor() {
        this.startScreenElement = document.getElementById("game-intro");
        this.gameScreenElement = document.getElementById("game-screen");
        this.gameOverScreenElement = document.getElementById("game-end");
        this.scoreElement = document.getElementById("score");
        this.livesElement = document.getElementById("lives");
        this.timeRemainingElement = 60; // timeRemaining; // document.getElementById("timeRemaining");
        this.player = new Player(
            this.gameScreenElement, 
            550, 
            650, 
            150, 
            150, 
            "./images/player3.png"); // constructor of Player inside the parenthesis
        this.themesong = new Audio("./assets/indie-game-soundtrack.mp3");
        this.themesong.volume = 0.1; // not so loud
        this.themesong.loop = true; 
        this.gamestart = new Audio("./assets/game-start.mp3");
        this.gamestart.volume = 0.1; 
        this.gameover = new Audio("./assets/game-over-sound.mp3");
        this.gameover.volume = 0.1; 
        this.height = 800;
        this.width = 1200;
        this.obstacles = []; // array of obstacles
        this.badObstacles = [];
        this.powerObstacles = [];
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
        this.player.bark.play();
        this.themesong.play();
    }

    gameLoop() {
        this.counter++;     // create a counter variable that increases on every frame
        
        if(this.counter % 160 === 0){        // pushes an obstacle eg. every second if 60 === 0
            this.obstacles.push(new Obstacle(this.gameScreenElement));
        }

        if(this.counter % 200 === 0){        // pushes a bad obstacle eg. every second if 60 === 0
            this.badObstacles.push(new BadObstacle(this.gameScreenElement));
        }

        if(this.counter % 300 === 0){        // pushes a power obstacle eg. every second if 60 === 0
            this.powerObstacles.push(new PowerObstacle(this.gameScreenElement));
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
                this.player.eat.play();  // play eating sound
                this.obstacles.splice(i,1)      // cut out the aten item in js
                i--;                        // need to take the i and move it back once
                currentObstacle.element.remove();   // cut out the aten item img

                this.score++;                       // collecting points after catching item
                this.scoreElement.innerText = this.score; // changing the score display

                // if(this.score === 10){              // END GAME AFTER COLLECTING X ITEMS
                //     this.gameIsOver = true;
                // }
            }
            // deleting the fallen item
            if(currentObstacle.top > 800){          
                this.obstacles.splice(i,1)      // cut out the first item that passes the bottom in JS
                i--;                            // need to take the i and move it back once
                currentObstacle.element.remove();   // removes the img element from the html (element is the img)
            }
        }

        // this moves all of the bad obstacles inside the this.badObstacles array:
        for (let i=0; i<this.badObstacles.length; i++){
            const currentObstacle = this.badObstacles[i];
            currentObstacle.move();

            // check if obstacle is colliding with the player 
            if(this.player.didCollide(currentObstacle)){
                this.player.bark.play();
                this.badObstacles.splice(i,1)      // cut out the enemy item in js
                i--;                        // need to take the i and move it back once
                currentObstacle.element.remove();   // cut out the enemy item img

                this.lives--;                               // losing life if touches enemy
                this.livesElement.innerText = this.lives;

                if(this.lives === 0){              // end game after losing all lives
                    this.gameIsOver = true;
                }
            }

            // deleting the fallen item
            if(currentObstacle.top > 800){          
                this.badObstacles.splice(i,1)      // cut out the first item that passes the bottom in JS
                i--;                            // need to take the i and move it back once
                currentObstacle.element.remove();   // removes the img element from the html (element is the img)
            }
        }

        for (let i=0; i<this.powerObstacles.length; i++){
            const currentObstacle = this.powerObstacles[i];
            currentObstacle.move();


        // power up item
        if(this.player.didCollide(currentObstacle)){
            this.player.powerup.play();  // play eating sound
            this.powerObstacles.splice(i,1)      // cut out the enemy item in js
            i--;                        // need to take the i and move it back once
            currentObstacle.element.remove();   // cut out the enemy item img

            this.score += 2;                       // collecting points after catching item
            this.scoreElement.innerText = this.score; // changing the score display
        }
        // deleting the fallen item
        if(currentObstacle.top > 800){          
            currentObstacle.element.remove();   // removes the img element from the html (element is the img)
        }
    }

    }

    gameOver(){
        clearInterval(this.gameIntervalId); // stop the loop from running
        this.gameScreenElement.style.display = 'none';              // hide the game screen
        document.getElementById("game-container").style.display = 'none'; // hide game container
        this.gameOverScreenElement.style.display = 'flex';         // show the game over screen
        // this.themesong.pause();      // stops the music at game-end // but turned it off, since I want the music to continue
        this.gameover.play();
    }
}