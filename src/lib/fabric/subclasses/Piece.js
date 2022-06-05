import fabric from 'fabric';
// TODO: research how to add a svg to this.
export default Piece = fabric.util.createClass(fabric.Path, {
    initialize(options = {}) {
        this.callSuper('initialize', options)
        this.id = options.id
        this.captured = options.captured
        this.color = options.color
        this.type = options.type
    },
    async loadSVG() {
        // TODO fabric.loadSVGFromURL
    },
    toString() {
        // TODO 
    }
})