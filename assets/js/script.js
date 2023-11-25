// Controller
const chessController = {
  init: function() {

    // Create a chess board array for controlling logic and movement and then use this to render visuals to the screen. Easy!
    const chessboard = [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ];

    const squares = document.getElementsByClassName("square");
    // clearBoard(squares);

    for (let i = 0; i < squares.length; i++) {
      squares[i].setAttribute("data-square", i);
    }

    //  Lets render the pieces to the chessBoard.
    chessView.renderChessboard(chessboard);

    // const squares = document.getElementsByClassName("square");
    for (let square of squares) {
    square.addEventListener("click", function () {
        if (isPieceSelected) {
          let isMoveLegal = checkifMoveIsLegal(selectedPiece, square, chessboard);
          if (isMoveLegal) {
            movePiece(square, chessboard, selectedPiece);
            for (x of chessboard) {
              console.log(x);
            }
            changePlayerTurn();
          } else {
            resetSelection();
          }
        } else {
          if (square.innerHTML != "") {
            if (isWhiteToMove) {
              if (square.firstChild.dataset.char != square.firstChild.dataset.char.toLowerCase()) {
                selectedPiece = selectPiece(square.firstChild);
              } else {
                console.log("White to move");
              }
            } else {
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

// Additional state variables
let isPieceSelected = false;
let selectedPiece = null;
let isWhiteToMove = true;

function getRow(squareId) {
  return Math.floor(squareId / 8);
}

function getCol(squareId) {
  return squareId % 8;
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

function changePlayerTurn() {
  isWhiteToMove = isWhiteToMove ? false : true;
}

function checkifMoveIsLegal(selectedPiece, square, chessboard) {
  let currentSquare = parseInt(selectedPiece.parentElement.dataset.square);
  let selectedSquare = parseInt(square.dataset.square);
  let squaresMoved = currentSquare - selectedSquare;
  let currentSquareRow = getRow(currentSquare);
  let currentSquareCol = getCol(currentSquare);
  let selectedSquareRow = getRow(selectedSquare);
  let selectedSquareCol = getCol(selectedSquare);
  let left = -1;
  let right = 1;
  let up = - 8;
  let down = + 8;
  let upRight = -7;
  let upLeft = -9;
  let downLeft = 7;
  let downRight = 9;

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
      console.log(currentSquare + up);
      if (square.innerHTML == '' && selectedSquare == currentSquare + up ||
        // Moving forwards 2 spaces on turn 1
        (square.innerHTML == '' &&
        chessboard[currentSquareRow + 1][currentSquareCol] == 0 &&
        selectedPiece.dataset.hasMoved == "false" &&
        detinationSquare == currentSquare + (up * 2)) ||
        // Taking Left
        (square.innerHTML != '' && selectedSquare == currentSquare + upLeft) ||
        // Taking Right
        (square.innerHTML != '' && selectedSquare == currentSquare + upRight)
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
      for (let i = 1; i < squaresMoved / 7; i++) {
        if (chessboard[(Math.floor((selectedPiece.parentElement.dataset.square) / 8)) + i][((selectedPiece.parentElement.dataset.square) % 8) + i] != 0) {
          console.log("Piece in the way");
          console.log((Math.floor((selectedPiece.parentElement.dataset.square) / 8)) + 1);
          console.log(((selectedPiece.parentElement.dataset.square) % 8) - 1);
          console.log(chessboard[(Math.floor((selectedPiece.parentElement.dataset.square) / 8) + 1)][(selectedPiece.parentElement.dataset.square) % 8] + 1 );
          return false;
        }
      }
      for (let i = 1; i < squaresMoved / 9; i++) {
        if (chessboard[Math.floor((selectedPiece.parentElement.dataset.square + 9) / 8)][(selectedPiece.parentElement.dataset.square + 9) % 8] != 0) {
          console.log("Piece in the way");
          console.log(chessboard[Math.floor((selectedPiece.parentElement.dataset.square + 9) / 8)][(selectedPiece.parentElement.dataset.square + 9) % 8] );
          return false;
        }
      }

      if (square.dataset.color === selectedPiece.parentElement.dataset.color &&
      squaresMoved % 7 == 0 ||
      square.dataset.color === selectedPiece.parentElement.dataset.color &&
      squaresMoved % 9 == 0 ) {

        return true;
      }
      return false;
    case 'B':
      if (squaresMoved % 7 == 0) {
        squaresMoved = squaresMoved / 7;
      }
      if (squaresMoved % 9 == 0) {
        squaresMoved = squaresMoved / 9;
      }
      if (square.dataset.color === selectedPiece.parentElement.dataset.color &&
      squaresMoved % 7 == 0 ||
      square.dataset.color === selectedPiece.parentElement.dataset.color &&
      squaresMoved % 9 == 0 ) {

        return true;
      }
      return false;
      break;
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
      if (parseInt(selectedSquare) + left == currentSquare ||
          parseInt(selectedSquare) + right == currentSquare ||
          parseInt(selectedSquare) + down == currentSquare ||
          parseInt(selectedSquare) + up == currentSquare ||
          parseInt(selectedSquare) + downLeft == currentSquare ||
          parseInt(selectedSquare) + downRight == currentSquare ||
          parseInt(selectedSquare) + upLeft == currentSquare ||
          parseInt(selectedSquare) + upRight == currentSquare) {
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

  // Causing an error why???
  isPieceSelected = true;

  // Stop event propagation

  return selectedPiece;
}

/**
* Select square to move to
*/
function movePiece(square, chessboard, selectedPiece) {

  const selectedPieceOldRow = (Math.floor(selectedPiece.parentElement.dataset.square / 8));
  const selectedPieceOldCol = (selectedPiece.parentElement.dataset.square % 8);
  chessboard[selectedPieceOldRow][selectedPieceOldCol] = 0;
  selectedPiece.remove();

  const row = (Math.floor(square.dataset.square / 8));
  const col = (square.dataset.square % 8);
  chessboard[row][col] = selectedPiece.dataset.char;

  chessView.renderChessboard(chessboard);
  resetSelection();
}

// View
function createPieceElement(pieceChar) {
  let color = "white";
  let pieceType;
  let hasMoved = "false";
  if (pieceChar == pieceChar.toLowerCase()){
    color = "black";
  }
  switch (pieceChar.toLowerCase()) {
    case 'p':
      pieceType = 'pawn';
      break;
    case 'r':
      pieceType = 'rook';
      break;
    case 'n':
      pieceType = 'knight';
      break;
    case 'b':
      pieceType = 'bishop';
      break;
    case 'q':
      pieceType = 'queen';
      break;
    case 'k':
      pieceType = 'king';
      break;
    default:
      break;
}
  const pieceElement = document.createElement("i");
  pieceElement.classList.add('chess-piece', color + '-piece', 'fa-solid', 'fa-chess-' + pieceType);
  pieceElement.setAttribute('data-char', pieceChar);
  pieceElement.setAttribute('data-color', color);
  pieceElement.setAttribute('data-has-moved', hasMoved);
  return pieceElement;
}

const chessView = {
  renderChessboard: function (chessboard) {
    // Render the chessboard based on the provided array
    const squares = document.getElementsByClassName("square");
    clearBoard(squares);

    for (let i = 0; i < squares.length; i++) {
      const row = Math.floor(i / 8);
      const col = i % 8;
      // console.log(`[${row}],[${col}]`);
      if (chessboard[row][col] !== 0) {
        const pieceElement = createPieceElement(chessboard[row][col]);
        squares[i].appendChild(pieceElement);
      }
    }
  }
};
/**
* Clear existing content in the container
*/
function clearBoard(squares) {
  for (let square of squares) {
    square.innerHTML = "";

  }
}

// Model, Controller Initialization
document.addEventListener("DOMContentLoaded", function() {
  // initialise the game
  chessController.init();
});
