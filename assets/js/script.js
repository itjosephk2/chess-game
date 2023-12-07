// Class For pieces
class Piece {
  // Constructor for setting default parameters
  constructor(char, hasMoved, color, pieceType, square) {
    this._char = char;
    this._hasMoved = hasMoved;
    this._color = color;
    this._pieceType = pieceType;
    this._square = square;
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
  get square() {
    return this._square;
  }
  set square(square) {
    this._square = square;
  }
}


// Controller
const chessController = {
  init: function() {
    // Create a chess board array for controlling logic and movement and then use this to render visuals to the screen. Easy!
    let chessboard = [
      [new Piece('r', false, "black", "rook", 0), new Piece('n', false, "black", "knight", 1), new Piece('b', false, "black", "bishop", 2), new Piece('q', false, "black", "queen", 3), new Piece('k', false, "black", "king", 4), new Piece('b', false, "black", "bishop", 5), new Piece('n', false, "black", "knight", 66), new Piece('r', false, "black", "rook", 7)],
      [new Piece('p', false, "black", "pawn", 8), new Piece('p', false, "black", "pawn", 9), new Piece('p', false, "black", "pawn", 10), new Piece('p', false, "black", "pawn", 11), new Piece('p', false, "black", "pawn", 12), new Piece('p', false, "black", "pawn", 13), new Piece('p', false, "black", "pawn", 14), new Piece('p', false, "black", "pawn", 15)],
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      [new Piece('P', false, "white", "pawn", 49), new Piece('P', false, "white", "pawn", 50), new Piece('P', false, "white", "pawn", 51), new Piece('P', false, "white", "pawn", 51), new Piece('P', false, "white", "pawn", 52), new Piece('P', false, "white", "pawn", 53), new Piece('P', false, "white", "pawn", 54), new Piece('P', false, "white", "pawn", 55)],
      [new Piece('R', false, "white", "rook", 56), new Piece('N', false, "white", "knight", 57), new Piece('B', false, "white", "bishop", 58), new Piece('Q', false, "white", "queen", 59), new Piece('K', false, "white", "king", 60), new Piece('B', false, "white", "bishop", 61), new Piece('N', false, "white", "knight", 62), new Piece('R', false, "white", "rook", 63)],
    ];

    // create an array of squares on the board called sqaures
    const squares = document.getElementsByClassName("square");
    // Loop through each square in squares
    for (let i = 0; i < squares.length; i++) {
      // Assign each square an equivilant data taag to ap it to the array.
      squares[i].setAttribute("data-square", i);
    }

    //  Lets render the pieces to the chessBoard.
    chessView.renderChessboard(chessboard, squares);



    // let list = document.getElementsByTagName('li')
    //
    // for (let item of list) {
    //   item.addEventListener("click", function(){
    //     if (item.innerHTML == "Theme A") {
    //       const squares = document.getElementsByClassName("square");
    //       // Loop through each square in squares
    //       for (square of squares) {
    //         // Assign each square an equivilant data taag to ap it to the array.
    //         if (square.classList.contains("red")) {
    //           square.classList.remove("red");
    //           square.classList.add("white")
    //         }
    //         if (square.classList.contains("green")) {
    //           square.classList.remove("green");
    //           square.classList.add("black");
    //         }
    //       }
    //     }
    //     if (item.innerHTML == "Theme B") {
    //       const squares = document.getElementsByClassName("square");
    //       // Loop through each square in squares
    //       for (square of squares) {
    //         // Assign each square an equivilant data taag to ap it to the array.
    //         if (square.classList.contains("white")) {
    //           square.classList.remove("white");
    //           square.classList.add("red")
    //         }
    //         if (square.classList.contains("black")) {
    //           square.classList.remove("black");
    //           square.classList.add("green")
    //         }
    //       }
    //     }
    //   });
    // }

    // Event listener for Clicking on a square
    for (let square of squares) {
      square.addEventListener("click", function () {
        // If a piece is Selected Then check for moving the selected Piece
        if (isPieceSelected) {
          // Check for the legality of a move
          let isMoveLegal = checkifMoveIsLegal(selectedPiece, square, chessboard);
          console.log(`move is legal = ${isMoveLegal}`)
          // Move is considered to be legal
          if (isMoveLegal) {
            // Move the piece
            chessboard = movePiece(square, chessboard, selectedPiece);
            chessView.renderChessboard(chessboard, squares);
            console.table(chessboard);
            resetSelection(square.firstChild);
            // Print the chess board to console for debugging purposes
            console.table(chessboard);
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
          // Is there a piece here
          if (chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)] != 0) {
            // Does the piece match the players turn color
            if (isWhiteToMove) {
              // yes it does
              // set selected piece to the equivilant object
              selectedPiece = chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)];
              // Decorate the piece to make it selected
              selectPiece(square.firstChild);
              isPieceSelected = true;
            }
            // No it does not
            else {
              console.log("White to move");
            }
          }
          // Same check if it is black to move
          else {
            if (square.firstChild.dataset.char == square.firstChild.dataset.char.toLowerCase()) {
              // set selected piece to the equivilant object
              selectedPiece = chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)];
              // Decorate the piece to make it selected
              selectPiece(square.firstChild);
              isPieceSelected = true;
            } else {
              console.log("Black to move");
            }
          }
        }
      });
    }

  }
}

// function selectPiece() {
//   // set selected piece to the equivilant object
//   selectedPiece = chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)];
//   // Decorate the piece to make it selected
//   highlightPiece(square.firstChild);
// }

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
function resetSelection(piece) {
  if (piece && piece.classList) {
    piece.classList.remove("selected");
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
  let currentSquare = parseInt(selectedPiece.square);
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
    if (selectedPiece.color == square.firstChild.dataset.color) {
      resetSelection();
      return false;
    }
  }

  switch (selectedPiece.char) {

    case 'P':
      // moving forward 1 space
      // console.log(currentSquareRow);
      // console.log(currentSquareRow - 1);
      // console.log(chessboard[tmp][currentSquareCol]);
      if (square.innerHTML == '' && selectedSquare == currentSquare + UP ||
        // Moving forwards 2 spaces on turn 1
        (square.innerHTML == '' &&
        chessboard[getRow(currentSquare + UP)][currentSquareCol] == 0 &&
        selectedPiece.hasMoved == "false" &&
        selectedSquare == currentSquare + (UP * 2)) ||
        // Taking Left
        (square.innerHTML != '' && selectedSquare == currentSquare + UPLEFT) ||
        // Taking Right
        (square.innerHTML != '' && selectedSquare == currentSquare + UPRIGHT)
        ) {
          selectedPiece.hasMoved = true;
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
        selectedPiece.hasMoved == "false" &&
        selectedSquare - 16 == currentSquare) ||

        // Capture Left
        (square.innerHTML != '' &&
          selectedSquare - 7 == currentSquare
          && square.firstChild.dataset.color != selectedPiece.color) ||

        // Capture Right
        (square.innerHTML != '' &&
          selectedSquare - 9 == currentSquare
          && square.firstChild.dataset.color != selectedPiece.color)
        ) {
        selectedPiece.hasMoved = true;
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
* Select square to move to
*/
function movePiece(square, chessboard, selectedPiece) {
  chessboard[getRow(selectedPiece.square)][getCol(selectedPiece.square)] = 0;
  console.table(chessboard);

  chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)] = selectedPiece;
  console.table(chessboard);

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
  if (isPieceSelected) {
    resetSelection(piece);
  }
  piece.classList.add("selected");
}

/**
* Render the chessboard based on the provided array
*/
const chessView = {
  renderChessboard: function (chessboard, squares) {
    // Clear the board
    for (let square of squares) {
      // console.log("This works");
    }
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
    console.table(chessboard);
  }
};
/**
* Clear existing content in the container
*/
function clearBoard(squares) {
  // loop through squares
  for (let square of squares) {
    // Remove all html from inside the divs of the squares
    // console.log(square);
    square.innerHTML = "";

  }
}

// Model, Controller Initialization
document.addEventListener("DOMContentLoaded", function() {
  // initialise the game
  chessController.init();
});
