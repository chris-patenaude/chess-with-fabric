import { fabric } from "fabric";
const stitch = Object.freeze({
    canvas(elem, opt = undefined) {
        return new fabric.Canvas(elem, opt);
    },
    async svg(url, opt = {}) {
        const { squareSize } = opt;
        return new Promise((res) => {
            fabric.loadSVGFromURL(url, (objs, options) => {
                const loadedObjects = fabric.util.groupSVGElements(objs, options);
                const svgWidth = loadedObjects.width;
                const svgHeight = loadedObjects.height;
                if (!svgWidth || !svgHeight) throw UnrecognizedResolutionException;
                const longestSide = Math.max(options.width, options.height);
                const scaleRatio = squareSize / longestSide;
                loadedObjects.scale(scaleRatio);
                loadedObjects.set({
                    // Note: an invisible 1px stroke is added on to the width
                    // of all elements, so I subtract it to keep my boarder
                    // flush with any element the svg is on top of.
                    height: longestSide - loadedObjects.strokeWidth,
                    width: longestSide - loadedObjects.strokeWidth,
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
