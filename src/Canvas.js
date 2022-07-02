// Inspiration from https://github.com/asotog/fabricjs-react/blob/master/src/index.tsx
import { fabric } from "fabric";
import { useContext, useEffect, useRef } from "react";
import GameCTX from "./GameCTX";

// uncontrolled component implementation
const Canvas = (props) => {
  // set default props
  const { setCanvas } = useContext(GameCTX);
  const { children, className, style } = props;
  const canvasElement = useRef(null);
  const wrapperElement = useRef(null);
  useEffect(() => {
    if (!setCanvas) return;
    const canvas = new fabric.Canvas(canvasElement.current, {
      backgroundColor: "grey",
      selection: false,
      renderOnAddRemove: true,
    });

    /**
     * sets dimensions based on wrapper elements height and width
     */
    const setCanvasDimensions = () => {
      canvas.setHeight(wrapperElement.current?.clientHeight || 0);
      canvas.setWidth(wrapperElement.current?.clientWidth || 0);
      canvas.renderAll();
    };

    setCanvasDimensions();
    // TODO: Not sure what the third arg is doing here
    window.addEventListener("resize", setCanvasDimensions, false);
    setCanvas(canvas);

    // cleanup event listeners and canvas object on dismount
    return () => {
      canvas.dispose();
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, [setCanvas]);

  return (
    <div ref={wrapperElement} className={className} style={style}>
      <canvas ref={canvasElement} />
      {children}
    </div>
  );
};

export default Canvas;
