class PowerObstacle {
    constructor(gameScreenElement) {
        // random position
        const maxLeft = 1100; // screen (1200) - Obstacle-width - some space cause of png
        this.left = Math.floor(Math.random() * maxLeft);
        this.top = -60; //-300;
        this.width = 60;
        this.height = 60;
        this.element = document.createElement("img");
        this.element.src = "./images/flash.png";
        this.element.style.position = "absolute";
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        
        gameScreenElement.appendChild(this.element);
    }
    
    move () {
        this.top += 8;          // MOVING SPEED OF OBSTACLE
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`        // what actually moves the img tag (but need to call the move method in the obstacle > game.js >update())
    }
}