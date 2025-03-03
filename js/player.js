class Player {
    constructor(gameScreen, positionLeft, positionTop, playerWidth, playerHeight, playerImageSrc) {
        this.gameScreen = gameScreen;
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.width = playerWidth;
        this.height = playerHeight;
        this.directionX = 0;
        // this.directionY = 0;
        this.element = document.createElement('img');
        this.element.src = playerImageSrc;
        this.element.style.position = 'absolute';       // doesn't respect other elements (moves around freely)
        
        this.element.style.top = `${positionTop}px`;
        this.element.style.left = `${positionLeft}px`;
        this.element.style.width = `${playerWidth}px`;
        this.element.style.height = `${playerHeight}px`;


        // after creating the img element and setting the properties
        gameScreen.appendChild(this.element)       // add it to the game screen
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
        // this.element.style.top = `${this.positionTop}px`;
        this.element.style.left = `${this.positionLeft}px`;
    };

    didCollide(obstacle){

    };
}