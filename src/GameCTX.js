import { createContext } from "react";

export const GameState = Object.freeze({
    DRAGGING: "DRAGGING",
    PANNING: "PANNING",
    IDLE: "IDLE",
});

export default createContext({
    gameState: GameState.IDLE,
    isMouseDown: false,
    VERBOSE: false,
    SQUARE_SIZE: undefined,
    setIsMouseDown: undefined,
    setGameState: undefined,
    canvas: undefined,
    setCanvas: undefined,
    board: undefined,
    setBoard: undefined,
    activePieces: undefined,
    setActivePieces: undefined,
    getSquare: undefined,
});
