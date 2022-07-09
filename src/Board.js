import { fabric } from "fabric";
import { useContext, useEffect, useState } from "react";
import GameCTX from "./GameCTX";

const LIGHT = "#c2856e";
const DARK = "#664539";
const COLUMNS = 8;
const ROWS = 8;
export const OBJECT_TYPE = "SQUARE";

// TODO: refactor to use stitch library
const Board = () => {
    const { canvas, setBoard, SQUARE_SIZE } = useContext(GameCTX);
    const [board] = useState(() => {
        return new Array(ROWS).fill(null).map((_row, rowIndex) => {
            return Array(COLUMNS)
                .fill(null)
                .map((_col, colIndex) => {
                    const getColor = () => {
                        const rowIsEven = rowIndex % 2 === 0;
                        const columnIsEven = colIndex % 2 === 0;
                        if (
                            (rowIsEven && columnIsEven) ||
                            (!rowIsEven && !columnIsEven)
                        ) {
                            return LIGHT;
                        }
                        if (
                            (rowIsEven && !columnIsEven) ||
                            (!rowIsEven && columnIsEven)
                        ) {
                            return DARK;
                        }
                    };

                    return new fabric.Rect({
                        strokeWidth: 0,
                        width: SQUARE_SIZE,
                        height: SQUARE_SIZE,
                        left: colIndex * SQUARE_SIZE,
                        top: rowIndex * SQUARE_SIZE,
                        fill: getColor(),
                        selectable: false,
                        data: { type: OBJECT_TYPE },
                    });
                });
        });
    });

    useEffect(() => {
        if (!canvas || !board.length || !setBoard) return;
        // flatten multidimensional array and spread into canvas
        const flatBoard = board.map((row) => Object.values(row)).flat();
        canvas.add(...flatBoard);
        setBoard(board);
        return () => {
            flatBoard.forEach((square) => {
                canvas.remove(square);
            });
        };
    }, [canvas, board, setBoard]);
};
export default Board;
