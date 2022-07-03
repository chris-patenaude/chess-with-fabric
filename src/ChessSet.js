import { useContext } from "react";
import GameCTX from "./GameCTX";
import Piece from "./Piece";
import { v4 as uuidv4 } from "uuid";

const ChessSet = () => {
    const { SQUARE_SIZE } = useContext(GameCTX);
    return (
        <>
            {/* TODO do something about the literals  */}
            <Piece type="rook" shade="dark" size={SQUARE_SIZE} left={0} top={0} />
            <Piece type="knight" shade="dark" size={SQUARE_SIZE} left={1 * SQUARE_SIZE} top={0} />
            <Piece type="bishop" shade="dark" size={SQUARE_SIZE} left={2 * SQUARE_SIZE} top={0} />
            <Piece type="queen" shade="dark" size={SQUARE_SIZE} left={3 * SQUARE_SIZE} top={0} />
            <Piece type="king" shade="dark" size={SQUARE_SIZE} left={4 * SQUARE_SIZE} top={0} />
            <Piece type="bishop" shade="dark" size={SQUARE_SIZE} left={5 * SQUARE_SIZE} top={0} />
            <Piece type="knight" shade="dark" size={SQUARE_SIZE} left={6 * SQUARE_SIZE} top={0} />
            <Piece type="rook" shade="dark" size={SQUARE_SIZE} left={7 * SQUARE_SIZE} top={0} />
            {Array.from({ length: 8 }, (_, i) => (
                <Piece
                    key={`dark_pawn_${i}`}
                    type="pawn"
                    shade="dark"
                    size={SQUARE_SIZE}
                    left={i * SQUARE_SIZE}
                    top={SQUARE_SIZE}
                />
            ))}

            <Piece type="rook" shade="light" size={SQUARE_SIZE} left={0} top={7 * SQUARE_SIZE} />
            <Piece type="knight" shade="light" size={SQUARE_SIZE} left={1 * SQUARE_SIZE} top={7 * SQUARE_SIZE} />
            <Piece type="bishop" shade="light" size={SQUARE_SIZE} left={2 * SQUARE_SIZE} top={7 * SQUARE_SIZE} />
            <Piece type="queen" shade="light" size={SQUARE_SIZE} left={3 * SQUARE_SIZE} top={7 * SQUARE_SIZE} />
            <Piece type="king" shade="light" size={SQUARE_SIZE} left={4 * SQUARE_SIZE} top={7 * SQUARE_SIZE} />
            <Piece type="bishop" shade="light" size={SQUARE_SIZE} left={5 * SQUARE_SIZE} top={7 * SQUARE_SIZE} />
            <Piece type="knight" shade="light" size={SQUARE_SIZE} left={6 * SQUARE_SIZE} top={7 * SQUARE_SIZE} />
            <Piece type="rook" shade="light" size={SQUARE_SIZE} left={7 * SQUARE_SIZE} top={7 * SQUARE_SIZE} />
            {Array.from({ length: 8 }, (_, i) => (
                <Piece
                    key={`light_pawn_${i}`}
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
