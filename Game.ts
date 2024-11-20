import { Display } from "./Display.js";
import { Player } from "./Player.js";
import { Rock } from "./Rock.js";
import { Hole } from "./Hole.js";

export class Game {
  private width: number;
  private height: number;
  private display: Display;
  private player: Player;
  private rocks: Rock[] = [];
  private holes: Hole[] = [];
  private gridSize: number;
  private gameOver: boolean = false;
  private level: number = 1;
  private history: { player: { x: number; y: number }; rocks: { x: number; y: number }[] }[] = [];


  constructor(width: number, height: number, scale: number) {
    this.width = width;
    this.height = height;
    this.display = new Display(width, height, scale);
    this.gridSize = Math.min(width, height);

    this.player = new Player(0, 0);
    this.initializeLevel();
  }

  private initializeLevel() {
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

  private saveState() {
    this.history.push({
        player: { x: this.player.getX(), y: this.player.getY() },
        rocks: this.rocks.map(rock => ({ x: rock.getX(), y: rock.getY() })),
    });
  }

  private getRandomPosition(): { x: number; y: number } {
    const margin = 1;
    return {
      x: Math.floor(Math.random() * (this.gridSize - 2 * margin)) + margin,
      y: Math.floor(Math.random() * (this.gridSize - 2 * margin)) + margin,
    };
  }

  private nextLevel() {
    this.level += 1;
    this.initializeLevel();
  }

  private updateLevelDisplay() {
    this.display.updateLevelDisplay(this.level);
  }

  private movePlayer(newPlayerX: number, newPlayerY: number) {
    if (this.isWithinBounds(newPlayerX, newPlayerY)) {
      const holeAtPosition = this.getHoleAtPosition(newPlayerX, newPlayerY);
      if (!holeAtPosition || this.isHoleFilled(holeAtPosition)) {
        this.player.setPosition(newPlayerX, newPlayerY);
      }
    }
  }

  public play(direction: string) {
    if (this.gameOver) return;
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
    } else {
      this.movePlayer(newPlayerX, newPlayerY);
    }

    this.updateDisplay();

    if (this.areAllHolesFilled()) {
      this.nextLevel();
    }
  }

  public undo() {
    if (this.history.length === 0) return;
    const lastState = this.history.pop();
    if (!lastState) return;

    // Restaurer les positions
    this.player.setPosition(lastState.player.x, lastState.player.y);
    this.rocks.forEach((rock, index) => {
        rock.setPosition(lastState.rocks[index].x, lastState.rocks[index].y);
    });

    this.updateDisplay();
  }


  private pushRocks(x: number, y: number, direction: string): void {
    const rock = this.getRockAtPosition(x, y);
    if (!rock) return;

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

  private canPushRocks(x: number, y: number, direction: string): boolean {
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

  private isHoleFilled(hole: Hole): boolean {
    return this.rocks.some(
      (rock) => rock.getX() === hole.getX() && rock.getY() === hole.getY() && rock.isImmovable()
    );
  }

  private areAllHolesFilled(): boolean {
    return this.holes.every((hole) => this.isHoleFilled(hole));
  }

  private getRockAtPosition(x: number, y: number): Rock | null {
    return (
      this.rocks.find((rock) => rock.getX() === x && rock.getY() === y && !rock.isImmovable()) || null
    );
  }

  private getHoleAtPosition(x: number, y: number): Hole | null {
    return this.holes.find((hole) => hole.getX() === x && hole.getY() === y) || null;
  }

  updateDisplay() {
    this.display.draw(this);
  }

  public getPlayer(): Player {
    return this.player;
  }

  public getRocks(): Rock[] {
    return this.rocks;
  }

  public getHoles(): Hole[] {
    return this.holes;
  }

  private isWithinBounds(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.gridSize && y < this.gridSize;
  }
}