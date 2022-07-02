import { useContext } from "react";
import GameCTX from "./GameCTX";
import Piece from "./Piece";
import { v4 as uuidv4 } from "uuid";

const ChessSet = () => {
    const { SQUARE_SIZE } = useContext(GameCTX);
    return (
        <>
            {Array.from({ length: 8 }, (_, i) => (
                <Piece
                    key={uuidv4()}
                    type="pawn"
                    shade="dark"
                    size={SQUARE_SIZE}
                    left={i * SQUARE_SIZE}
                    top={SQUARE_SIZE}
                />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
                <Piece
                    key={uuidv4()}
                    type="pawn"
                    shade="light"
                    size={SQUARE_SIZE}
                    left={i * SQUARE_SIZE}
                    top={6 * SQUARE_SIZE}
                />
            ))}
        </>
    );
};

export default ChessSet;
