import { useState } from "react";
import settings from "./settings.json";
import Canvas from "./Canvas";
import GameCTX, { GameState } from "./GameCTX";
import Board from "./Board";
import ChessSet from "./ChessSet";

const { SQUARE_SIZE, VERBOSE } = settings;
const CHAR_BASE = "a".charCodeAt();
const DIMENSION = 8;

const Game = () => {
    const [canvas, setCanvas] = useState(undefined);
    const [gameState, setGameState] = useState(GameState.IDLE);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [activePieces, setActivePieces] = useState(undefined);
    const [board, setBoard] = useState(undefined);

    const getSquare = (col, row) => {
        if (typeof col !== "string" || col.length !== 1) {
            throw InvalidParameterList;
        }
        if (isNaN(row)) throw InvalidParameterList;
        let colIndex = col.toLowerCase().charCodeAt() - CHAR_BASE;
        let rowIndex = DIMENSION - row;
        // console.log({ colIndex, rowIndex, col, row });
        let square = board[rowIndex]?.[colIndex];
        if (!square) throw OutOfBounds;
        return square;
    };

    const InvalidParameterList = new Error(
        "Parameters do not match expected values"
    );
    const OutOfBounds = new Error(
        "Square does not exist at designated location."
    );

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
                getSquare,
                VERBOSE,
            }}
        >
            <Canvas
                style={{
                    height: SQUARE_SIZE * DIMENSION,
                    width: SQUARE_SIZE * DIMENSION,
                }}
            >
                <Board />
                <ChessSet />
            </Canvas>
        </GameCTX.Provider>
    );
};

export default Game;
