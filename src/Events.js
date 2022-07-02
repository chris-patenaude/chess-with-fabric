import { fabric } from "fabric";
import { useContext } from "react";
import GameCTX, { GameState } from "./GameCTX";

// only execute event handler definitions once
let setupComplete = false;
const Events = () => {
    const { canvas, isMouseDown, setIsMouseDown, gameState, setGameState } = useContext(GameCTX);

    if (!canvas || setGameState || setIsMouseDown || setupComplete) return;

    // Add Event Listeners
    canvas.on("mouse:down", ({ target }) => {
        setIsMouseDown(true);
        if (target) return setGameState(GameState.DRAGGING);
        setGameState(GameState.PANNING);
        canvas.setCursor("grab");
        canvas.renderAll();
    });

    canvas.on("mouse:up", () => {
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
    setupComplete = true;
};
export default Events;
