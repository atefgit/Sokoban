// Rock.ts
export class Rock {
    constructor(x, y) {
        this.immovable = false;
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    move(direction) {
        if (this.immovable)
            return;
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
    setImmovable(value) {
        this.immovable = value;
    }
    isImmovable() {
        return this.immovable;
    }
}
