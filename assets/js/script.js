  // Class For pieces
  class Piece {
    // Constructor for setting default parameters
    constructor(char, color, pieceType, square) {
      this._char = char;
      this._hasMoved = false;
      this._color = color;
      this._pieceType = pieceType;
      this._square = square;
      this._isSelected = false
    }
    // Getter and Setters for variables
    get char() {
      return this._char;
    }
    set char(char) {
      this._char = char;
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
    get isSelected() {
      return this._isSelected;
    }
    set isSelected(isSelected) {
      this._isSelected = isSelected;
    }
  }


  // Controller
  const chessController = {
    init: function() {
      // Create a chess board array for controlling logic and movement and then use this to render visuals to the screen. Easy!
      let chessboard = [
        [new Piece('r', "black", "rook", 0), new Piece('n', "black", "knight", 1), new Piece('b', "black", "bishop", 2), new Piece('q', "black", "queen", 3), new Piece('k', "black", "king", 4), new Piece('b', "black", "bishop", 5), new Piece('n', "black", "knight", 6), new Piece('r', "black", "rook", 7)],
        [new Piece('p', "black", "pawn", 8), new Piece('p', "black", "pawn", 9), new Piece('p', "black", "pawn", 10), new Piece('p', "black", "pawn", 11), new Piece('p', "black", "pawn", 12), new Piece('p', "black", "pawn", 13), new Piece('p', "black", "pawn", 14), new Piece('p', "black", "pawn", 15)],
        Array(8).fill(0),
        Array(8).fill(0),
        Array(8).fill(0),
        Array(8).fill(0),
        [new Piece('P', "white", "pawn", 48), new Piece('P', "white", "pawn", 49), new Piece('P', "white", "pawn", 50), new Piece('P', "white", "pawn", 51), new Piece('P', "white", "pawn", 52), new Piece('P', "white", "pawn", 53), new Piece('P', "white", "pawn", 54), new Piece('P', "white", "pawn", 55)],
        [new Piece('R', "white", "rook", 56), new Piece('N', "white", "knight", 57), new Piece('B', "white", "bishop", 58), new Piece('Q', "white", "queen", 59), new Piece('K', "white", "king", 60), new Piece('B', "white", "bishop", 61), new Piece('N', "white", "knight", 62), new Piece('R', "white", "rook", 63)],
      ];

      // create an array of squares on the board called sqaures
      const squares = document.getElementsByClassName("square");
      // Loop through each square in squares
      for (let i = 0; i < squares.length; i++) {
        // Assign each square an equivilant data taag to ap it to the array.
        squares[i].setAttribute("data-square", i);
      }

      //  Lets render the pieces to the chessBoard.
      chessView.renderChessboard(chessboard, squares);



      let list = document.getElementsByTagName('li')

      for (let item of list) {
        item.addEventListener("click", function(){
          if (item.innerHTML == "Theme A") {
            const squares = document.getElementsByClassName("square");
            // Loop through each square in squares
            for (square of squares) {
              // Assign each square an equivilant data taag to ap it to the array.
              if (square.classList.contains("red")) {
                square.classList.remove("red");
                square.classList.add("white")
              }
              if (square.classList.contains("green")) {
                square.classList.remove("green");
                square.classList.add("black");
              }
            }
          }
          if (item.innerHTML == "Theme B") {
            const squares = document.getElementsByClassName("square");
            // Loop through each square in squares
            for (square of squares) {
              // Assign each square an equivilant data taag to ap it to the array.
              if (square.classList.contains("white")) {
                square.classList.remove("white");
                square.classList.add("red")
              }
              if (square.classList.contains("black")) {
                square.classList.remove("black");
                square.classList.add("green")
              }
            }
          }
        });
      }

      // Event listener for Clicking on a square
      for (let square of squares) {
        square.addEventListener("click", function () {
          // If a piece is Selected Then check for moving the selected Piece
          if (isPieceSelected) {
            console.log(isPieceSelected);
            console.log(selectedPiece);
            if(!isKingInCheck(isWhiteToMove ? 'white': 'black', chessboard, squares)) {
            // (isKingInCheck(isWhiteToMove ? 'white': 'black', chessboard, squares) && selectedPiece.pieceType == "king")) {
              // Check for the legality of a move
              // debugger;
              console.log(selectedPiece);
              let isMoveLegal = checkifMoveIsLegal(selectedPiece, square, chessboard);
              console.log(logselectedPiece);
              // Move is considered to be legal
              if (isMoveLegal) {
                // Move the piece
                console.log(selectedPiece);
                chessboard = movePiece(square, chessboard, selectedPiece);
                // Print the chess board to console for debugging purposes
                console.table(chessboard);
                resetSelection(square.firstChild);
                chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)].square = square.dataset.square;
                chessView.renderChessboard(chessboard, squares);

                // Change the players turn
                changePlayerTurn();
              }
            }
            // Illegal move resets pieces selection
            else {
              if(isPieceSelected) {
                resetSelection(square.firstChild);
              }
            }

          }
          // No piece was Previously selected so lets see if we can select one
          else {
            // Is it whites Turn
            if (isWhiteToMove) {
              // Is there a white piece here
              if ( chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)] != 0 && chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)].color == "white") {
                // set selected piece to the equivilant object
                selectedPiece = chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)];
                console.log(selectedPiece);
                selectedPieceElement = square.firstChild;
                // Decorate the piece to make it selected
                selectPiece(selectedPieceElement);
                isPieceSelected = true
              }
              else {
                alert("It is whites turn");
              }
            }
            // Same check if it is black to move
            else {
              if ( chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)] != 0 && chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)].color == "black")  {
                // set selected piece to the equivilant object
                selectedPiece = chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)];
                selectedPieceElement = square.firstChild;
                // Decorate the piece to make it selected
                selectPiece(selectedPieceElement);
                isPieceSelected = true
              }
              else {
                alert("It is blacks turn");
              }
            }
          }
        });
      }

    }
  }

  // Additional state variables and theyre default values
  let isPieceSelected = false;
  let selectedPiece = null;
  let isWhiteToMove = true;
  let selectedPieceElement = null;
  /**
  * Get the row of the index given
  */
  function getRow(squareId) {
    return Math.floor(squareId / 8);
  }
  /**
  * Get the column of the index given
  */
  function getCol(squareId) {
    return squareId % 8;
  }
  /**
  * CHeck which direction the piece is moving
  */
  function getDirection(isDirection, direction) {
    if (isDirection) {
      return direction = direction * -1;
    }
    return direction = direction;
  }

  /**
  * Reset the piece selection state
  */
  function resetSelection(piece) {
    selectedPieceElement.classList.remove("selected");
    isPieceSelected = false;
    selectedPiece = null;
  }
  /**
  * Change player
  */
  function changePlayerTurn() {
    isWhiteToMove = isWhiteToMove ? false : true;
  }

function isKingInCheck(playerColor, chessboard, squares) {
  let isLegal
  // Iterate through the entire board
  for (square of squares) {
    const piece = chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)];
    if (piece.color != playerColor && piece != 0) {
        // Check if this piece can attack the king's position
        for (square of squares) {
          isLegal = checkifMoveIsLegal(piece, square, chessboard);
          if (isLegal && chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)].pieceType == "king") {
            console.log("You are in check");
            return true;
          }
        }

    }
  }
  return false; // King is not in check
}

  /**
  * This does way too much right now and needs to be refactored
  */
  function checkifMoveIsLegal(selectedPiece, square, chessboard) {
    let currentSquare = parseInt(selectedPiece.square);
    let selectedSquare = parseInt(square.dataset.square);
    let squaresMoved = currentSquare - selectedSquare;
    let currentSquareRow = getRow(currentSquare);
    let currentSquareCol = getCol(currentSquare);
    let selectedSquareRow = getRow(selectedSquare);
    let selectedSquareCol = getCol(selectedSquare);
    const LEFT = -1;
    const RIGHT = 1;
    const UP = - 8;
    const DOWN = + 8;
    const UPRIGHT = -7;
    const UPLEFT = -9;
    const DOWNLEFT = 7;
    const DOWNRIGHT = 9;

    if (squaresMoved < 0) {
      squaresMoved = squaresMoved * -1;
    }

    if (chessboard[selectedSquareRow][selectedSquareCol] != 0) {
      if (selectedPiece.color == chessboard[getRow(parseInt(square.dataset.square))][getCol(parseInt(square.dataset.square))].color) {
        resetSelection(selectedPiece);
        return false;
      }
    }
    let isBackwards = true;
    let isLeft = true;
    let rowChange;
    let colChange;
    switch (selectedPiece.char) {

      case 'P':
        if (chessboard[selectedSquareRow][selectedSquareCol] == 0 &&
          selectedSquare == currentSquare + UP ||
          // Moving forwards 2 spaces on turn 1
          (chessboard[selectedSquareRow][selectedSquareCol] == 0 &&
          chessboard[getRow(currentSquare + UP)][currentSquareCol] == 0 &&
          !selectedPiece.hasMoved &&
          selectedSquare == currentSquare + (UP * 2)) ||
          // Taking Left
          (chessboard[selectedSquareRow][selectedSquareCol] != 0 &&
             selectedSquare == currentSquare + UPLEFT) ||
          // Taking Right
          (chessboard[selectedSquareRow][selectedSquareCol] != 0
            && selectedSquare == currentSquare + UPRIGHT)
          ) {
            selectedPiece.hasMoved = true;
            return true;
          }
        return false;

      case 'p':

        // moving forward 1 space
        if (square.innerHTML == '' &&
          selectedSquare - 8 == currentSquare ||

          // MOving 2 spaces on turn 1
          (square.innerHTML == '' &&
          chessboard[Math.floor((selectedSquare - 8) / 8)]
          [(selectedSquare - 8) % 8] == 0 &&
          !selectedPiece.hasMoved &&
          selectedSquare - 16 == currentSquare) ||

          // Capture Left
          (square.innerHTML != '' &&
            selectedSquare - 7 == currentSquare
            && square.firstChild.dataset.color != selectedPiece.color) ||

          // Capture Right
          (square.innerHTML != '' &&
            selectedSquare - 9 == currentSquare
            && square.firstChild.dataset.color != selectedPiece.color)
          ) {
          selectedPiece.hasMoved = true;
          return true;
        }
        return false;

      case 'R':
      case 'r':
        if (currentSquareRow < selectedSquareRow) {
          isBackwards = false;
        }
        if (currentSquareCol < selectedSquareCol) {
          isLeft = false;
        }

        if (selectedSquareRow == currentSquareRow) {
          if (isLeft) {
            for (let i = 1; i < squaresMoved; i++) {
              if (chessboard[currentSquareRow][currentSquareCol - i] != 0) {
                return false;
              }
            }
          }
          else {
            for (let i = 1; i < squaresMoved; i++) {
              if (chessboard[currentSquareRow][currentSquareCol + i] != 0) {
                return false;
              }
            }
          }
        }

        if (selectedSquareCol == currentSquareCol) {
          if (!isBackwards) {
            for (let i = 1; i < (squaresMoved/8); i++) {
              if (chessboard[parseInt(currentSquareRow) + i][currentSquareCol] != 0) {
                return false;
              }
            }
          }
          else {
            for (let i = 1; i < (squaresMoved/8); i++) {
              if (chessboard[parseInt(currentSquareRow) - i][currentSquareCol] != 0) {
                return false;
              }
            }
          }
        }
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
          return true;
        }
        return false;

      case 'b':
      case 'B':
        if (currentSquareRow < selectedSquareRow) {
          isBackwards = false;
        }
        if (currentSquareCol < selectedSquareCol) {
          isLeft = false;
        }
        if (squaresMoved % 7 == 0) {
          for (let i = 1; i < squaresMoved / 7; i++) {
            rowChange = getDirection(isBackwards, i);
            colChange = getDirection(isLeft, i);
            if (chessboard[currentSquareRow + rowChange][currentSquareCol + colChange] != 0) {
              return false;
            }
          }
        }
        if (squaresMoved % 9 == 0) {
          for (let i = 1; i < squaresMoved / 9; i++) {
            rowChange = getDirection(isBackwards, i);
            colChange = getDirection(isLeft, i);
            if (chessboard[currentSquareRow + rowChange][currentSquareCol + colChange] != 0) {
              return false;
            }
          }
        }
        if (square.dataset.color === selectedPieceElement.parentElement.dataset.color &&
        squaresMoved % 7 == 0 ||
        square.dataset.color === selectedPieceElement.parentElement.dataset.color &&
        squaresMoved % 9 == 0 ) {
          return true;
        }
        return false;

      case 'Q':
      case 'q':
        let orignalChar = selectedPiece.char;
        selectedPiece.char = 'R';
        if (checkifMoveIsLegal(selectedPiece, square, chessboard)) {
          selectedPiece.char = orignalChar;
          return true;
        }
        selectedPiece.char = "B";
        if (checkifMoveIsLegal(selectedPiece, square, chessboard)) {
          selectedPiece.char = orignalChar;
          return true;
        }
        selectedPiece.char = orignalChar;
        return false;

      case 'K':
      case 'k':
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
        return false;
      default:
        break;
    }
    return true;
  }



  /**
  * Select square to move to
  */
  function movePiece(square, chessboard, selectedPiece) {
    chessboard[getRow(selectedPiece.square)][getCol(selectedPiece.square)] = 0;
    chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)] = selectedPiece;
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
    selectedPieceElemenet = piece;
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

  // Model, Controller Initialization
  document.addEventListener("DOMContentLoaded", function() {
    // initialise the game
    chessController.init();
  });
