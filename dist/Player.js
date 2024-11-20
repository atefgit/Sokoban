// Player.ts
export class Player {
    constructor(initialX, initialY) {
        this.x = initialX;
        this.y = initialY;
    }
    // Méthode pour déplacer le joueur dans une direction donnée
    move(direction) {
        switch (direction) {
            case "up":
                this.y -= 1;
                break;
            case "down":
                this.y += 1;
                break;
            case "left":
                this.x -= 1;
                break;
            case "right":
                this.x += 1;
                break;
        }
    }
    setPosition(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}
