import { fabric } from "fabric";
import { useContext } from "react";
import GameCTX, { GameState } from "./GameCTX";

// only execute event handler definitions once
let setupComplete = false;
const Events = () => {
  const { canvas, isMouseDown, setIsMouseDown, gameState, setGameState } =
    useContext(GameCTX);

  if (!canvas || setGameState || setIsMouseDown || setupComplete) return;

  // Add Event Listeners
  canvas.on("mouse:down", ({ target }) => {
    // console.log("mouse:down");
    setIsMouseDown(true);
    if (target) return setGameState(GameState.DRAGGING);
    setGameState(GameState.PANNING);
    canvas.setCursor("grab");
    canvas.renderAll();
  });

  canvas.on("mouse:up", () => {
    // console.log("mouse:up");
    setIsMouseDown(false);
    setGameState(GameState.IDLE);
    canvas.setCursor("default");
    canvas.renderAll();
  });

  canvas.on("mouse:move", ({ e }) => {
    console.log({ isMouseDown, gameState });
    if (!isMouseDown || gameState !== GameState.PANNING) return;
    const { movementX, movementY } = e;
    const delta = new fabric.Point(movementX, movementY);
    canvas.relativePan(delta);
  });
  console.log("Event handlers initialized");
  setupComplete = true;
};
export default Events;
