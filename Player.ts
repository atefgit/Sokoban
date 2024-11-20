// Player.ts
export class Player {
  private x: number;
  private y: number;

  constructor(initialX: number, initialY: number) {
      this.x = initialX;
      this.y = initialY;
  }

  // Méthode pour déplacer le joueur dans une direction donnée
  move(direction: string) {
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

  setPosition(newX: number, newY: number) {
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
