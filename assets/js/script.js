// Class For pieces
class Piece {
  // Constructor for setting default parameters
  constructor( color, pieceType, square) {
    this._pieceType = pieceType;
    switch (this._pieceType) {
      case 'pawn':
        this._char = 'p';
        break;
      case 'rook':
        this._char = 'r';
        break;
      case 'bishop':
        this._char = 'b';
        break;
      case 'knight':
        this._char = 'n';
        break;
      case 'queen':
        this._char = 'q';
        break;
      case 'king':
        this._char = 'k';
        break;
      default:
        this._char = '';
        break;
    }
    this._hasMoved = false;
    this._color = color;

    this._square = square;
    this._isSelected = false;
    this._row = getRow(this._square);
    this._col = getCol(this._col);
  }
  // Getter and Setters for variables
  get char() {
    return this._char;
  }
  get hasMoved() {
    return this._hasMoved;
  }
  set hasMoved(hasMoved) {
    this._hasMoved = hasMoved;
  }
  get color() {
    return this._color;
  }
  get pieceType() {
    return this._pieceType;
  }
  set pieceType(pieceType) {
    this._pieceType = pieceType;
  }
  get square() {
    return this._square;
  }
  set square(square) {
    this._square = square;
  }
  get row() {
    return getRow(this._square);
  }
  get col() {
    return getCol(this._square);
  }
  get isSelected() {
    return this._isSelected;
  }
  set isSelected(isSelected) {
    this._isSelected = isSelected;
  }
}

/**
* Temporary method to categorise Menu stuff for sorting later
* This is a mess !!!!
*/
function menuStuff() {
  // Menu items
  const list = document.getElementsByTagName('a');

  for (let item of list) {
    item.addEventListener("click", function(){
      if (item.innerHTML == "Tutorial") {
        initTutorial();
      }
      if (item.innerHTML == "Default") {
        let squares = document.getElementsByClassName("square");
        // Loop through each square in squares
        for (let square of squares) {
          // Assign each square an equivilant data taag to ap it to the array.
          if (square.classList.contains("red")) {
            square.classList.remove("red");
            square.classList.add("white");
          }
          if (square.classList.contains("green")) {
            square.classList.remove("green");
            square.classList.add("black");
          }
        }
      }
      if (item.innerHTML == "Red and Green") {
        const squares = document.getElementsByClassName("square");
        // Loop through each square in squares
        for (let square of squares) {
          // Assign each square an equivilant data taag to ap it to the array.
          if (square.classList.contains("white")) {
            square.classList.remove("white");
            square.classList.add("red");
          }
          if (square.classList.contains("black")) {
            square.classList.remove("black");
            square.classList.add("green");
          }
        }
      }
    });
  }

  // dropdown menu function
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
}


// Additional state variables and theyre default values
let isPieceSelected = false;
let selectedPiece = null;
let isWhiteToMove = true;
let selectedPieceElement = null;

// Controller
const chessController = {
  init: function() {

    /* When the user clicks on the button,
    toggle between hiding and showing the dropdown content */

    // Create a chess board array for controlling logic and movement and then use this to render visuals to the screen. Easy!
    let chessboard = [
      [new Piece("black", "rook", 0), new Piece("black", "knight", 1), new Piece("black", "bishop", 2), new Piece("black", "queen", 3), new Piece("black", "king", 4), new Piece("black", "bishop", 5), new Piece("black", "knight", 6), new Piece("black", "rook", 7)],
      [new Piece("black", "pawn", 8), new Piece("black", "pawn", 9), new Piece("black", "pawn", 10), new Piece("black", "pawn", 11), new Piece("black", "pawn", 12), new Piece("black", "pawn", 13), new Piece("black", "pawn", 14), new Piece("black", "pawn", 15)],
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      [new Piece("white", "pawn", 48), new Piece("white", "pawn", 49), new Piece("white", "pawn", 50), new Piece("white", "pawn", 51), new Piece("white", "pawn", 52), new Piece("white", "pawn", 53), new Piece("white", "pawn", 54), new Piece("white", "pawn", 55)],
      [new Piece("white", "rook", 56), new Piece("white", "knight", 57), new Piece("white", "bishop", 58), new Piece("white", "queen", 59), new Piece("white", "king", 60), new Piece("white", "bishop", 61), new Piece("white", "knight", 62), new Piece("white", "rook", 63)],
    ];
    let moveCounter = 1;

    // create an array of squares on the board called sqaures
    const squares = document.getElementsByClassName("square");
    // Loop through each square in squares
    for (let i = 0; i < squares.length; i++) {
      // Assign each square an equivilant data tag to coorelate it to the array.
      squares[i].setAttribute("data-square", i);
    }

    //  Lets render the pieces to the chessBoard.
    chessView.renderChessboard(chessboard, squares);

    // Event listener for Clicking on a square
    for (let square of squares) {
      square.addEventListener("click", function () {
        // If a piece is Selected Then check for moving the selected Piece
        if (isPieceSelected) {
          // Check if move is legal
          let preMoveChessboard = chessboard.map(function(arr) {
            return arr.slice();
          });
          
          if (checkifMoveIsLegal(selectedPiece, square, chessboard)) {
            if (isWhiteToMove) {
              if (isKingInCheck('white', movePiece(square, chessboard, selectedPiece), squares)) {
                isCheckMate('white', movePiece(square, chessboard, selectedPiece), squares);
                if(isPieceSelected) {
                  resetSelection(square.firstChild);
                }
                chessboard = preMoveChessboard;
                return;
              }
            }
            else {
              if (isKingInCheck('black', movePiece(square, chessboard, selectedPiece), squares)) {
                isCheckMate('white', movePiece(square, chessboard, selectedPiece), squares);
                if(isPieceSelected) {
                  resetSelection(square.firstChild);
                }
                chessboard = preMoveChessboard;
                return;
              }
            }
            // Move the piece
            chessboard = movePiece(square, chessboard, selectedPiece);
            // update the move counter
            moveCounter = updateNotation(selectedPiece, square, moveCounter);
            // reset the selection of pieces
            resetSelection(square.firstChild);
            // update the datset to represent the movement of teh piece on the html end
            chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)].square = square.dataset.square;
            // Render the move to the screen
            chessView.renderChessboard(chessboard, squares);
            // Change the players turn
            changePlayerTurn();
          }
          // Illegal move resets pieces selection
          else {
            if(isPieceSelected) {
              resetSelection(square.firstChild);
            }
          }
        }
        // No piece was Previously selected so lets see if we can select one
        else {
          // Is it whites Turn
          if (isWhiteToMove) {
            // Is there a white piece here
            if ( chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)] != 0 && chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)].color == "white") {
              // set selected piece to the equivilant object
              selectedPiece = chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)];
              selectedPieceElement = square.firstChild;
              // Decorate the piece to make it selected
              selectPiece(selectedPieceElement);
              isPieceSelected = true;
            }
            else {
              alert("It is whites turn");
            }
          }
          // Same check if it is black to move
          else {
            if ( chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)] != 0 && chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)].color == "black")  {
              // set selected piece to the equivilant object
              selectedPiece = chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)];
              selectedPieceElement = square.firstChild;
              // Decorate the piece to make it selected
              selectPiece(selectedPieceElement);
              isPieceSelected = true;
            }
            else {
              alert("It is blacks turn");
            }
          }
        }
      });
    }
  }
};


/** Find the position of the selected king on the board */
function findKingSquare(playerColor, chessboard) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let piece = chessboard[row][col];
      if (piece !== 0 && piece.color === playerColor && piece.pieceType === 'king') {
        return row * 8 + col;
      }
    }
  }
  return -1; // King not found
}

/** Get the row of the index given */
function getRow(squareId) {
  return Math.floor(squareId / 8);
}

/** Get the column of the index given */
function getCol(squareId) {
  return squareId % 8;
}

/** CHeck which direction the piece is moving */
function getDirection(isDirection, direction) {
  if (isDirection) {
    return direction * -1;
  }
  return direction;
}

/** Reset the piece selection state */
function resetSelection(piece) {
  selectedPieceElement.classList.remove("selected");
  isPieceSelected = false;
  selectedPiece = null;
}

/** Change player*/
function changePlayerTurn() {
  isWhiteToMove = isWhiteToMove ? false : true;
}

/** Checks if the polayer is in check */
function isKingInCheck(playerColor, chessboard, squares) {
  let kingSquare = findKingSquare(playerColor, chessboard);

  for (let square of squares) {
    let piece = chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)];
    if (piece !== 0 && piece.color !== playerColor) {
      if (checkifMoveIsLegal(piece, squares[kingSquare], chessboard)) {
        alert(playerColor + ": You are in check");
        return true;
      }
    }
  }

  return false; // King is not in check
}

/** Checks if the polayer is in check */
function isCheckMate(playerColor, chessboard, squares) {
  // Check all the squares
  for (let square of squares) {
    // create piece objected currently selecetd
    let piece = chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)];
    // check piece is not an empty square and that is the same color as the current player
    if (piece !== 0 && piece.color == playerColor) {
      // check if the move is legal 
      if (checkifMoveIsLegal(piece, square, chessboard)) {
        if (isKingInCheck('white', movePiece(square, chessboard, selectedPiece), squares)) {
          console.log('Valid move');
          return false;
        }
      }
    }
  }
  alert('Checkmate');
  return true; 
}

/**
* This does way too much right now and needs to be refactored
*/
function checkifMoveIsLegal(selectedPieceElement, square, chessboard) {
  // setting variables for current square
  let currentSquare = parseInt(selectedPieceElement.square);
  let currentSquareRow = getRow(currentSquare);
  let currentSquareCol = getCol(currentSquare);
  // Setting variables for selectedSquare
  let selectedSquare = parseInt(square.dataset.square);
  let selectedSquareRow = getRow(selectedSquare);
  let selectedSquareCol = getCol(selectedSquare);
  // current Piece variables
  let currentPiece = chessboard[currentSquareRow][currentSquareCol];
  // selected Piece variables
  let selectedPiece = chessboard[selectedSquareRow][selectedSquareCol];

  // Movement Variables
  const LEFT = -1;
  const RIGHT = 1;
  const UP = - 8;
  const DOWN = + 8;
  const UPRIGHT = -7;
  const UPLEFT = -9;
  const DOWNLEFT = 7;
  const DOWNRIGHT = 9;
  let isBackwards = true;
  let isLeft = true;
  let rowChange;
  let colChange;
  
  // destination square check
  let isDestinationSquareEmpty = isSquareEmpty(selectedPiece);

  // Squares array
  let squares = document.getElementsByClassName("square");

  // checks if pieces are the same colour
  if (isSameColor(currentPiece, selectedPiece)) {
    return false;
  }

  // Squares Moved
  let squaresMoved = getSquaresMoved(currentSquare, selectedSquare);


  // check Movement of pieces
  switch (currentPiece.pieceType) {
    //  checking the legality of the pawn move
    case 'pawn':
      // white Moves
      let direction = UP;
      let takeLeft = UPLEFT;
      let takeRight = UPRIGHT;
      // black Moves
      if (currentPiece.color == 'black') {
        direction = DOWN;
        takeLeft = DOWNLEFT;
        takeRight = DOWNRIGHT;
      }
      // Destination squaer is Empty
      if (isDestinationSquareEmpty) {
        // normal Move
        if (selectedSquare == currentSquare + direction) {
          return true;
        }
        // If piece has moved they only have a normal move left
        if (currentPiece.hasMoved) {

          return false;
        }
        // Moving forwards 2 spaces if has not moved 
        if (selectedSquare == currentSquare + (direction * 2)) {
          return true;
        }
      } 
      // destination Square is not empty
      // Taking Left
      if (selectedSquare == currentSquare + takeLeft) {
        return true;
      }
      else if (selectedSquare == currentSquare + takeRight) {
        return true;
      }
      return false;
    
    //  checking the legality of the rook move
    case 'rook':
      if (selectedSquareRow != currentSquareRow &&
        selectedSquareCol != currentSquareCol) {
        return false;
      }
      // is piece going backwards or fowrads
      if (currentSquareRow < selectedSquareRow) {
        isBackwards = false;
      }
      // is piece going left or right 
      if (currentSquareCol < selectedSquareCol) {
        isLeft = false;
      }
      // CHeck for piece in the way
      if (selectedSquareRow == currentSquareRow) {
        for (let i = 1; i < squaresMoved; i++) {
          if (isLeft) {
            if (!isSquareEmpty(chessboard[currentSquareRow][parseInt(currentSquareCol - 1)])) {
              return false;
            }
          }
          else {
            if (!isSquareEmpty(chessboard[currentSquareRow][parseInt(currentSquareCol + 1)])) {
              return false;
            }
          }
        }
      }
      if (selectedSquareRow == currentSquareRow || selectedSquareCol == currentSquareCol) {
        for (let i = 1; i < (squaresMoved/8); i++) {
          if (!isBackwards) {
            if (!isSquareEmpty(chessboard[parseInt(currentSquareRow) + i][currentSquareCol])) {
              return false;
            }
          }
          else {
            if (!isSquareEmpty(chessboard[parseInt(currentSquareRow) - i][currentSquareCol])) {
              return false;
            }
          }
        }
      }
      return true;

    //  checking the legality of the knight move
    case 'knight':
      if (selectedSquare + 10 == currentSquare ||
          selectedSquare - 10 == currentSquare ||
          selectedSquare + 17 == currentSquare ||
          selectedSquare - 17 == currentSquare ||
          selectedSquare + 15 == currentSquare ||
          selectedSquare - 15 == currentSquare ||
          selectedSquare + 6 == currentSquare ||
          selectedSquare - 6 == currentSquare) {
        return true;
      }
      return false;

    //  checking the legality of the bishop move
    case 'bishop':
      // not the same color square
      if (square.dataset.color != squares[selectedPieceElement.square].dataset.color) {
        return false;
      }
      // not a diagonal move
      if (!squaresMoved % 7 && !squaresMoved % 9) {
        return false;
      }
      // is the piece going backwards
      if (currentSquareRow < selectedSquareRow) {
        isBackwards = false;
      }
      // is the piece going left
      if (currentSquareCol < selectedSquareCol) {
        isLeft = false;
      }
      // checks for pieces inbetween the moving piece and destination square
      if (squaresMoved % 7 == 0) {
        for (let i = 1; i < squaresMoved / 7; i++) {
          rowChange = getDirection(isBackwards, i);
          colChange = getDirection(isLeft, i);
          if (!isSquareEmpty(chessboard[currentSquareRow + rowChange][currentSquareCol + colChange])) {
            return false;
          }
        }
      }
      else {
        for (let i = 1; i < squaresMoved / 9; i++) {
          rowChange = getDirection(isBackwards, i);
          colChange = getDirection(isLeft, i);
          if (!isSquareEmpty(chessboard[currentSquareRow + rowChange][currentSquareCol + colChange])) {
            return false;
          }
        }
      }
      return true;
    
    //  checking the legality of the queen move
    case 'queen':
      // Not a vertical, horizontal or diagonal move
      if (selectedSquareRow != currentSquareRow &&
        selectedSquareCol != currentSquareCol && 
        !squaresMoved % 7 && 
        !squaresMoved % 9) {
        return false;
      }
      // is piece going backwards or fowrads
      if (currentSquareRow < selectedSquareRow) {
        isBackwards = false;
      }
      // is piece going left or right 
      if (currentSquareCol < selectedSquareCol) {
        isLeft = false;
      }
      // CHeck for piece in the way
      // Rook like move
      if (selectedSquareRow == currentSquareRow) {
        for (let i = 1; i < squaresMoved; i++) {
          if (isLeft) {
            if (!isSquareEmpty(chessboard[currentSquareRow][parseInt(currentSquareCol - 1)])) {
              return false;
            }
          }
          else {
            if (!isSquareEmpty(chessboard[currentSquareRow][parseInt(currentSquareCol + 1)])) {
              return false;
            }
          }
        }
      }
      if (selectedSquareRow == currentSquareRow || selectedSquareCol == currentSquareCol) {
        for (let i = 1; i < (squaresMoved/8); i++) {
          if (!isBackwards) {
            if (!isSquareEmpty(chessboard[parseInt(currentSquareRow) + i][currentSquareCol])) {
              return false;
            }
          }
          else {
            if (!isSquareEmpty(chessboard[parseInt(currentSquareRow) - i][currentSquareCol])) {
              return false;
            }
          }
        }
      }
      // Bishop like move
      else {
        if (squaresMoved % 7 == 0) {
          for (let i = 1; i < squaresMoved / 7; i++) {
            rowChange = getDirection(isBackwards, i);
            colChange = getDirection(isLeft, i);
            if (!isSquareEmpty(chessboard[currentSquareRow + rowChange][currentSquareCol + colChange])) {
              return false;
            }
          }
        }
        else {
          for (let i = 1; i < squaresMoved / 9; i++) {
            rowChange = getDirection(isBackwards, i);
            colChange = getDirection(isLeft, i);
            if (!isSquareEmpty(chessboard[currentSquareRow + rowChange][currentSquareCol + colChange])) {
              return false;
            }
          }
        }
      }
      return true;
    
    //  checking the legality of the king move
    case 'king':
      if (selectedSquare + LEFT == currentSquare ||
          selectedSquare + RIGHT == currentSquare ||
          selectedSquare + DOWN == currentSquare ||
          selectedSquare + UP == currentSquare ||
          selectedSquare + DOWNLEFT == currentSquare ||
          selectedSquare + DOWNRIGHT == currentSquare ||
          selectedSquare + UPLEFT == currentSquare ||
          selectedSquare + UPRIGHT == currentSquare) {
            return true;
      }
      // not working 
      else if (selectedPiece.color == 'white' &&
      selectedSquare - (LEFT * 2) == currentSquare &&
      !selectPiece.hasMoved &&
      !chessboard[7][0].hasMoved) {
        return true;
      }
      return false;
    default:
      break;
  }
  return true;
}

/** checks if square is empty */
function isSquareEmpty(selectedSquarePiece){
  return selectedSquarePiece == 0;
}

/** checks if the pieces are the same color */
function isSameColor(currentPiece, selectedPiece) {
  return currentPiece.color == selectedPiece.color;
}

function getSquaresMoved(currentSquare, selectedSquare) {
  let squaresMoved = currentSquare - selectedSquare;
  if (squaresMoved < 0) {
    squaresMoved = squaresMoved * -1;
  }
  return squaresMoved;
}

/**
* Select square to move to
*/
function movePiece(square, chessboard, selectedPiece) {
  chessboard[getRow(selectedPiece.square)][getCol(selectedPiece.square)] = 0;
  chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)] = selectedPiece;
  selectedPiece.hasMoved = true;
  return chessboard;
}

// View
/**
* Creates a piece Element
*/
function createPieceElement(piece) {
  const pieceElement = document.createElement("i");
  pieceElement.classList.add('chess-piece', piece.color + "-piece", 'fa-solid', 'fa-chess-' + piece.pieceType);
  return pieceElement;
}

/**
* Piece selection
*/
function selectPiece(piece) {
  // Apply styles to indicate the selected piece
  if (isPieceSelected && selectedPieceElement != null) {
    resetSelection(piece);
  }
  selectedPieceElement = piece;
  piece.classList.add("selected");
}

/**
* Render the chessboard based on the provided array
*/
const chessView = {
  renderChessboard: function (chessboard, squares) {
    // Clear the board
    clearBoard(squares);
    // Loop throught the chessboard array
    for (let i = 0; i < squares.length; i++) {
      // Get rows and colums for each id
      const row = getRow(i);
      const col = getCol(i);
      // If there is a piece on the square render an html element
      if (chessboard[row][col] !== 0) {
        squares[i].appendChild(createPieceElement(chessboard[row][col]));
      }
    }
  }
};

/**
* Clear existing content in the container
*/
function clearBoard(squares) {
  // loop through squares
  for (let square of squares) {
    // Remove all html from inside the divs of the squares
    square.innerHTML = "";

  }
}

/**
* Adds last move to the notation board
*/
function updateNotation(piece, square, moveCounter) {
  let moves = document.getElementById('moves');
  let whiteMove = document.getElementById('white-move');
  let blackMove = document.getElementById('black-move');
  if (piece.color == 'white') {
    moves.innerHTML += `<li>${moveCounter}<li>`;
    whiteMove.innerHTML += `<li>${piece.char}${square.dataset.squareNotation}<li>`;
    return moveCounter;
  }
  blackMove.innerHTML += `<li>${piece.char}${square.dataset.squareNotation}<li>`;
  moveCounter += 1;
  return moveCounter;

}

// Model, Controller Initialization
document.addEventListener("DOMContentLoaded", function() {
  // initialise the game
  chessController.init();
});
