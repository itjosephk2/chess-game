export function getRow(squareId) {
    return Math.floor(squareId / 8);
  }
  
  export function getCol(squareId) {
    return squareId % 8;
  }
  