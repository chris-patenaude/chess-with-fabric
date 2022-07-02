import fabric from "fabric";
const stitch = Object.freeze({
    canvas(elem, opt) {
        return new fabric.Canvas(elem, opt);
    },
});

export default stitch;
