export class Piece {
  constructor(color, pieceType, square) {
    this._pieceType = pieceType;
    this._char = {
      pawn: 'p',
      rook: 'r',
      bishop: 'b',
      knight: 'n',
      queen: 'q',
      king: 'k',
    }[pieceType] || '';

    this._hasMoved = false;
    this._color = color;
    this._square = square;
    this._isSelected = false;
    this._row = getRow(this._square);
    this._col = getCol(this._square);
  }

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
