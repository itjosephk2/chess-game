// Class For pieces
class Piece {
  // Constructor for setting default parameters
  constructor(char, hasMoved, color, pieceType) {
    this._char = char;
    this._hasMoved = hasMoved;
    this._color = color;
    this._pieceType = pieceType;
  }
  // Getter and Setters for variables
  get char() {
    return this._char;
  }
  set char(char) {
    this._char = char;
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
}


// Controller
const chessController = {
  init: function() {
    // Create a chess board array for controlling logic and movement and then use this to render visuals to the screen. Easy!
    const chessboard = [
      [new Piece('r', false, "black", "rook"), new Piece('n', false, "black", "knight"), new Piece('b', false, "black", "bishop"), new Piece('q', false, "black", "queen"), new Piece('k', false, "black", "king"), new Piece('b', false, "black", "bishop"), new Piece('n', false, "black", "knight"), new Piece('r', false, "black", "rook")],
      [new Piece('p', false, "black", "pawn"), new Piece('p', false, "black", "pawn"), new Piece('p', false, "black", "pawn"), new Piece('p', false, "black", "pawn"), new Piece('p', false, "black", "pawn"), new Piece('p', false, "black", "pawn"), new Piece('p', false, "black", "pawn"), new Piece('p', false, "black", "pawn")],
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      [new Piece('P', false, "white", "pawn"), new Piece('P', false, "white", "pawn"), new Piece('P', false, "white", "pawn"), new Piece('P', false, "white", "pawn"), new Piece('P', false, "white", "pawn"), new Piece('P', false, "white", "pawn"), new Piece('P', false, "white", "pawn"), new Piece('P', false, "white", "pawn")],
      [new Piece('R', false, "white", "rook"), new Piece('N', false, "white", "knight"), new Piece('B', false, "white", "bishop"), new Piece('Q', false, "white", "queen"), new Piece('K', false, "white", "king"), new Piece('B', false, "white", "bishop"), new Piece('N', false, "white", "knight"), new Piece('R', false, "white", "rook")],
    ];

    // create an array of squares on the board called sqaures
    const squares = document.getElementsByClassName("square");
    // Loop through each square in squares
    for (let i = 0; i < squares.length; i++) {
      // Assign each square an equivilant data taag to ap it to the array. MIght not need col amd row data tags now
      // just use square.dataset.square.getRow() etc.
      squares[i].setAttribute("data-square", i);
    }

    //  Lets render the pieces to the chessBoard.
    chessView.renderChessboard(chessboard, squares);

    // Event listener for Clicking on a square
    for (let square of squares) {
      square.addEventListener("click", function () {

        // If a piece is Selected Then check for moving the selected Piece
        if (isPieceSelected) {
          // Check for the legality of a move
          let isMoveLegal = checkifMoveIsLegal(selectedPiece, square, chessboard);

          // Move is considered to be legal
          if (isMoveLegal) {
            // Move the piece
            movePiece(square, chessboard, selectedPiece);
            // Print the chess board to console for debugging purposes
            for (x of chessboard) {
              console.log(x);
            }
            // Change the players turn
            changePlayerTurn();
          }
          // Illegal move resets pieces selection
          else {
            resetSelection();
          }

        }
        // No piece was Previously selected so lets see if we can select one
        else {
          // Is there a piece here
          if (square.innerHTML != "") {
            // Does the piece match the players turn color
            if (isWhiteToMove) {
              // yes it does
              if (chessboard[square.dataset.row][square.dataset.col] != 0 &&) {
                selectedPiece = selectPiece(square.firstChild);
              }
              // No it does not
              else {
                console.log("White to move");
              }

            }
            // Same check if it is black to move
            else {
              if (square.firstChild.dataset.char == square.firstChild.dataset.char.toLowerCase()) {
                selectedPiece = selectPiece(square.firstChild);
              } else {
                console.log("Black to move");
              }
            }

          }
        }

      });
    }

  }
}

// Additional state variables and theyre default values
let isPieceSelected = false;
let selectedPiece = null;
let isWhiteToMove = true;

/**
* Get the row of the index given
*/
function getRow(squareId) {
  return Math.floor(squareId / 8);
}
/**
* Get the column of the index given
*/
function getCol(squareId) {
  return squareId % 8;
}
/**
* CHeck which direction the piece is moving
*/
function getDirection(isDirection, direction) {
  if (isDirection) {
    return direction = direction * -1;
  }
  return direction = direction;
}

/**
* Reset the piece selection state
*/
function resetSelection() {
  if (selectedPiece) {
    selectedPiece.classList.remove("selected");
  }
  isPieceSelected = false;
  selectedPiece = null;
}
/**
* Change player
*/
function changePlayerTurn() {
  isWhiteToMove = isWhiteToMove ? false : true;
}
/**
* This does way too much right now and needs to be refactored
*/
function checkifMoveIsLegal(selectedPiece, square, chessboard) {
  let currentSquare = parseInt(selectedPiece.parentElement.dataset.square);
  let selectedSquare = parseInt(square.dataset.square);
  let squaresMoved = currentSquare - selectedSquare;
  let currentSquareRow = getRow(currentSquare);
  let currentSquareCol = getCol(currentSquare);
  let selectedSquareRow = getRow(selectedSquare);
  let selectedSquareCol = getCol(selectedSquare);
  const LEFT = -1;
  const RIGHT = 1;
  const UP = - 8;
  const DOWN = + 8;
  const UPRIGHT = -7;
  const UPLEFT = -9;
  const DOWNLEFT = 7;
  const DOWNRIGHT = 9;

  if (squaresMoved < 0) {
    squaresMoved = squaresMoved * -1;
  }

  if (square.innerHTML != "") {
    if (selectedPiece.dataset.color == square.firstChild.dataset.color) {
      resetSelection();
      return false;
    }
  }

  switch (selectedPiece.dataset.char) {

    case 'P':
      // moving forward 1 space
      console.log(currentSquareRow);
      console.log(currentSquareRow - 1);
      // console.log(chessboard[tmp][currentSquareCol]);
      if (square.innerHTML == '' && selectedSquare == currentSquare + UP ||
        // Moving forwards 2 spaces on turn 1
        (square.innerHTML == '' &&
        chessboard[getRow(currentSquare + UP)][currentSquareCol] == 0 &&
        selectedPiece.dataset.hasMoved == "false" &&
        selectedSquare == currentSquare + (UP * 2)) ||
        // Taking Left
        (square.innerHTML != '' && selectedSquare == currentSquare + UPLEFT) ||
        // Taking Right
        (square.innerHTML != '' && selectedSquare == currentSquare + UPRIGHT)
        ) {
          selectedPiece.setAttribute("data-has-moved", "true");
          return true;
        }
      return false;

    case 'p':

      // moving forward 1 space
      if (square.innerHTML == '' &&
        selectedSquare -8 == currentSquare ||

        // MOving 2 spaces on turn 1
        (square.innerHTML == '' &&
        chessboard[Math.floor((selectedSquare - 8) / 8)]
        [(selectedSquare - 8) % 8] == 0 &&
        selectedPiece.dataset.hasMoved == "false" &&
        selectedSquare - 16 == currentSquare) ||

        // Capture Left
        (square.innerHTML != '' &&
          selectedSquare - 7 == currentSquare
          && square.firstChild.dataset.color != selectedPiece.dataset.color) ||

        // Capture Right
        (square.innerHTML != '' &&
          selectedSquare - 9 == currentSquare
          && square.firstChild.dataset.color != selectedPiece.dataset.color)
        ) {
        selectedPiece.setAttribute("data-has-moved", "true");
        return true;
      }
      return false;

    case 'R':
    case 'r':
      if (selectedSquareRow == currentSquareRow ||
        selectedSquareCol == currentSquareCol) {
        return true;
      }
      return false;

    case 'n':
    case 'N':
      if (selectedSquare + 10 == currentSquare ||
          selectedSquare - 10 == currentSquare ||
          selectedSquare + 17 == currentSquare ||
          selectedSquare - 17 == currentSquare ||
          selectedSquare + 15 == currentSquare ||
          selectedSquare - 15 == currentSquare ||
          selectedSquare + 6 == currentSquare ||
          selectedSquare - 6 == currentSquare) {
        console.log("This is a valid move");
        return true;
      }
      return false;

    case 'b':
    case 'B':
    let isBackwards = true;
    let isLeft = true;
    let rowChange;
    let colChange;
      if (currentSquareRow < selectedSquareRow) {
        isBackwards = false;
      }
      if (currentSquareCol < selectedSquareCol) {
        isLeft = false;
      }
      if (squaresMoved % 7 == 0) {
        for (let i = 1; i < squaresMoved / 7; i++) {
          rowChange = getDirection(isBackwards, i);
          colChange = getDirection(isLeft, i);
          if (chessboard[currentSquareRow + rowChange][currentSquareCol + colChange] != 0) {
            return false;
          }
        }
      }
      if (squaresMoved % 9 == 0) {
        for (let i = 1; i < squaresMoved / 9; i++) {
          rowChange = getDirection(isBackwards, i);
          colChange = getDirection(isLeft, i);
          if (chessboard[currentSquareRow + rowChange][currentSquareCol + colChange] != 0) {
            return false;
          }
        }
      }

      if (square.dataset.color === selectedPiece.parentElement.dataset.color &&
      squaresMoved % 7 == 0 ||
      square.dataset.color === selectedPiece.parentElement.dataset.color &&
      squaresMoved % 9 == 0 ) {

        return true;
      }
      return false;

    case 'Q':
    case 'q':
      if (((selectedSquare - currentSquare) % 7 == 0 ||
      (selectedSquare - currentSquare) % 9 == 0) ||
       selectedSquareRow == currentSquareRow ||
       selectedSquareCol == currentSquareCol) {
        console.log("This is a valid Move");
        return true;
      }
      return false;

    case 'k':
    case 'k':
      console.log(selectedPiece.parentElement.dataset.square);
      if (parseInt(selectedSquare) + LEFT == currentSquare ||
          parseInt(selectedSquare) + RIGHT == currentSquare ||
          parseInt(selectedSquare) + DOWN == currentSquare ||
          parseInt(selectedSquare) + UP == currentSquare ||
          parseInt(selectedSquare) + DOWNLEFT == currentSquare ||
          parseInt(selectedSquare) + DOWNRIGHT == currentSquare ||
          parseInt(selectedSquare) + UPLEFT == currentSquare ||
          parseInt(selectedSquare) + UPRIGHT == currentSquare) {
            console.log("this is a valid Move");
            return true;
      }
      return false;
    default:
      break;
  }
  return true;
}

/**
* Piece selection
*/
function selectPiece(piece) {
  // Reset styles for previously selected piece (if any)
  if (selectedPiece) {
    selectedPiece.classList.remove("selected");
  }
  selectedPiece = piece;
  // Apply styles to indicate the selected piece
  selectedPiece.classList.add("selected");

  isPieceSelected = true;

  return selectedPiece;
}

/**
* Select square to move to
*/
function movePiece(square, chessboard, selectedPiece) {

  const selectedPieceOldRow = getRow(selectedPiece.parentElement.dataset.square);
  const selectedPieceOldCol = getCol(selectedPiece.parentElement.dataset.square);
  chessboard[selectedPieceOldRow][selectedPieceOldCol] = 0;
  selectedPiece.remove();

  const row = getRow(square.dataset.square);
  const col = getCol(square.dataset.square);
  chessboard[row][col] = selectedPiece.dataset.char;

  chessView.renderChessboard(chessboard);
  resetSelection();
}

// View
function createPieceElement(piece) {
  const pieceElement = document.createElement("i");
  pieceElement.classList.add('chess-piece', piece.color + "-piece", 'fa-solid', 'fa-chess-' + piece.pieceType);
  return pieceElement;
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
        squares[i].appendChild(createPieceElement(chessboard[row][col]);
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

// Model, Controller Initialization
document.addEventListener("DOMContentLoaded", function() {
  // initialise the game
  chessController.init();
});
