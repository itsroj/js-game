class Obstacle {
    constructor(gameScreenElement) {
        this.possibleXPositions = [80, 270, 80, 80, 270];
        this.randomIndex = Math.floor(
            Math.random() * this.possibleXPositions.length
        );
        this.left = this.possibleXPositions[this.randomIndex];
        this.top = -300;
        this.width = 200;
        this.height = 200;
        this.element = document.createElement("img");
        this.element.src = "./images/bone.png";
        this.element.style.position = "absolute";
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        
        // Stellen sicher, dass gameScreenElement als Parameter übergeben wird
        gameScreenElement.appendChild(this.element);
    }
    
    // Füge eine Methode hinzu, um das Obstacle zu bewegen (falls benötigt)
    move() {
        this.top += 5; // Beispielgeschwindigkeit
        this.element.style.top = `${this.top}px`;
    }
}