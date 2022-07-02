import { fabric } from "fabric";
import { useContext, useEffect, useState } from "react";
import GameCTX from "./GameCTX";

const Board = () => {
  const { canvas } = useContext(GameCTX);
  const [board] = useState(
    () =>
      new fabric.Rect({
        width: 100,
        height: 100,
        left: 0,
        top: 0,
        fill: "blue",
        selectable: true,
      })
  );
  useEffect(() => {
    if (!canvas || !board) return;
    canvas.add(board);
  }, [canvas, board]);
};
export default Board;
