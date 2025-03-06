class BadObstacle {
    constructor(gameScreenElement) {
        // random position
        this.possibleImages = ['./images/postman.png', './images/vacuum.png'];
        const minLeft = 100; // min px distance from left edge
        const maxLeft = 1100; // screen (1200) - Obstacle-width - some space cause of png
        this.left = Math.floor(minLeft + Math.random() * (maxLeft - minLeft)); // random position between minLeft & maxLeft
        this.top = -60; //-300;
        this.width = 80;
        this.height = 100;
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
        this.top += 4;          // MOVING SPEED OF OBSTACLE
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`        // what actually moves the img tag (but need to call the move method in the obstacle > game.js >update())
    }
}