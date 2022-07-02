import { fabric } from "fabric";
import { useContext, useEffect, useState } from "react";
import GameCTX from "./GameCTX";

const LIGHT = "#c2856e";
const DARK = "#664539";
const COLUMNS = 8;
const ROWS = 8;

// TODO: refactor to use stitch library
const Board = () => {
    const { canvas, setBoard, SQUARE_SIZE } = useContext(GameCTX);
    const [board] = useState(() => {
        return new Array(ROWS).fill(null).map((_row, rowIndex) => {
            const colKeys = Array.from({ length: COLUMNS }, (_, index) => {
                return String.fromCharCode(index + 97);
            });
            return colKeys.reduce((acc, key, colIndex) => {
                const getColor = () => {
                    const rowIsEven = rowIndex % 2 === 0;
                    const columnIsEven = colIndex % 2 === 0;
                    if ((rowIsEven && columnIsEven) || (!rowIsEven && !columnIsEven)) {
                        return LIGHT;
                    }
                    if ((rowIsEven && !columnIsEven) || (!rowIsEven && columnIsEven)) {
                        return DARK;
                    }
                };

                return {
                    ...acc,
                    [key]: new fabric.Rect({
                        width: SQUARE_SIZE,
                        height: SQUARE_SIZE,
                        left: colIndex * SQUARE_SIZE,
                        top: rowIndex * SQUARE_SIZE,
                        fill: getColor(),
                        selectable: false,
                    }),
                };
            }, {});
        });
    });

    useEffect(() => {
        if (!canvas || !board.length) return;
        // flatten multidimensional array and spread into canvas
        canvas.add(...board.map((row) => Object.values(row)).flat());
        setBoard(board);
    }, [canvas, board]);
};
export default Board;
