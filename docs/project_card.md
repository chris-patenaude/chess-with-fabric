# CHESS WITH FABRIC!!!
## Description
Chess with Fabric is a simple peer to peer chess app build using fabric.js to manipulate a canvas of a chess board and pieces. The application communicates through a web socket api allowing players to play a basic game of chess via a sharable link.

## User Stories
- As a user, I want a digital version of a chess board, so I can play chess with people online. 
- As a user, I want to be able to share a link, so I can invite another user to play.
- As a user, I want to drag chess pieces on the board, so I can capture pieces or move position. 
- As a user, I want to undo my last move if I made a mistake and the option is available.
- As a user, I want to know when I've made an invalid move, so I can try again. 
- As a user, I want to board to flip so the perspective is based on my color.
- As a user, I want to see the pieces my opponent and I have captured so I can visually see the material difference.
- As a user, I want to see a numeric representation of the material difference between my opponent and I, so I know who has the material advantage at a glance. 
- As a user, I want paste a link in a browser so I can join a new chess game.
- As a user, I want to be informed when I've won/lost/draw a match, so I can challenge to a rematch or quit. 
- As a user, I want to be able to resign or offer a draw during a game, so I can end the game early if lose or draw is inevitable.

## Requirements
### Chess Rules 
The application must follow the rules of chess.
- Piece movement
- Capture rules
- End game conditions (win/draw/lose)
- Turn restrictions (i.e. can only act on ones turn)

### Online Multi Player
The application must allow connection and real time updates between two players, allowing for a digital game of chess.
- Peer to Peer connection (web sockets)
- URL based invitation system

The application must generate a url that can be shared to allow users to join a game. 

### UI/UX
The application must support drag and drop movement for chess pieces.

The application must support undo functionality allowing players to undo their last move. This feature should be optional depending on the game settings.

The application must visually signal to the user that they have made an invalid move.
- Piece should return to original position
- short indication that the move was invalid

The application board must orient itself automatically based on the users color (i.e. if a player has control over the dark squares, then the board should be rotated to the dark squares perspective). 

The application must display the captured pieces of both the user and their opponent.

The application must display the numeric material difference between the two players. 

The application must support the ability for either user to challenge to a rematch after a game has concluded

The application must allow players to offer a draw, allowing their opponent the ability to accept or reject the offer. 

The application must allow players to resign, automatically forfeiting the game.

## Data Entities
### Game
#### Attributes
- State: START | ONGOING | WON | LOST | DRAW
- playerColor: light | dark
- capturedPieces: Piece[]
- moves: Stack<Move>
- board: Board

#### Methods
- capturePiece(Piece):void
- makeMove(Piece, Square):void
- getGameStatus(): START | ONGOING | WON | LOST | DRAW

### Board
#### Attributes
- inverted:boolean
- boardState: <Square, Piece | null>

#### Methods
- setPiece(Piece, Square):void
- movePiece(Piece, Square):void
- removePiece(Piece):void
- getAvailableSquares(Piece): Squares[]

### Square
#### Attributes
- canvasPosition: {top:number, left: number}
- gameCoordinates: string
- isDark: boolean

### Move
#### Attributes
- piece: Piece
- destination: Square
### Piece
#### Attributes
- id: string 
- captured: boolean
- isDark: boolean
- type: string

#### Methods
- promote(type:string):void

## Frontend 
- Web Framework: React
- Canvas Library: Fabric js 
- Views: Start view, game view, end game view.
- Need to check that the incoming board is valid

## Backend 
- Web socket api to facilitate peer to peer communication.
- No database, just state changes on the client sides.
- Life cycle: user makes a move > push board data to socket api > data is relayed to opponent and board is updated.