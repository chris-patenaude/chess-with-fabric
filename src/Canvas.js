// Inspiration from https://github.com/asotog/fabricjs-react/blob/master/src/index.tsx
import { useContext, useEffect, useRef } from "react";
import GameCTX from "./GameCTX";
import stitch from "./lib/stitch";
import { OBJECT_TYPE as PIECE } from "./Piece";

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

        const initEventListeners = () => {
            window.addEventListener("resize", setCanvasDimensions, false);
            // * Note: there may be a better way to center the
            // * object on the pointer but I couldn't find it.
            // really feels like there should be a build in method for this...
            const centerPieceOnPointer = (piece, pointer) => {
                piece.set({
                    left: pointer.x - SQUARE_SIZE / 2,
                    top: pointer.y - SQUARE_SIZE / 2,
                });
                piece.setCoords();
            };
            canvas.on("object:moving", (opt) => {
                const pointer = canvas.getPointer(opt.e);
                const activePiece = opt.target;
                if (!activePiece) return;
                centerPieceOnPointer(activePiece, pointer);
            });
            canvas.on("mouse:down", (opt) => {
                const pointer = canvas.getPointer(opt.e);
                const activePiece = opt.target;
                if (!activePiece) return;
                activePiece.data.origin = {
                    left: activePiece.left,
                    top: activePiece.top,
                };
                centerPieceOnPointer(activePiece, pointer);
            });
            canvas.on("mouse:up", (opt) => {
                const pointer = canvas.getPointer(opt.e);
                const activePiece = opt.target;
                if (!pointer || !activePiece) return;

                // Note: setCoords() tells the bounding box to move as well.
                const move = (override = null) => {
                    if (override) {
                        activePiece.set({
                            left: override.left || 0,
                            top: override.top || 0,
                        });
                        activePiece.setCoords();
                        return;
                    }
                    const left =
                        Math.round(activePiece.left / SQUARE_SIZE) *
                        SQUARE_SIZE;
                    const top =
                        Math.round(activePiece.top / SQUARE_SIZE) * SQUARE_SIZE;
                    activePiece.set({ left, top });
                    activePiece.setCoords();
                };

                const capture = (enemyPiece) => {
                    move();
                    canvas.remove(enemyPiece);
                };

                const otherPieces = canvas
                    .getObjects()
                    .filter(
                        (obj) => obj.data.type === PIECE && obj !== activePiece
                    );

                const squareOccupance = canvas._searchPossibleTargets(
                    otherPieces,
                    pointer
                );

                // TODO: add check to see if legal position
                if (!squareOccupance) return move();
                if (squareOccupance.data.shade !== activePiece.data.shade) {
                    return capture(squareOccupance);
                }

                // snap to original position
                move({
                    top: activePiece.data.origin.top,
                    left: activePiece.data.origin.left,
                });

                // TODO: add branch
                // IF not legal move THEN return to origin
                // IF not occupied THEN move to square
                // IF is enemy THEN capture piece
                // return to origin
            });
        };

        setCanvasDimensions();
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
