import { createContext } from "react";

export const GameState = Object.freeze({
    DRAGGING: "DRAGGING",
    PANNING: "PANNING",
    IDLE: "IDLE",
});

export default createContext({
    isMouseDown: false,
    setIsMouseDown: undefined,
    gameState: GameState.IDLE,
    setGameState: undefined,
    canvas: undefined,
    setCanvas: undefined,
    board: undefined,
    setBoard: undefined,
    activePieces: undefined,
    setActivePieces: undefined,
    SQUARE_SIZE: undefined,
});
