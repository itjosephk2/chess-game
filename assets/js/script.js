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
          let isMoveLegal = checkifMoveIsLegal(selectedPiece, square);
          if (isMoveLegal) {
            movePiece(square, chessboard, selectedPiece);
          } else {
            console.log("Illegal Move");
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

/**
* Reset the piece selection state
*/
function resetSelection() {
  if (selectedPiece) {
    selectedPiece.classList.remove("selected");
  }
  isWhiteToMove = isWhiteToMove ? false : true;
  isPieceSelected = false;
  selectedPiece = null;
}

function checkifMoveIsLegal(selectedPiece, square) {
  if (square.innerHTML != "") {
    console.log(selectedPiece.dataset.color);
    if (selectedPiece.dataset.color == square.firstChild.dataset.color) {
      return false;
    }
  }
  switch (selectedPiece.dataset.char) {
    case 'P':
      if (square.dataset.square != selectedPiece.parentElement.dataset.square - 8) {
        console.log("Illegal Move");
        return false;
      }
      break;
    case 'r':
      if (Math.floor(square.dataset.square / 8) != Math.floor(selectedPiece.parentElement.dataset.square / 8) && square.dataset.square % 8 != selectedPiece.parentElement.dataset.square % 8) {
        console.log("Illegal Move");
        return false;
      }
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
  event.stopPropagation();

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
