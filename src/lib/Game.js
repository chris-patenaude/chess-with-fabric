import Board from "./fabric/subclasses/Board";

export default class Game {
    constructor(playerColor) {
        if(!PlayerColor[playerColor]) {
            // throw an Invalid player color exception
        }
        this.state = GameState.START;
        this.playerColor = PlayerColor[playerColor];
        this.capturedPieces = new Array();
        this.moves = new Array();
        this.board = new Map(); // squares and pieces
    }

    capturedPiece(piece) {
        // TODO capture an opposing players piece
    }

    makeMove(piece, destinationSquare) {
        // TODO move the current players piece
    }

    getAvailableMoves(piece) {
        // TODO get all Moves for a given Piece
    }

    toString() {
        // TODO
    }
}

export const PlayerColor = Object.freeze({
    LIGHT: "LIGHT",
    DARK: "DARK"
})

export const GameState = Object.freeze({
    START: "START",
    ONGOING: "ONGOING",
    WON: "WON",
    LOST: "LOST",
    DRAW: "DRAW",
})