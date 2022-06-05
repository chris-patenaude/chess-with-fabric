import fabric from 'fabric';
import Square from './Square';

const COLUMNS = 8;
const ROWS = 8;


/**
 * A Board is a Group of Squares
 */
export default Board = fabric.util.createClass(fabric.Group, {
    initialize(options = {}) {
        this.callSuper('initialize', this.generateBoardSquares(), options)
        this.set('inverted', !!options.inverted);
    },
    generateBoardSquares(){
        for (row in new Array(ROWS)) {
            for (column in new Array(COLUMNS)) {
                const square = new Square()
                // TODO generate a Square
            }
        }
        
        // TODO creates a list of squares
        return []
    },
    toString() {
        // TODO 
    }
})