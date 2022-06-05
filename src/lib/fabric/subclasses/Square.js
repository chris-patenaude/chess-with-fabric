import fabric from 'fabric';

export default Square = fabric.util.createClass(fabric.rect, {
    initialize(options = {}) {
        this.callSuper('initialize', options)
        this.gameCoordinates = options.gameCoordinates
        this.color = options.color
    },
    toString() {
        // TODO 
    }
})