import { Display } from "./Display.js";
import { Player } from "./Player.js";
import { Rock } from "./Rock.js";
import { Hole } from "./Hole.js";
export class Game {
    constructor(width, height, scale) {
        this.rocks = [];
        this.holes = [];
        this.gameOver = false;
        this.level = 1;
        this.history = [];
        this.width = width;
        this.height = height;
        this.display = new Display(width, height, scale);
        this.gridSize = Math.min(width, height);
        this.player = new Player(0, 0);
        this.initializeLevel();
    }
    initializeLevel() {
        this.rocks = [];
        this.holes = [];
        const playerPosition = this.getRandomPosition();
        this.player = new Player(playerPosition.x, playerPosition.y);
        for (let i = 0; i < this.level; i++) {
            const holePosition = this.getRandomPosition();
            this.holes.push(new Hole(holePosition.x, holePosition.y));
        }
        for (let i = 0; i < this.level; i++) {
            const rockPosition = this.getRandomPosition();
            this.rocks.push(new Rock(rockPosition.x, rockPosition.y));
        }
        this.updateLevelDisplay();
        this.updateDisplay();
    }
    saveState() {
        this.history.push({
            player: { x: this.player.getX(), y: this.player.getY() },
            rocks: this.rocks.map(rock => ({ x: rock.getX(), y: rock.getY() })),
        });
    }
    getRandomPosition() {
        const margin = 1;
        return {
            x: Math.floor(Math.random() * (this.gridSize - 2 * margin)) + margin,
            y: Math.floor(Math.random() * (this.gridSize - 2 * margin)) + margin,
        };
    }
    nextLevel() {
        this.level += 1;
        this.initializeLevel();
    }
    updateLevelDisplay() {
        this.display.updateLevelDisplay(this.level);
    }
    movePlayer(newPlayerX, newPlayerY) {
        if (this.isWithinBounds(newPlayerX, newPlayerY)) {
            const holeAtPosition = this.getHoleAtPosition(newPlayerX, newPlayerY);
            if (!holeAtPosition || this.isHoleFilled(holeAtPosition)) {
                this.player.setPosition(newPlayerX, newPlayerY);
            }
        }
    }
    play(direction) {
        if (this.gameOver)
            return;
        this.saveState();
        let newPlayerX = this.player.getX();
        let newPlayerY = this.player.getY();
        switch (direction) {
            case "up":
                newPlayerY -= 1;
                break;
            case "down":
                newPlayerY += 1;
                break;
            case "left":
                newPlayerX -= 1;
                break;
            case "right":
                newPlayerX += 1;
                break;
        }
        const rockAtPosition = this.getRockAtPosition(newPlayerX, newPlayerY);
        if (rockAtPosition) {
            if (this.canPushRocks(newPlayerX, newPlayerY, direction)) {
                this.pushRocks(newPlayerX, newPlayerY, direction);
                this.movePlayer(newPlayerX, newPlayerY);
            }
        }
        else {
            this.movePlayer(newPlayerX, newPlayerY);
        }
        this.updateDisplay();
        if (this.areAllHolesFilled()) {
            this.nextLevel();
        }
    }
    undo() {
        if (this.history.length === 0)
            return;
        const lastState = this.history.pop();
        if (!lastState)
            return;
        // Restaurer les positions
        this.player.setPosition(lastState.player.x, lastState.player.y);
        this.rocks.forEach((rock, index) => {
            rock.setPosition(lastState.rocks[index].x, lastState.rocks[index].y);
        });
        this.updateDisplay();
    }
    pushRocks(x, y, direction) {
        const rock = this.getRockAtPosition(x, y);
        if (!rock)
            return;
        let newRockX = x;
        let newRockY = y;
        switch (direction) {
            case "up":
                newRockY -= 1;
                break;
            case "down":
                newRockY += 1;
                break;
            case "left":
                newRockX -= 1;
                break;
            case "right":
                newRockX += 1;
                break;
        }
        const nextRock = this.getRockAtPosition(newRockX, newRockY);
        if (nextRock) {
            this.pushRocks(newRockX, newRockY, direction);
        }
        if (this.isWithinBounds(newRockX, newRockY) && !this.getRockAtPosition(newRockX, newRockY)) {
            rock.move(direction);
            const holeAtNewPosition = this.getHoleAtPosition(newRockX, newRockY);
            if (holeAtNewPosition && !this.isHoleFilled(holeAtNewPosition)) {
                rock.setImmovable(true);
            }
        }
    }
    canPushRocks(x, y, direction) {
        let currentX = x;
        let currentY = y;
        while (true) {
            let nextX = currentX;
            let nextY = currentY;
            switch (direction) {
                case "up":
                    nextY -= 1;
                    break;
                case "down":
                    nextY += 1;
                    break;
                case "left":
                    nextX -= 1;
                    break;
                case "right":
                    nextX += 1;
                    break;
            }
            if (!this.isWithinBounds(nextX, nextY)) {
                return false;
            }
            const nextRock = this.getRockAtPosition(nextX, nextY);
            if (!nextRock) {
                return true;
            }
            currentX = nextX;
            currentY = nextY;
        }
    }
    isHoleFilled(hole) {
        return this.rocks.some((rock) => rock.getX() === hole.getX() && rock.getY() === hole.getY() && rock.isImmovable());
    }
    areAllHolesFilled() {
        return this.holes.every((hole) => this.isHoleFilled(hole));
    }
    getRockAtPosition(x, y) {
        return (this.rocks.find((rock) => rock.getX() === x && rock.getY() === y && !rock.isImmovable()) || null);
    }
    getHoleAtPosition(x, y) {
        return this.holes.find((hole) => hole.getX() === x && hole.getY() === y) || null;
    }
    updateDisplay() {
        this.display.draw(this);
    }
    getPlayer() {
        return this.player;
    }
    getRocks() {
        return this.rocks;
    }
    getHoles() {
        return this.holes;
    }
    isWithinBounds(x, y) {
        return x >= 0 && y >= 0 && x < this.gridSize && y < this.gridSize;
    }
}
