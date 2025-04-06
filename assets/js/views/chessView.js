import { getRow, getCol } from "../utils/boardUtils.js";

/**
 * Creates a DOM element for a chess piece.
 */
function createPieceElement(piece) {
  const pieceElement = document.createElement("i");
  pieceElement.classList.add(
    "chess-piece",
    `${piece.color}-piece`,
    "fa-solid",
    `fa-chess-${piece.pieceType}`
  );
  return pieceElement;
}

/**
 * Clears all content from each square.
 */
function clearBoard(squares) {
  for (let square of squares) {
    square.innerHTML = "";
  }
}

/**
 * Renders the board based on the current chessboard array.
 */
function renderChessboard(chessboard, squares) {
  clearBoard(squares);
  for (let i = 0; i < squares.length; i++) {
    const row = getRow(i);
    const col = getCol(i);
    const piece = chessboard[row][col];
    if (piece !== 0) {
      squares[i].appendChild(createPieceElement(piece));
    }
  }
}

export const chessView = {
  renderChessboard,
};
