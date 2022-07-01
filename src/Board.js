import { fabric } from "fabric";
import { useContext } from "react";
import GameCTX from "./GameCTX";

const Board = () => {
  const { canvas } = useContext(GameCTX);
  if (!canvas) return;
  console.log();
  const square = new fabric.Rect({
    width: 100,
    height: 100,
    left: 0,
    top: 0,
    fill: "blue",
    selectable: true,
  });
  canvas.add(square);
  canvas.requestRenderAll();
};
export default Board;
