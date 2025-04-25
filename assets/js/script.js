/* global bootstrap */
/**
 * Class representing a chess piece.
 */
class Piece {
  /**
   * Creates a new chess piece.
   * @param {string} color - 'white' or 'black'.
   * @param {string} pieceType - Type of the piece ('pawn', 'rook', etc.).
   * @param {number} square - The square index (0–63).
   */
  constructor(color, pieceType, square) {
    this._pieceType = pieceType;
    this._char = {
      pawn: 'p',
      rook: 'r',
      bishop: 'b',
      knight: 'n',
      queen: 'q',
      king: 'k'
    }[pieceType] || '';

    this._hasMoved = false;
    this._color = color;
    this._square = square;
    this._isSelected = false;
  }

  get char() { return this._char; }
  get hasMoved() { return this._hasMoved; }
  set hasMoved(value) { this._hasMoved = value; }
  get color() { return this._color; }
  get pieceType() { return this._pieceType; }
  set pieceType(value) { this._pieceType = value; }
  get square() { return this._square; }
  set square(value) { this._square = value; }
  get row() { return getRow(this._square); }
  get col() { return getCol(this._square); }
  get isSelected() { return this._isSelected; }
  set isSelected(value) { this._isSelected = value; }
}

// Game state variables
let isPieceSelected = false;
let selectedPiece = null;
let isWhiteToMove = true;
let selectedPieceElement = null;
let gameOver = false;
let chessboard = [];
let moveCounter = 1;

/**
 * Initializes restart button listener on page load.
 */
document.addEventListener('DOMContentLoaded', function () {
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('pointerup', function () {
      resetBoard();
    });
  }
});

/**
 * Resets the chessboard and all game state to default.
 */
function resetBoard() {
  clearBoard(document.getElementsByClassName('square'));

  selectedPiece = null;
  selectedPieceElement = null;
  isPieceSelected = false;
  isWhiteToMove = true;
  gameOver = false;
  moveCounter = 1;

  // Clear move history
  document.getElementById('moves').innerHTML = '';
  document.getElementById('white-move').innerHTML = '';
  document.getElementById('black-move').innerHTML = '';

  setupBoard();
}

/**
 * Sets up a fresh board with all pieces in starting positions.
 */
function setupBoard() {
  chessboard = [
    [new Piece('black', 'rook', 0), new Piece('black', 'knight', 1), new Piece('black', 'bishop', 2), new Piece('black', 'queen', 3), new Piece('black', 'king', 4), new Piece('black', 'bishop', 5), new Piece('black', 'knight', 6), new Piece('black', 'rook', 7)],
    [new Piece('black', 'pawn', 8), new Piece('black', 'pawn', 9), new Piece('black', 'pawn', 10), new Piece('black', 'pawn', 11), new Piece('black', 'pawn', 12), new Piece('black', 'pawn', 13), new Piece('black', 'pawn', 14), new Piece('black', 'pawn', 15)],
    Array(8).fill(0),
    Array(8).fill(0),
    Array(8).fill(0),
    Array(8).fill(0),
    [new Piece('white', 'pawn', 48), new Piece('white', 'pawn', 49), new Piece('white', 'pawn', 50), new Piece('white', 'pawn', 51), new Piece('white', 'pawn', 52), new Piece('white', 'pawn', 53), new Piece('white', 'pawn', 54), new Piece('white', 'pawn', 55)],
    [new Piece('white', 'rook', 56), new Piece('white', 'knight', 57), new Piece('white', 'bishop', 58), new Piece('white', 'queen', 59), new Piece('white', 'king', 60), new Piece('white', 'bishop', 61), new Piece('white', 'knight', 62), new Piece('white', 'rook', 63)]
  ];

  moveCounter = 1;

  const squares = document.getElementsByClassName('square');
  for (let i = 0; i < squares.length; i++) {
    squares[i].setAttribute('data-square', i);
  }

  chessView.renderChessboard(chessboard, squares);
}


/**
 * Main controller for the chess game. Handles initialization and square clicks.
 */
const chessController = {
  /**
   * Initializes the game and binds square click events.
   */
  init: function () {
    const squares = document.getElementsByClassName('square');

    setupBoard();

    for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener('click', function () {
        if (gameOver) {
          alert("The game is over! Please click 'Play Again' to start a new game.");
          return;
        }

        if (isPieceSelected) {
          if (checkifMoveIsLegal(selectedPiece, squares[i], chessboard)) {
            const fromRow = getRow(selectedPiece.square);
            const fromCol = getCol(selectedPiece.square);
            const toRow = getRow(squares[i].dataset.square);
            const toCol = getCol(squares[i].dataset.square);
            const capturedPiece = chessboard[toRow][toCol];
            const originalSquare = selectedPiece.square;

            // Try move
            chessboard[toRow][toCol] = selectedPiece;
            chessboard[fromRow][fromCol] = 0;
            selectedPiece.square = squares[i].dataset.square;

            if (isKingInCheck(isWhiteToMove ? 'white' : 'black', chessboard, squares)) {
              new bootstrap.Modal(document.getElementById('checkModal')).show();

              // Undo move
              chessboard[fromRow][fromCol] = selectedPiece;
              chessboard[toRow][toCol] = capturedPiece;
              selectedPiece.square = originalSquare;

              resetSelection(squares[i].firstChild);
              return;
            }

            selectedPiece.hasMoved = true;
            const squareIndex = parseInt(squares[i].dataset.square, 10);
            moveCounter = updateNotation(selectedPiece, squareIndex, moveCounter);
            resetSelection(squares[i].firstChild);
            chessView.renderChessboard(chessboard, squares);

            const movedPiece = chessboard[toRow][toCol];

            if (checkForStalemate(isWhiteToMove ? 'black' : 'white')) {
              showStalemateModal();
              return;
            }

            changePlayerTurn();

            const currentPlayer = isWhiteToMove ? 'white' : 'black';

            if (isKingInCheck(currentPlayer, chessboard, squares)) {
              if (isCheckMate(currentPlayer, chessboard, squares)) {
                const winner = isWhiteToMove ? 'Black' : 'White';
                showWinModal(winner);
                return;
              }
            }
            
            if (isKingInCheck(currentPlayer, chessboard, squares)) {
              new bootstrap.Modal(document.getElementById('checkModal')).show();
            } 

            if (movedPiece.pieceType === 'pawn') {
              const promotionRank = movedPiece.color === 'white' ? 0 : 7;
              if (toRow === promotionRank) {
                showPromotionModal(function (choice) {
                  movedPiece.pieceType = choice;
                  movedPiece.promoted = true;
                  chessView.renderChessboard(chessboard, squares);
                });
              }
            }

          } else {
            resetSelection(squares[i].firstChild);
          }
        } else {
          trySelectPiece(squares[i], chessboard);
        }
      });
    }
  }
};

/**
 * Finds the square index of the player's king on the board.
 * @param {string} playerColor - 'white' or 'black'.
 * @param {Array} chessboard - The 2D array of board state.
 * @returns {number} The square index of the king, or -1 if not found.
 */
function findKingSquare(playerColor, chessboard) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = chessboard[row][col];
      if (piece !== 0 && piece.color === playerColor && piece.pieceType === 'king') {
        return row * 8 + col;
      }
    }
  }
  return -1;
}

/**
 * Gets the row number (0–7) from a square index.
 * @param {number} squareId - The square index.
 * @returns {number} The row.
 */
function getRow(squareId) {
  return Math.floor(squareId / 8);
}

/**
 * Gets the column number (0–7) from a square index.
 * @param {number} squareId - The square index.
 * @returns {number} The column.
 */
function getCol(squareId) {
  return squareId % 8;
}

/**
 * Resets the piece selection state in the UI and logic.
 * @param {HTMLElement} piece - The DOM element to unselect.
 */
function resetSelection(piece) {
  if (selectedPieceElement) {
    selectedPieceElement.classList.remove('selected');
  }
  isPieceSelected = false;
  selectedPiece = null;
}

/**
 * Switches the active player turn.
 */
function changePlayerTurn() {
  isWhiteToMove = !isWhiteToMove;
}

/**
 * Checks if the given player's king is currently in check.
 * @param {string} playerColor - 'white' or 'black'.
 * @param {Array} chessboard - 2D array representing the current board.
 * @param {HTMLCollection} squares - DOM elements representing the board squares.
 * @returns {boolean} True if the king is in check, false otherwise.
 */
function isKingInCheck(playerColor, chessboard, squares) {
  const kingSquare = findKingSquare(playerColor, chessboard);

  for (let i = 0; i < squares.length; i++) {
    const piece = chessboard[getRow(i)][getCol(i)];
    if (piece !== 0 && piece.color !== playerColor) {
      if (checkifMoveIsLegal(piece, squares[kingSquare], chessboard)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Determines whether the specified player is in checkmate.
 * @param {string} playerColor - 'white' or 'black'.
 * @param {Array} chessboard - The game board array.
 * @param {HTMLCollection} squares - The DOM elements representing board squares.
 * @returns {boolean} True if checkmate is detected.
 */
function isCheckMate(playerColor, chessboard, squares) {
  if (!isKingInCheck(playerColor, chessboard, squares)) {
    return false;
  }

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = chessboard[row][col];

      if (piece !== 0 && piece.color === playerColor) {
        const fromSquareIndex = row * 8 + col;

        for (let targetIndex = 0; targetIndex < 64; targetIndex++) {
          if (fromSquareIndex === targetIndex) {
            continue;
          }

          const toRow = getRow(targetIndex);
          const toCol = getCol(targetIndex);
          const targetSquare = squares[targetIndex];

          if (checkifMoveIsLegal(piece, targetSquare, chessboard)) {
            const originalPiece = chessboard[toRow][toCol];
            const oldSquare = piece.square;

            chessboard[toRow][toCol] = piece;
            chessboard[row][col] = 0;
            piece.square = targetIndex;

            const stillInCheck = isKingInCheck(playerColor, chessboard, squares);

            // Undo move
            piece.square = oldSquare;
            chessboard[row][col] = piece;
            chessboard[toRow][toCol] = originalPiece;

            if (!stillInCheck) {
              chessView.renderChessboard(chessboard, squares);
              return false;
            }
          }
        }
      }
    }
  }

  const winner = isWhiteToMove ? 'Black' : 'White';
  showWinModal(winner);
  return true;
}

/**
 * Checks for stalemate or specific draw conditions (e.g. insufficient material).
 * @param {string} playerColor - The player to check ('white' or 'black').
 * @returns {boolean} True if stalemate or draw is detected.
 */
function checkForStalemate(playerColor) {
  const allPieces = chessboard.flat().filter(function (p) {
    return p !== 0;
  });

  const onlyKingsLeft = allPieces.length === 2;
  const singleMinorPiece = (
    allPieces.length === 3 &&
    allPieces.filter(function (p) {
      return p.pieceType !== 'king';
    }).length === 1 &&
    allPieces.some(function (p) {
      return p.pieceType === 'bishop' || p.pieceType === 'knight';
    })
  );

  const doubleKnightDraw = (
    allPieces.length === 4 &&
    allPieces.filter(function (p) {
      return p.pieceType === 'knight';
    }).length === 2 &&
    allPieces.filter(function (p) {
      return p.pieceType === 'king';
    }).length === 2
  );

  if (onlyKingsLeft || singleMinorPiece || doubleKnightDraw) {
    return true;
  }

  const squares = document.getElementsByClassName('square');

  if (isKingInCheck) {return false;}

  if (!isKingInCheck(playerColor, chessboard, squares)) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = chessboard[row][col];

        if (piece !== 0 && piece.color === playerColor) {
          const fromSquareIndex = row * 8 + col;

          for (let targetIndex = 0; targetIndex < 64; targetIndex++) {
            if (fromSquareIndex === targetIndex) {
              continue;
            }

            const toRow = getRow(targetIndex);
            const toCol = getCol(targetIndex);
            const targetSquare = squares[targetIndex];

            if (checkifMoveIsLegal(piece, targetSquare, chessboard)) {
              const originalPiece = chessboard[toRow][toCol];
              const oldSquare = piece.square;

              chessboard[toRow][toCol] = piece;
              chessboard[row][col] = 0;
              piece.square = targetIndex;

              const stillInCheck = isKingInCheck(playerColor, chessboard, squares);

              // Undo move
              piece.square = oldSquare;
              chessboard[row][col] = piece;
              chessboard[toRow][toCol] = originalPiece;

              if (!stillInCheck) {
                chessView.renderChessboard(chessboard, squares);
                return false;
              }
            }
          }
        }
      }
    }
  }

  chessView.renderChessboard(chessboard, squares);
  return true;
}

/**
 * Delegates move validation to the appropriate function based on piece type.
 * @param {Piece} selectedPieceElement - The piece being moved.
 * @param {HTMLElement} square - The target DOM square.
 * @param {Array} chessboard - The 2D game board.
 * @returns {boolean} Whether the move is legal.
 */
function checkifMoveIsLegal(selectedPieceElement, square, chessboard) {
  const from = parseInt(selectedPieceElement.square, 10);
  const to = parseInt(square.dataset.square, 10);

  const piece = chessboard[getRow(from)][getCol(from)];
  const target = chessboard[getRow(to)][getCol(to)];

  if (isSameColor(piece, target)) {
    return false;
  }

  switch (piece.pieceType) {
    case 'pawn':
      return isLegalPawnMove(piece, from, to, chessboard);
    case 'rook':
      return isLegalRookMove(from, to, chessboard);
    case 'knight':
      return isLegalKnightMove(from, to);
    case 'bishop':
      return isLegalBishopMove(from, to, chessboard);
    case 'queen':
      return isLegalRookMove(from, to, chessboard) || isLegalBishopMove(from, to, chessboard);
    case 'king':
      return isLegalKingMove(from, to);
    default:
      return false;
  }
}

/**
 * Determines if a pawn move is legal.
 * @param {Piece} piece - The pawn being moved.
 * @param {number} from - The index of the starting square.
 * @param {number} to - The index of the destination square.
 * @param {Array} chessboard - The 2D board array.
 * @returns {boolean} True if the move is legal.
 */
function isLegalPawnMove(piece, from, to, chessboard) {
  const direction = piece.color === 'white' ? -8 : 8;
  const takeLeft = direction === -8 ? -9 : 7;
  const takeRight = direction === -8 ? -7 : 9;

  const toRow = getRow(to);
  const toCol = getCol(to);

  const targetPiece = chessboard[toRow][toCol];

  // Forward move
  if (to === from + direction && isSquareEmpty(targetPiece)) {
    return true;
  }

  // Double move on first turn
  if (
    !piece.hasMoved &&
    to === from + direction * 2 &&
    isSquareEmpty(chessboard[getRow(from + direction)][getCol(from)]) &&
    isSquareEmpty(targetPiece)
  ) {
    return true;
  }

  // Diagonal capture
  if ((to === from + takeLeft || to === from + takeRight) && !isSquareEmpty(targetPiece) && targetPiece.color !== piece.color) {
    return true;
  }

  return false;
}

/**
 * Determines if a rook move is legal.
 * @param {number} from - Starting square index.
 * @param {number} to - Destination square index.
 * @param {Array} chessboard - The board array.
 * @returns {boolean} True if the move is legal.
 */
function isLegalRookMove(from, to, chessboard) {
  const fromRow = getRow(from);
  const fromCol = getCol(from);
  const toRow = getRow(to);
  const toCol = getCol(to);

  if (fromRow === toRow) {
    const step = fromCol < toCol ? 1 : -1;
    for (let col = fromCol + step; col !== toCol; col += step) {
      if (!isSquareEmpty(chessboard[fromRow][col])) {
        return false;
      }
    }
    return true;
  }

  if (fromCol === toCol) {
    const step = fromRow < toRow ? 1 : -1;
    for (let row = fromRow + step; row !== toRow; row += step) {
      if (!isSquareEmpty(chessboard[row][fromCol])) {
        return false;
      }
    }
    return true;
  }

  return false;
}

/**
 * Determines if a knight move is legal.
 * @param {number} from - Starting square index.
 * @param {number} to - Destination square index.
 * @returns {boolean} True if the move is legal.
 */
function isLegalKnightMove(from, to) {
  const validDeltas = [6, 10, 15, 17];
  const diff = Math.abs(from - to);
  return validDeltas.includes(diff);
}

/**
 * Determines if a bishop move is legal.
 * @param {number} from - Starting square index.
 * @param {number} to - Destination square index.
 * @param {Array} chessboard - The board array.
 * @returns {boolean} True if the move is legal.
 */
function isLegalBishopMove(from, to, chessboard) {
  const fromRow = getRow(from);
  const fromCol = getCol(from);
  const toRow = getRow(to);
  const toCol = getCol(to);

  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (rowDiff !== colDiff) {
    return false;
  }

  const rowStep = toRow > fromRow ? 1 : -1;
  const colStep = toCol > fromCol ? 1 : -1;

  for (let i = 1; i < rowDiff; i++) {
    const row = fromRow + i * rowStep;
    const col = fromCol + i * colStep;
    if (!isSquareEmpty(chessboard[row][col])) {
      return false;
    }
  }

  return true;
}

/**
 * Determines if a king move is legal.
 * @param {number} from - Starting square index.
 * @param {number} to - Destination square index.
 * @returns {boolean} True if the move is legal.
 */
function isLegalKingMove(from, to) {
  const diff = Math.abs(from - to);
  const validMoves = [1, 7, 8, 9];
  return validMoves.includes(diff);
}


/**
 * Checks if a square is empty.
 * @param {*} selectedSquarePiece - The content of the square to check.
 * @returns {boolean} True if the square is empty (0), false otherwise.
 */
function isSquareEmpty(selectedSquarePiece) {
  return selectedSquarePiece === 0;
}

/**
 * Checks if two pieces are the same color.
 * @param {Piece} currentPiece - The first piece to compare.
 * @param {Piece} selectedPiece - The second piece to compare.
 * @returns {boolean} True if both pieces are the same color, false otherwise.
 */
function isSameColor(currentPiece, selectedPiece) {
  return currentPiece.color === selectedPiece.color;
}

/**
 * Creates a DOM element for a chess piece.
 * @param {Piece} piece - The piece to create a DOM element for.
 * @returns {HTMLElement} The created element.
 */
function createPieceElement(piece) {
  const pieceElement = document.createElement('i');
  pieceElement.classList.add('chess-piece', piece.color + '-piece', 'fa-solid', 'fa-chess-' + piece.pieceType);
  return pieceElement;
}

/**
 * Applies visual styling to indicate a selected piece.
 * @param {HTMLElement} piece - The DOM element representing the selected piece.
 */
function selectPiece(piece) {
  if (isPieceSelected && selectedPieceElement !== null) {
    resetSelection(piece);
  }
  selectedPieceElement = piece;
  piece.classList.add('selected');
}

/**
 * View object responsible for rendering the chessboard.
 * @type {{renderChessboard: function(Array, HTMLCollection): void}}
 */
const chessView = {
  /**
   * Renders the board state to the UI.
   * @param {Array} chessboard - 2D array of Piece objects and 0s.
   * @param {HTMLCollection} squares - The DOM elements for the board squares.
   */
  renderChessboard: function (chessboard, squares) {
    clearBoard(squares);
    for (let i = 0; i < squares.length; i++) {
      const row = getRow(i);
      const col = getCol(i);
      if (chessboard[row][col] !== 0) {
        squares[i].appendChild(createPieceElement(chessboard[row][col]));
      }
    }
  }
};

/**
 * Clears all inner content from each square element.
 * @param {HTMLCollection} squares - The DOM elements for the board squares.
 */
function clearBoard(squares) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].innerHTML = '';
  }
}

/**
 * Displays the win modal for the specified winner.
 * @param {string} winner - The winning side ('White' or 'Black').
 */
function showWinModal(winner) {
  document.getElementById('modalMessage').textContent = winner + ' wins!';
  const winModal = new bootstrap.Modal(document.getElementById('winModal'));
  gameOver = true;
  winModal.show();
}

/**
 * Updates the move notation display in the UI.
 * @param {Piece} piece - The piece that was moved.
 * @param {number} squareIndex - The square index it moved to.
 * @param {number} moveCounter - The current move number.
 * @returns {number} Updated move counter.
 */
function updateNotation(piece, squareIndex, moveCounter) {
  const file = 'abcdefgh'[squareIndex % 8];
  const rank = 8 - Math.floor(squareIndex / 8);
  const notation = file + rank;
  const pieceLabel = piece.pieceType === 'pawn' ? '' : piece.char;

  const moves = document.getElementById('moves');
  const whiteMove = document.getElementById('white-move');
  const blackMove = document.getElementById('black-move');

  if (piece.color === 'white') {
    moves.innerHTML += '<li>' + moveCounter + '</li>';
    whiteMove.innerHTML += '<li>' + pieceLabel + notation + '</li>';
    return moveCounter;
  }

  blackMove.innerHTML += '<li>' + pieceLabel + notation + '</li>';
  return moveCounter + 1;
}

/**
 * Initializes modal listeners and the game on page load.
 */
document.addEventListener('DOMContentLoaded', function () {
  chessController.init();

  // Show the Rules modal on load 
  const rulesModalEl = document.getElementById('rulesModal');
  if (rulesModalEl) {
    new bootstrap.Modal(rulesModalEl).show();
  }

  const winBtn = document.getElementById('winPlayAgainBtn');
  const stalemateBtn = document.getElementById('stalematePlayAgainBtn');

  // colse win modal after cta
  if (winBtn) {
    winBtn.addEventListener('click', function () {
      closeModalAndReset('winModal');
    });
  }

  // close stalemate modal after cta 
  if (stalemateBtn) {
    stalemateBtn.addEventListener('click', function () {
      closeModalAndReset('stalemateModal');
    });
  }
});


/**
 * Attempts to select a piece on the given square if it belongs to the current player.
 * @param {HTMLElement} square - The DOM element representing the clicked square.
 * @param {Array} chessboard - The 2D array representing the current game board.
 * @returns {boolean} True if a piece was selected, false otherwise.
 */
function trySelectPiece(square, chessboard) {
  const squareIndex = parseInt(square.dataset.square, 10);
  const piece = chessboard[getRow(squareIndex)][getCol(squareIndex)];

  if (piece === 0) {
    return false;
  }

  if ((isWhiteToMove && piece.color === 'white') || (!isWhiteToMove && piece.color === 'black')) {
    selectedPiece = piece;
    selectedPieceElement = square.firstChild;
    selectPiece(selectedPieceElement);
    isPieceSelected = true;
    return true;
  }

  return false;
}

/**
 * Displays the stalemate modal and ends the game.
 */
function showStalemateModal() {
  const stalemateModal = new bootstrap.Modal(document.getElementById('stalemateModal'));
  gameOver = true;
  stalemateModal.show();
}

/**
 * Displays the pawn promotion modal and handles piece choice.
 * @param {function} callback - The function to call with the selected promotion piece.
 */
function showPromotionModal(callback) {
  const promotionModal = new bootstrap.Modal(document.getElementById('promotionModal'));
  promotionModal.show();

  const buttons = document.querySelectorAll('#promotionModal button');

  /**
   * Handles the click event for promotion choice.
   * @param {PointerEvent} e - The event object from the button click.
   */
  const handleClick = function (e) {
    const choice = e.target.getAttribute('data-piece');
    promotionModal.hide();
    buttons.forEach(function (btn) {
      btn.removeEventListener('pointerup', handleClick);
    });
    callback(choice);
  };

  buttons.forEach(function (btn) {
    btn.addEventListener('pointerup', handleClick);
  });
}

/**
 * Closes a modal and resets the board after a short delay.
 * @param {string} modalId - The ID of the modal to close.
 */
function closeModalAndReset(modalId) {
  const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
  if (modal) {
    modal.hide();
  }

  setTimeout(function () {
    document.body.classList.remove('modal-open');
    document.querySelectorAll('.modal-backdrop').forEach(function (el) {
      el.remove();
    });
    resetBoard();
  }, 300);
}


