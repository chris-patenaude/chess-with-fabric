import { fabric } from "fabric";
import { useContext } from "react";
import { useLayoutEffect } from "react";
import GameCTX from "./GameCTX";

const CANVAS_ID = "game-canvas";

const Canvas = ({ children }) => {
  const { setCanvas } = useContext(GameCTX);

  // Initialize fabric canvas object and add to the App
  // context and state.
  useLayoutEffect(() => {
    const fabricCanvas = new fabric.Canvas(CANVAS_ID, {
      height: 800,
      width: 800,
      selection: false,
      backgroundColor: "grey",
    });

    // Render Objects
    fabricCanvas.requestRenderAll();
    setCanvas(fabricCanvas);
  }, [setCanvas]);

  return <canvas id={CANVAS_ID}>{children}</canvas>;
};
export default Canvas;
