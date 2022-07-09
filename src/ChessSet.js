import { useContext } from "react";
import GameCTX from "./GameCTX";
import Piece from "./Piece";
import { v4 as uuidv4 } from "uuid";
import chessSet from "./chessSet.json";

const ChessSet = () => {
    const { SQUARE_SIZE, board, getSquare } = useContext(GameCTX);
    return (
        <>
            {Array.isArray(chessSet) &&
                !!board &&
                chessSet.map(({ type, shade, position }) => {
                    let { top, left } = getSquare(...position);
                    let id = `${shade}-${type}-${uuidv4()}`;
                    return (
                        <Piece
                            key={id}
                            type={type}
                            shade={shade}
                            size={SQUARE_SIZE}
                            left={left}
                            top={top}
                            id={id}
                        />
                    );
                })}
        </>
    );
};

export default ChessSet;
