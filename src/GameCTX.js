import { createContext } from "react";

export const GameState = Object.freeze({
    DRAGGING: "DRAGGING",
    PANNING: "PANNING",
    IDLE: "IDLE",
});

export default createContext({
    isMouseDown: false,
    setIsMouseDown: () => console.warn("setIsMouseDown() is undefined"),
    gameState: GameState.IDLE,
    setGameState: () => console.warn("setGameState() is undefined"),
    canvas: undefined,
    // this is left to the react component to define
    setCanvas: () => console.warn("setCanvas() is undefined"),
    board: undefined,
    setBoard: () => console.warn("setBoard() is undefined"),
    activePieces: undefined,
    setActivePieces: () => console.warn("setActivePieces() is undefined"),
    SQUARE_SIZE: undefined,
});
