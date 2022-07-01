import { fabric } from "fabric";
import { useContext } from "react";
import GameCTX, { GameState } from "./GameCTX";

const Events = () => {
  const { canvas, isMouseDown, setIsMouseDown, gameState, setGameState } =
    useContext(GameCTX);

  if (!canvas) return;
  // Add Event Listeners
  canvas.on("mouse:down", ({ target }) => {
    console.log("mouse:down");
    setIsMouseDown(true);
    if (target) return setGameState(GameState.DRAGGING);
    setGameState(GameState.PANNING);
    canvas.setCursor("grab");
    canvas.renderAll();
  });

  canvas.on("mouse:up", () => {
    console.log("mouse:up");
    setIsMouseDown(false);
    setGameState(GameState.IDLE);
    canvas.setCursor("default");
    canvas.renderAll();
  });

  canvas.on("mouse:move", ({ e }) => {
    if (!isMouseDown || gameState !== GameState.PANNING) return;
    const { movementX, movementY } = e;
    const delta = new fabric.Point(movementX, movementY);
    canvas.relativePan(delta);
  });
};
export default Events;
