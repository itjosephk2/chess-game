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
    this._col = getCol(this._square);
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

// Additional state variables and theyre default values
let isPieceSelected = false;
let selectedPiece = null;
let isWhiteToMove = true;
let selectedPieceElement = null;
let gameOver = false;

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            resetBoard();
            
        });
    }
});

function setupStalemateTestBoard() {
 
  chessboard = Array(8).fill(null).map(() => Array(8).fill(0));
  moveCounter = 1;

  const whiteKing = new Piece('white', 'king', 0);
  const blackKing = new Piece('black', 'king', 15); 
  const blackknight = new Piece('black', 'knight', 18);
  const blackKnight_2 = new Piece('black', 'knight', 19);

  chessboard[0][0] = whiteKing;
  chessboard[1][7] = blackKing; 
  chessboard[2][2] = blackknight;
  chessboard[2][3] = blackKnight_2;

  isWhiteToMove = true;

  const squares = document.getElementsByClassName("square");
  for (let i = 0; i < squares.length; i++) {
    squares[i].setAttribute("data-square", i);
  }
  chessView.renderChessboard(chessboard, squares);

  if (checkForStalemate('white')) {
    showStalemateModal();
  }
}


function resetBoard() {
    // Clear the board visually
    clearBoard(document.getElementsByClassName("square"));

    // Reset any game state variables (like selected piece, turn, etc.)
    selectedPiece = null;
    currentTurn = 'white';
    isWhiteToMove = true;
    isPieceSelected = false;
    selectedPieceElement = null;
    gameOver = false;
    checkMessage = null;
    currentTurn = 'white'; 

    // Clear notation board
    document.getElementById('moves').innerHTML = '';
    document.getElementById('white-move').innerHTML = '';
    document.getElementById('black-move').innerHTML = '';

    setupBoard()

    isWhiteToMove = true;
}

function setupBoard() {
    // Step 1: Rebuild the logical chessboard array
    chessboard = [
        [new Piece("black", "rook", 0), new Piece("black", "knight", 1), new Piece("black", "bishop", 2), new Piece("black", "queen", 3), new Piece("black", "king", 4), new Piece("black", "bishop", 5), new Piece("black", "knight", 6), new Piece("black", "rook", 7)],
        [new Piece("black", "pawn", 8), new Piece("black", "pawn", 9), new Piece("black", "pawn", 10), new Piece("black", "pawn", 11), new Piece("black", "pawn", 12), new Piece("black", "pawn", 13), new Piece("black", "pawn", 14), new Piece("black", "pawn", 15)],
        Array(8).fill(0),
        Array(8).fill(0),
        Array(8).fill(0),
        Array(8).fill(0),
        [new Piece("white", "pawn", 48), new Piece("white", "pawn", 49), new Piece("white", "pawn", 50), new Piece("white", "pawn", 51), new Piece("white", "pawn", 52), new Piece("white", "pawn", 53), new Piece("white", "pawn", 54), new Piece("white", "pawn", 55)],
        [new Piece("white", "rook", 56), new Piece("white", "knight", 57), new Piece("white", "bishop", 58), new Piece("white", "queen", 59), new Piece("white", "king", 60), new Piece("white", "bishop", 61), new Piece("white", "knight", 62), new Piece("white", "rook", 63)],
    ];

    moveCounter = 1;

    // Step 2: Reassign square data attributes
    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++) {
        squares[i].setAttribute("data-square", i);
    }

    // Step 3: Render the new board state visually
    chessView.renderChessboard(chessboard, squares);
}

// Controller
const chessController = {
  init: function () {
    const squares = document.getElementsByClassName("square");

    setupBoard();
    setupStalemateTestBoard();

    // Event listener for clicking on a square
    for (let square of squares) {
      square.addEventListener("click", function () {
        if (gameOver) {
          alert("The game is over! Please click 'Play Again' to start a new game.");
          return;
        }

        if (isPieceSelected) {
          if (checkifMoveIsLegal(selectedPiece, square, chessboard)) {
            // Save from/to info
            const fromRow = getRow(selectedPiece.square);
            const fromCol = getCol(selectedPiece.square);
            const toRow = getRow(square.dataset.square);
            const toCol = getCol(square.dataset.square);
            const capturedPiece = chessboard[toRow][toCol];
            const originalSquare = selectedPiece.square;

            // Try the move (manually)
            chessboard[toRow][toCol] = selectedPiece;
            chessboard[fromRow][fromCol] = 0;
            selectedPiece.square = square.dataset.square;

            // Check if the king is still in check after move
            if (isKingInCheck(isWhiteToMove ? 'white' : 'black', chessboard, squares)) {
              alert('Check');

              // Undo move
              chessboard[fromRow][fromCol] = selectedPiece;
              chessboard[toRow][toCol] = capturedPiece;
              selectedPiece.square = originalSquare;

              resetSelection(square.firstChild);
              return;
            }

            // Move is legal — continue as normal
            selectedPiece.hasMoved = true;
            const squareIndex = parseInt(square.dataset.square);
            moveCounter = updateNotation(selectedPiece, squareIndex, moveCounter);
            resetSelection(square.firstChild);
            chessView.renderChessboard(chessboard, squares);

            // ✅ Get reference to the moved piece
            const movedPiece = chessboard[toRow][toCol];

            // Check for stalemate
            if (checkForStalemate(isWhiteToMove ? 'black' : 'white')) {
              showStalemateModal();
              return;
            }

            // Switch turns
            changePlayerTurn();

            // Check if the next player is in check or checkmate
            const currentPlayer = isWhiteToMove ? 'white' : 'black';
            if (isKingInCheck(currentPlayer, chessboard, squares)) {
              if (isCheckMate(currentPlayer, chessboard, squares)) {
                const winner = isWhiteToMove ? "Black" : "White";
                showWinModal(winner);
                return;
              }
            }

            // Check for promotion
            if (movedPiece.pieceType === 'pawn') {
              const promotionRank = movedPiece.color === 'white' ? 0 : 7;
              if (toRow === promotionRank) {
                showPromotionModal((choice) => {
                  movedPiece.pieceType = choice;
                  movedPiece.promoted = true;
                  chessView.renderChessboard(chessboard, squares);
                });
              }
            }
            

          } else {
            // Illegal move — reset selection
            resetSelection(square.firstChild);
          }
        } else {
          // No piece selected yet — try selecting
          trySelectPiece(square, chessboard);
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
        return true;
      }
    }
  }

  return false; // King is not in check
}

/** Checks if the polayer is in check */
function isCheckMate(playerColor, chessboard, squares) {
  if (!isKingInCheck(playerColor, chessboard, squares)) {
    return false; // Not checkmate if the king isn't in check
  }

  // Loop through all pieces of the given color
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = chessboard[row][col];

      // Check if square is not empty and the piece on the square is the same as the player whos turn it is
      if (piece !== 0 && piece.color === playerColor) {
        const fromSquareIndex = row * 8 + col;

        // Try moving this piece to every square on the board
        for (let targetIndex = 0; targetIndex < 64; targetIndex++) {
          
          const toRow = getRow(targetIndex);
          const toCol = getCol(targetIndex);
          const targetSquare = squares[targetIndex];

          // Skip if it's the same square
          if (fromSquareIndex === targetIndex) continue;

          // Check if the move is legal
          if (checkifMoveIsLegal(piece, targetSquare, chessboard)) {
            // Simulate the move
            const originalPiece = chessboard[toRow][toCol];
            const oldSquare = piece.square;

            // Make the move
            chessboard[toRow][toCol] = piece;
            chessboard[row][col] = 0;
            piece.square = targetIndex;

            const stillInCheck = isKingInCheck(playerColor, chessboard, squares);

            // Undo the move
            piece.square = oldSquare;
            chessboard[row][col] = piece;
            chessboard[toRow][toCol] = originalPiece;

            // If the king is NOT in check after this move, it's not stalemate
            if (!stillInCheck) {
              chessView.renderChessboard(chessboard, squares);
              return false;
            }
          }
        }
      }
    }
  }

  const winner = isWhiteToMove ? "Black" : "White";
  showWinModal(winner);
  return true; // No escape = checkmate
}


function checkForStalemate(playerColor) {
  // Quick draw check: only two kings left
  const allPieces = chessboard.flat().filter(p => p !== 0);
  const onlyKingsLeft = allPieces.length === 2;
  const singleMinorPiece = allPieces.length === 3 && allPieces.filter(p => p.pieceType !== 'king').length === 1 && allPieces.some(p => (p.pieceType === 'bishop' || p.tpieceTypeype === 'knight'));
  const doubleKnightDraw = allPieces.length === 4 && allPieces.filter(p => p.pieceType === 'knight').length === 2 && allPieces.filter(p => p.pieceType === 'king').length === 2;

  if (onlyKingsLeft || singleMinorPiece || doubleKnightDraw) {
    return true;
  }

  const squares = document.getElementsByClassName("square");

  // If the player is in check, it's not stalemate
  if (isKingInCheck(playerColor, chessboard, squares)) {
    return false;
  }

  // Loop through all pieces of the given color
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = chessboard[row][col];

      // Check if square is not empty and the piece on the square is the same as the player whos turn it is
      if (piece !== 0 && piece.color === playerColor) {
        const fromSquareIndex = row * 8 + col;

        // Try moving this piece to every square on the board
        for (let targetIndex = 0; targetIndex < 64; targetIndex++) {
          
          const toRow = getRow(targetIndex);
          const toCol = getCol(targetIndex);
          const targetSquare = squares[targetIndex];

          // Skip if it's the same square
          if (fromSquareIndex === targetIndex) continue;

          // Check if the move is legal
          if (checkifMoveIsLegal(piece, targetSquare, chessboard)) {
            // Simulate the move
            const originalPiece = chessboard[toRow][toCol];
            const oldSquare = piece.square;

            // Make the move
            chessboard[toRow][toCol] = piece;
            chessboard[row][col] = 0;
            piece.square = targetIndex;

            const stillInCheck = isKingInCheck(playerColor, chessboard, squares);

            // Undo the move
            piece.square = oldSquare;
            chessboard[row][col] = piece;
            chessboard[toRow][toCol] = originalPiece;

            // If the king is NOT in check after this move, it's not stalemate
            if (!stillInCheck) {
              chessView.renderChessboard(chessboard, squares);
              return false;
            }
          }
        }
      }
    }
  }
  chessView.renderChessboard(chessboard, squares);
  // No legal moves found and not in check = stalemate
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
        // After moving the piece
      } 
      // destination Square is not empty
      else {
        // Taking Left
        if (selectedSquare == currentSquare + takeLeft) {
          return true;
        }
        else if (selectedSquare == currentSquare + takeRight) {
          return true;
        }
        return false;
      }
    
      
    //  checking the legality of the rook move
    case 'rook':
      // Move must be either in the same row or same column
      if (selectedSquareRow !== currentSquareRow && selectedSquareCol !== currentSquareCol) {
        return false;
      }

      // Horizontal move
      if (selectedSquareRow === currentSquareRow) {
        let start = Math.min(currentSquareCol, selectedSquareCol) + 1;
        let end = Math.max(currentSquareCol, selectedSquareCol);
        for (let col = start; col < end; col++) {
          if (!isSquareEmpty(chessboard[currentSquareRow][col])) {
            return false;
          }
        }
        return true;
      }

      // Vertical move
      if (selectedSquareCol === currentSquareCol) {
        let start = Math.min(currentSquareRow, selectedSquareRow) + 1;
        let end = Math.max(currentSquareRow, selectedSquareRow);
        for (let row = start; row < end; row++) {
          if (!isSquareEmpty(chessboard[row][currentSquareCol])) {
            return false;
          }
        }
        return true;
      }

      return false;


    //  checking the legality of the knight move
    case 'knight':
      if (
        currentSquare + 10 === selectedSquare ||
        currentSquare - 10 === selectedSquare ||
        currentSquare + 17 === selectedSquare ||
        currentSquare - 17 === selectedSquare ||
        currentSquare + 15 === selectedSquare ||
        currentSquare - 15 === selectedSquare ||
        currentSquare + 6 === selectedSquare ||
        currentSquare - 6 === selectedSquare
      ) {
        return true;
      }
      return false;

    //  checking the legality of the bishop move
    case 'bishop':
      let rowDiff = Math.abs(currentSquareRow - selectedSquareRow);
      let colDiff = Math.abs(currentSquareCol - selectedSquareCol);

      // Diagonal check: row and col diffs must be equal
      if (rowDiff !== colDiff) {
        return false;
      }

      // Determine direction
      let rowStep = selectedSquareRow > currentSquareRow ? 1 : -1;
      let colStep = selectedSquareCol > currentSquareCol ? 1 : -1;

      // Check each square between current and target
      for (let i = 1; i < rowDiff; i++) {
        let row = currentSquareRow + i * rowStep;
        let col = currentSquareCol + i * colStep;
        if (!isSquareEmpty(chessboard[row][col])) {
          return false;
        }
      }

      return true;

    
    //  checking the legality of the queen move
    case 'queen':
      let originalType = currentPiece.pieceType;

      // Try rook move
      currentPiece.pieceType = 'rook';
      if (checkifMoveIsLegal(selectedPieceElement, square, chessboard)) {
        currentPiece.pieceType = originalType;
        return true;
      }

      // Try bishop move
      currentPiece.pieceType = 'bishop';
      if (checkifMoveIsLegal(selectedPieceElement, square, chessboard)) {
        currentPiece.pieceType = originalType;
        return true;
      }

      // Restore and fail
      currentPiece.pieceType = originalType;
      return false;

    
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
      !currentPiece.hasMoved &&
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

// Show win modal
function showWinModal(winner) {
  document.getElementById("modalMessage").textContent = `${winner} wins!`;
  const winModal = new bootstrap.Modal(document.getElementById('winModal'));
  gameOver = true;
  winModal.show();
}


/**
* Adds last move to the notation board
*/
function updateNotation(piece, squareIndex, moveCounter) {
  const file = "abcdefgh"[squareIndex % 8];
  const rank = 8 - Math.floor(squareIndex / 8);
  const notation = `${file}${rank}`;

  // Only show a character if it's NOT a pawn
  const pieceLabel = piece.pieceType === "pawn" ? "" : piece.char;

  const moves = document.getElementById('moves');
  const whiteMove = document.getElementById('white-move');
  const blackMove = document.getElementById('black-move');

  if (piece.color === 'white') {
    moves.innerHTML += `<li>${moveCounter}</li>`;
    whiteMove.innerHTML += `<li>${pieceLabel}${notation}</li>`;
    return moveCounter;
  }

  blackMove.innerHTML += `<li>${pieceLabel}${notation}</li>`;
  return moveCounter + 1;
}



document.addEventListener("DOMContentLoaded", function() {
  // initialise the game
  chessController.init();
  
 // Checkmate modal: reset on "Play Again" button click
 const winPlayAgainBtn = document.getElementById('winPlayAgainBtn');
 winPlayAgainBtn.addEventListener('click', () => {
   const winModal = bootstrap.Modal.getInstance(document.getElementById('winModal'));
   winModal.hide();
   resetBoard();
 });

  // Stalemate modal: reset when "Play Again" is clicked
  const stalematePlayAgainBtn = document.getElementById('stalematePlayAgainBtn');
  stalematePlayAgainBtn.addEventListener('click', () => {
    const stalemateModal = bootstrap.Modal.getInstance(document.getElementById('stalemateModal'));
    stalemateModal.hide();
    resetBoard();
  });
});


function trySelectPiece(square, chessboard) {
  const squareIndex = parseInt(square.dataset.square);
  const piece = chessboard[getRow(squareIndex)][getCol(squareIndex)];

  if (piece === 0) return false;

  if ((isWhiteToMove && piece.color === 'white') || (!isWhiteToMove && piece.color === 'black')) {
    selectedPiece = piece;
    selectedPieceElement = square.firstChild;
    selectPiece(selectedPieceElement);
    isPieceSelected = true;
    return true;
  }
  return false;
}

function showStalemateModal() {
  const stalemateModal = new bootstrap.Modal(document.getElementById('stalemateModal'));
  gameOver = true;
  stalemateModal.show();
}

function showPromotionModal(callback) {
  const promotionModal = new bootstrap.Modal(document.getElementById('promotionModal'));
  promotionModal.show();

  const buttons = document.querySelectorAll('#promotionModal button');

  const handleClick = (e) => {
    const choice = e.target.getAttribute('data-piece');
    promotionModal.hide();
    buttons.forEach(btn => btn.removeEventListener('click', handleClick));
    callback(choice);
  };

  buttons.forEach(btn => btn.addEventListener('click', handleClick));
}

