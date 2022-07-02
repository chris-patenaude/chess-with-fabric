import { fabric } from "fabric";
const stitch = Object.freeze({
    canvas(elem, opt = undefined) {
        return new fabric.Canvas(elem, opt);
    },
    async svg(url, opt) {
        const { squareSize = 50 } = opt;
        return new Promise((res) => {
            fabric.loadSVGFromURL(url, (objs, options) => {
                const loadedObjects = fabric.util.groupSVGElements(objs, options);
                const svgWidth = loadedObjects.width;
                const svgHeight = loadedObjects.height;
                if (!svgWidth || !svgHeight) throw UnrecognizedResolutionException;
                const scaleRatio = squareSize / Math.max(svgHeight, svgWidth);
                loadedObjects.scale(scaleRatio);
                loadedObjects.set({
                    height: squareSize / scaleRatio,
                    width: squareSize / scaleRatio,
                    ...opt,
                });
                res(loadedObjects);
            });
        });
    },
});

export default stitch;

// ERRORS //
export const UnrecognizedResolutionException = new Error(
    "Failed to recognize SVG resolution: missing height or width attribute"
);
export const InvalidRenderParameters = new Error(
    "Missing or malformed render parameters: expected a canvas object and an array of fabric objects to be rendered"
);
