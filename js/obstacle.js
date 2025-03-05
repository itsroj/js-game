class Obstacle {
    constructor(gameScreenElement) {
        // random position
        this.possibleImages = ['./images/bone.png', './images/apple.png'];
        const maxLeft = 1100; // screen (1200) - Obstacle-width (60) - some space
        this.left = Math.floor(Math.random() * maxLeft);
        this.top = -60; //-300;
        this.width = 60;
        this.height = 60;
        this.randomImageIndex = Math.floor(Math.random() * this.possibleImages.length)
        this.element = document.createElement("img");
        this.element.src = this.possibleImages[this.randomImageIndex];
        this.element.style.position = "absolute";
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        
        gameScreenElement.appendChild(this.element);
    }
    
    move () {
        this.top += 5;          // MOVING SPEED OF OBSTACLE
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`        // what actually moves the img tag (but need to call the move method in the obstacle > game.js >update())
    }
}