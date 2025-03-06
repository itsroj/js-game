class Player {
    constructor(gameScreenElement, positionLeft, positionTop, playerWidth, playerHeight, playerImageSrc) {
        // this.gameScreenElement = gameScreenElement;
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.width = playerWidth;
        this.height = playerHeight;
        this.directionX = 0;
        this.eat = new Audio("./assets/eating-sound.mp3");
        this.eat.volume = 0.1; // not so loud
        this.bark = new Audio("./assets/dog-barks.wav");
        this.bark.volume = 0.1; // not so loud
        this.powerup = new Audio ("./assets/power-up.mp3");
        this.powerup.volume = 0.1; // not so loud
        // image
        this.element = document.createElement('img');
        this.element.src = playerImageSrc;
        this.element.style.position = 'absolute';       // doesn't respect other elements (moves around freely)
        
        this.element.style.top = `${positionTop}px`;
        this.element.style.left = `${positionLeft}px`;
        this.element.style.width = `${playerWidth}px`;
        this.element.style.height = `${playerHeight}px`;

        // after creating the img element and setting the properties
        gameScreenElement.appendChild(this.element)       // add it to the game screen
    }

    move(){
        this.positionLeft += this.directionX;
    if (this.positionLeft < 60) {
        this.positionLeft = 60
    }
    if (this.positionLeft + this.width > 1155) {
        this.positionLeft = 1155 - this.width
    }
        this.updatePosition();
    };

    updatePosition(){
        this.element.style.left = `${this.positionLeft}px`;
    };

    didCollide(obstacle){
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
    
        if (                                            // if one item touches the other item
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
        ) {
          return true;
        } else {
          return false;
        }
    };
}