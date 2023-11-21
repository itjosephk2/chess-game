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
          movePiece(square, chessboard, selectedPiece);
        } else {
          if (square.innerHTML != "") {
            selectedPiece = selectPiece(square.firstChild);
          }
        }
      });
    }

  }
}

// Additional state variables
let isPieceSelected = false;
let selectedPiece = null;

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
