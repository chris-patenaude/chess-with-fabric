import { useState } from "react";
import settings from "./settings.json";
import Canvas from "./Canvas";
import GameCTX, { GameState } from "./GameCTX";
import Board from "./Board";
import ChessSet from "./ChessSet";

const Game = () => {
    const [canvas, setCanvas] = useState(undefined);
    const [gameState, setGameState] = useState(GameState.IDLE);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [activePieces, setActivePieces] = useState(undefined);
    const [board, setBoard] = useState(undefined);
    const [SQUARE_SIZE] = useState(settings.SQUARE_SIZE);

    return (
        <GameCTX.Provider
            value={{
                isMouseDown,
                setIsMouseDown,
                gameState,
                setGameState,
                canvas,
                setCanvas,
                board,
                setBoard,
                activePieces,
                setActivePieces,
                SQUARE_SIZE,
            }}
        >
            <Canvas style={{ height: SQUARE_SIZE * 8, width: SQUARE_SIZE * 8 }}>
                <Board />
                <ChessSet />
            </Canvas>
        </GameCTX.Provider>
    );
};

export default Game;
