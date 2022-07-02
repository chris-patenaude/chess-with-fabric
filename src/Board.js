import { fabric } from "fabric";
import { useContext, useEffect, useState } from "react";
import GameCTX from "./GameCTX";

const LIGHT = "#c2856e";
const DARK = "#664539";
const COLUMNS = 8;
const ROWS = 8;

const Board = () => {
  const { canvas } = useContext(GameCTX);
  const [board] = useState(() => {
    return new Array(ROWS).fill(null).map((_, rowIndex) => {
      return new Array(COLUMNS).fill("").map((_, colIndex) => {
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

        return new fabric.Rect({
          width: 100,
          height: 100,
          left: colIndex * 100,
          top: rowIndex * 100,
          fill: getColor(),
          selectable: false,
        });
      });
    });
  });

  useEffect(() => {
    if (!canvas || !board.length) return;
    // flatten multidimensional array and spread into canvas
    canvas.add(...board.flat());
  }, [canvas, board]);
};
export default Board;
