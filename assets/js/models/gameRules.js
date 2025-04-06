import { isSquareEmpty } from "../boardUtils.js";

export function checkRookMove(fromRow, fromCol, toRow, toCol, board) {
  if (fromRow !== toRow && fromCol !== toCol) return false;

  if (fromRow === toRow) {
    const step = fromCol < toCol ? 1 : -1;
    for (let col = fromCol + step; col !== toCol; col += step) {
      if (!isSquareEmpty(board[fromRow][col])) return false;
    }
  } else {
    const step = fromRow < toRow ? 1 : -1;
    for (let row = fromRow + step; row !== toRow; row += step) {
      if (!isSquareEmpty(board[row][fromCol])) return false;
    }
  }

  return true;
}

export function checkBishopMove(fromRow, fromCol, toRow, toCol, board) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  if (rowDiff !== colDiff) return false;

  const rowStep = toRow > fromRow ? 1 : -1;
  const colStep = toCol > fromCol ? 1 : -1;

  for (let i = 1; i < rowDiff; i++) {
    const row = fromRow + i * rowStep;
    const col = fromCol + i * colStep;
    if (!isSquareEmpty(board[row][col])) return false;
  }

  return true;
}

export function checkQueenMove(fromRow, fromCol, toRow, toCol, board) {
  return (
    checkRookMove(fromRow, fromCol, toRow, toCol, board) ||
    checkBishopMove(fromRow, fromCol, toRow, toCol, board)
  );
}

export function checkKnightMove(fromRow, fromCol, toRow, toCol) {
  const rowDiff = Math.abs(fromRow - toRow);
  const colDiff = Math.abs(fromCol - toCol);

  // Knight moves in an L shape: 2 + 1 in any direction
  return (
    (rowDiff === 2 && colDiff === 1) ||
    (rowDiff === 1 && colDiff === 2)
  );
}

export function checkPawnMove(fromRow, fromCol, toRow, toCol, board, color, hasMoved) {
  const direction = color === "white" ? -1 : 1;
  const startRow = color === "white" ? 6 : 1;

  const rowDiff = toRow - fromRow;
  const colDiff = Math.abs(toCol - fromCol);
  const destination = board[toRow][toCol];

  // Regular 1-step forward move
  if (colDiff === 0 && rowDiff === direction && isSquareEmpty(destination)) {
    return true;
  }

  // 2-step forward move from starting rank
  if (
    colDiff === 0 &&
    rowDiff === 2 * direction &&
    fromRow === startRow &&
    isSquareEmpty(destination) &&
    isSquareEmpty(board[fromRow + direction][fromCol])
  ) {
    return true;
  }

  // Diagonal capture
  if (
    colDiff === 1 &&
    rowDiff === direction &&
    !isSquareEmpty(destination) &&
    destination.color !== color
  ) {
    return true;
  }

  // Later: handle en passant here

  return false;
}

export function checkKingMove(fromRow, fromCol, toRow, toCol) {
  const rowDiff = Math.abs(fromRow - toRow);
  const colDiff = Math.abs(fromCol - toCol);

  // King can move 1 square in any direction
  return rowDiff <= 1 && colDiff <= 1;

  // Castling logic could go here later
}
