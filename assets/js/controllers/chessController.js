import { Piece } from "../models/Piece.js";
import { getRow, getCol } from "../utils/boardUtils.js";
import {
  checkRookMove,
  checkBishopMove,
  checkQueenMove,
  checkKnightMove,
  checkPawnMove,
  checkKingMove,
} from "../models/moveValidation.js";
import { chessView } from "../views/chessView.js";

export const chessController = {
  chessboard: [],
  selectedPiece: null,
  selectedPieceElement: null,
  isWhiteToMove: true,
  isPieceSelected: false,
  moveCounter: 1,

  init() {
    // Set up the initial board
    this.chessboard = this.createBoard();
    const squares = document.getElementsByClassName("square");

    // Attach square indices to DOM
    for (let i = 0; i < squares.length; i++) {
      squares[i].setAttribute("data-square", i);
    }

    chessView.renderChessboard(this.chessboard, squares);
    this.addSquareListeners(squares);
  },

  createBoard() {
    return [
      [new Piece("black", "rook", 0), new Piece("black", "knight", 1), new Piece("black", "bishop", 2), new Piece("black", "queen", 3), new Piece("black", "king", 4), new Piece("black", "bishop", 5), new Piece("black", "knight", 6), new Piece("black", "rook", 7)],
      [new Piece("black", "pawn", 8), new Piece("black", "pawn", 9), new Piece("black", "pawn", 10), new Piece("black", "pawn", 11), new Piece("black", "pawn", 12), new Piece("black", "pawn", 13), new Piece("black", "pawn", 14), new Piece("black", "pawn", 15)],
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      [new Piece("white", "pawn", 48), new Piece("white", "pawn", 49), new Piece("white", "pawn", 50), new Piece("white", "pawn", 51), new Piece("white", "pawn", 52), new Piece("white", "pawn", 53), new Piece("white", "pawn", 54), new Piece("white", "pawn", 55)],
      [new Piece("white", "rook", 56), new Piece("white", "knight", 57), new Piece("white", "bishop", 58), new Piece("white", "queen", 59), new Piece("white", "king", 60), new Piece("white", "bishop", 61), new Piece("white", "knight", 62), new Piece("white", "rook", 63)],
    ];
  },

  addSquareListeners(squares) {
    for (let square of squares) {
      square.addEventListener("click", () => this.handleSquareClick(square));
    }
  },

  handleSquareClick(square) {
    const squareIndex = parseInt(square.dataset.square);
    const row = getRow(squareIndex);
    const col = getCol(squareIndex);
    const targetPiece = this.chessboard[row][col];

    if (this.isPieceSelected) {
      // Attempt move
      if (this.tryMove(this.selectedPiece, square)) {
        this.renderAndSwitch(square);
      } else {
        this.resetSelection();
      }
    } else {
      // Select a piece
      if (targetPiece !== 0 && targetPiece.color === (this.isWhiteToMove ? "white" : "black")) {
        this.selectedPiece = targetPiece;
        this.selectedPieceElement = square.firstChild;
        this.isPieceSelected = true;
        this.selectedPieceElement.classList.add("selected");
      } else {
        alert(`It is ${this.isWhiteToMove ? "white" : "black"}'s turn`);
      }
    }
  },

  tryMove(piece, square) {
    const fromSquare = parseInt(piece.square);
    const toSquare = parseInt(square.dataset.square);
    const fromRow = getRow(fromSquare);
    const fromCol = getCol(fromSquare);
    const toRow = getRow(toSquare);
    const toCol = getCol(toSquare);
    const destination = this.chessboard[toRow][toCol];

    if (destination !== 0 && destination.color === piece.color) return false;

    const moveIsLegal = this.checkPieceMove(piece, fromRow, fromCol, toRow, toCol, destination);
    if (!moveIsLegal) return false;

    // Execute move
    this.chessboard[fromRow][fromCol] = 0;
    this.chessboard[toRow][toCol] = piece;
    piece.square = toSquare;
    piece.hasMoved = true;

    return true;
  },

  checkPieceMove(piece, fromRow, fromCol, toRow, toCol, destination) {
    const type = piece.pieceType;
    switch (type) {
      case "pawn":
        return checkPawnMove(fromRow, fromCol, toRow, toCol, this.chessboard, piece.color, piece.hasMoved);
      case "rook":
        return checkRookMove(fromRow, fromCol, toRow, toCol, this.chessboard);
      case "bishop":
        return checkBishopMove(fromRow, fromCol, toRow, toCol, this.chessboard);
      case "queen":
        return checkQueenMove(fromRow, fromCol, toRow, toCol, this.chessboard);
      case "knight":
        return checkKnightMove(fromRow, fromCol, toRow, toCol);
      case "king":
        return checkKingMove(fromRow, fromCol, toRow, toCol);
    }
    return false;
  },

  resetSelection() {
    if (this.selectedPieceElement) {
      this.selectedPieceElement.classList.remove("selected");
    }
    this.selectedPiece = null;
    this.selectedPieceElement = null;
    this.isPieceSelected = false;
  },

  renderAndSwitch(square) {
    const squares = document.getElementsByClassName("square");
    this.resetSelection();
    chessView.renderChessboard(this.chessboard, squares);
    this.isWhiteToMove = !this.isWhiteToMove;
    this.moveCounter++;
  },
};
