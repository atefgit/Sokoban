// Display.ts
import Drawer from "./Drawer.js";
export class Display {
    constructor(width, height, scale = 10) {
        this.drawer = new Drawer(width, height, scale);
    }
    refreshScore() {
        const score = document.getElementById("score");
        if (score != null)
            score.innerHTML = "0";
    }
    updateLevelDisplay(level) {
        const levelDisplay = document.getElementById("level-display");
        if (levelDisplay) {
            levelDisplay.textContent = level.toString();
        }
    }
    draw(game) {
        this.drawer.clear();
        game.getRocks().forEach(rock => {
            this.drawer.drawRectangle(rock.getX(), rock.getY(), "red");
        });
        game.getHoles().forEach(hole => {
            const rocksOnHole = game.getRocks().filter(rock => rock.getX() === hole.getX() && rock.getY() === hole.getY());
            let color = "black";
            if (rocksOnHole.length === 1) {
                color = "grey";
            }
            else if (rocksOnHole.length > 1) {
                color = "red";
            }
            this.drawer.drawRectangle(hole.getX(), hole.getY(), color);
        });
        const player = game.getPlayer();
        this.drawer.drawCircle(player.getX(), player.getY(), "green");
    }
}
