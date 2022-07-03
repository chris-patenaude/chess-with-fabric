import { useContext, useEffect, useState } from "react";
import GameCTX from "./GameCTX";
import stitch from "./lib/stitch";
import light_king from "./assets/light_king.svg";
import light_queen from "./assets/light_queen.svg";
import light_rook from "./assets/light_rook.svg";
import light_bishop from "./assets/light_bishop.svg";
import light_knight from "./assets/light_knight.svg";
import light_pawn from "./assets/light_pawn.svg";
import dark_king from "./assets/dark_king.svg";
import dark_queen from "./assets/dark_queen.svg";
import dark_rook from "./assets/dark_rook.svg";
import dark_bishop from "./assets/dark_bishop.svg";
import dark_knight from "./assets/dark_knight.svg";
import dark_pawn from "./assets/dark_pawn.svg";

const pieceTypes = Object.freeze({
    light_king,
    light_queen,
    light_rook,
    light_bishop,
    light_knight,
    light_pawn,
    dark_king,
    dark_queen,
    dark_rook,
    dark_bishop,
    dark_knight,
    dark_pawn,
});

export const OBJECT_TYPE = "PIECE";

const Piece = ({ type, shade, size, left, top, id }) => {
    const { canvas } = useContext(GameCTX);
    const [piece, setPiece] = useState(null);
    useEffect(() => {
        if (!canvas) return;
        stitch
            .svg(pieceTypes[`${shade}_${type}`], {
                hasControls: false,
                squareSize: size,
                left: left || 0,
                top: top || 0,
                data: {
                    type: OBJECT_TYPE,
                    shade,
                    id,
                },
            })
            .then((res) => setPiece(res));
    }, [shade, type, size, left, top, id, canvas]);
    useEffect(() => {
        if (!canvas || !piece) return;
        // flatten multidimensional array and spread into canvas
        canvas.add(piece);
        return () => {
            // Cleanup piece on dismount
            canvas.remove(piece);
        };
    }, [canvas, piece]);
};
export default Piece;
