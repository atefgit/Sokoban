// Rock.ts
export class Rock {
    private x: number;
    private y: number;
    private immovable: boolean = false; 
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  
    getX(): number {
      return this.x;
    }
  
    getY(): number {
      return this.y;
    }
    public setPosition(x: number, y: number): void {
      this.x = x;
      this.y = y;
    }
  
    move(direction: string) {
      if (this.immovable) return; 
  
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
  
    setImmovable(value: boolean) {
      this.immovable = value;
    }
    
    isImmovable(): boolean {
      return this.immovable;
    }
  
  }
  