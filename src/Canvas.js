// Inspiration from https://github.com/asotog/fabricjs-react/blob/master/src/index.tsx
import { useContext, useEffect, useRef } from "react";
import GameCTX from "./GameCTX";
import stitch from "./lib/stitch";

// uncontrolled component implementation
const Canvas = (props) => {
    // set default props
    const { setCanvas, SQUARE_SIZE } = useContext(GameCTX);
    const { children, className, style } = props;
    const canvasElement = useRef(null);
    const wrapperElement = useRef(null);
    useEffect(() => {
        if (!setCanvas) return;
        const canvas = stitch.canvas(canvasElement.current, {
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
        const initEventListeners = () => {
            window.addEventListener("resize", setCanvasDimensions, false);
            canvas.on("mouse:up", (opt) => {
                const pointer = canvas.getPointer(opt.e);
                const activePiece = opt.target;
                if (!pointer || !activePiece) return;
                // TODO: add check to see if square is occupied
                // TODO: add check to see if enemy Piece
                // TODO: add check to see if legal position
                // TODO: add branch
                // IF not legal move THEN return to origin
                // IF not occupied THEN move to square
                // IF is enemy THEN capture piece
                // return to origin
                const left =
                    Math.round(activePiece.left / SQUARE_SIZE) * SQUARE_SIZE;
                const top =
                    Math.round(activePiece.top / SQUARE_SIZE) * SQUARE_SIZE;
                activePiece.set({ left, top });
            });
        };

        initEventListeners();
        setCanvas(canvas);

        // cleanup event listeners and canvas object on dismount
        return () => {
            canvas.dispose();
            window.removeEventListener("resize", setCanvasDimensions);
        };
    }, [setCanvas, SQUARE_SIZE]);

    return (
        <div ref={wrapperElement} className={className} style={style}>
            <canvas ref={canvasElement} />
            {children}
        </div>
    );
};

export default Canvas;
