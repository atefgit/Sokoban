// // Sokoban.ts
import { Game } from "./Game.js";

const game = new Game(50, 50, 10);
game.updateDisplay(); // Premier affichage

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      game.play("up");
      break;
    case "ArrowDown":
      game.play("down");
      break;
    case "ArrowLeft":
      game.play("left");
      break;
    case "ArrowRight":
      game.play("right");
      break;
  }
});

document.getElementById("undo-button")?.addEventListener("click", () => {
  game.undo();
});



