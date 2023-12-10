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
      this._col = getCol(this._col);
    }
    // Getter and Setters for variables
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
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  function initTutorial() {
    console.log("tutorial");
    chessboard = [
      Array(9).fill(0),
      [new Piece("black", "pawn", 8), new Piece("black", "pawn", 9), new Piece("black", "pawn", 10), new Piece("black", "pawn", 11), new Piece("black", "pawn", 12), new Piece("black", "pawn", 13), new Piece("black", "pawn", 14), new Piece("black", "pawn", 15)],
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      Array(8).fill(0),
      [new Piece("white", "pawn", 48), new Piece("white", "pawn", 49), new Piece("white", "pawn", 50), new Piece("white", "pawn", 51), new Piece("white", "pawn", 52), new Piece("white", "pawn", 53), new Piece("white", "pawn", 54), new Piece("white", "pawn", 55)],
      Array(8).fill(0)
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
  }

  // Controller
  const chessController = {
    init: function() {

      /* When the user clicks on the button,
      toggle between hiding and showing the dropdown content */

      // Create a chess board array for controlling logic and movement and then use this to render visuals to the screen. Easy!
      let chessboard = [
        [new Piece("black", "rook", 0), new Piece("black", "knight", 1), new Piece("black", "bishop", 2), new Piece("black", "queen", 3), new Piece("black", "king", 4), new Piece("black", "bishop", 5), new Piece("black", "knight", 6), new Piece("black", "rook", 7)],
        [new Piece("black", "pawn", 8), new Piece("black", "pawn", 9), new Piece("black", "pawn", 10), new Piece("black", "pawn", 11), new Piece("black", "pawn", 12), new Piece("black", "pawn", 13), new Piece("black", "pawn", 14), new Piece("black", "pawn", 15)],
        Array(8).fill(0),
        Array(8).fill(0),
        Array(8).fill(0),
        Array(8).fill(0),
        [new Piece("white", "pawn", 48), new Piece("white", "pawn", 49), new Piece("white", "pawn", 50), new Piece("white", "pawn", 51), new Piece("white", "pawn", 52), new Piece("white", "pawn", 53), new Piece("white", "pawn", 54), new Piece("white", "pawn", 55)],
        [new Piece("white", "rook", 56), new Piece("white", "knight", 57), new Piece("white", "bishop", 58), new Piece("white", "queen", 59), new Piece("white", "king", 60), new Piece("white", "bishop", 61), new Piece("white", "knight", 62), new Piece("white", "rook", 63)],
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


      const list = document.getElementsByTagName('li');

      for (let item of list) {
        item.addEventListener("click", function(){
          if (item.innerHTML == "Tutorial") {
            initTutorial();
          }
          if (item.innerHTML == "Theme A") {
            let squares = document.getElementsByClassName("square");
            // Loop through each square in squares
            for (let square of squares) {
              // Assign each square an equivilant data taag to ap it to the array.
              if (square.classList.contains("red")) {
                square.classList.remove("red");
                square.classList.add("white");
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
            for (let square of squares) {
              // Assign each square an equivilant data taag to ap it to the array.
              if (square.classList.contains("white")) {
                square.classList.remove("white");
                square.classList.add("red");
              }
              if (square.classList.contains("black")) {
                square.classList.remove("black");
                square.classList.add("green");
              }
            }
          }
          if (item.innerHTML == "Theme C") {
            const squares = document.getElementsByClassName("square");
            // Loop through each square in squares
            for (let square of squares) {
              // Assign each square an equivilant data taag to ap it to the array.
              if (square.classList.contains("red")) {
                square.classList.remove("red");
                square.classList.add("white");
              }
              if (square.classList.contains("green")) {
                square.classList.remove("green");
                square.classList.add("black");
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
            // if(!isKingInCheck(isWhiteToMove ? 'white': 'black', chessboard, squares)) {
            // (isKingInCheck(isWhiteToMove ? 'white': 'black', chessboard, squares) && selectedPiece.pieceType == "king")) {
              // Check for the legality of a move
              // debugger;
              console.log(selectedPiece);
              let isMoveLegal = checkifMoveIsLegal(selectedPiece, square, chessboard);
              console.log(selectedPiece);
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
              // }
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
                isPieceSelected = true;
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
                isPieceSelected = true;
              }
              else {
                alert("It is blacks turn");
              }
            }
          }
        });
      }

    }
  };

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
      return direction * -1;
    }
    return direction;
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
  let isLegal;
  // Iterate through the entire board
  for (let square of squares) {
    const piece = chessboard[getRow(square.dataset.square)][getCol(square.dataset.square)];
    if (piece.color != playerColor && piece != 0) {
        // Check if this piece can attack the king's position
        for (let square of squares) {
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
    // setting variables for current square
    let currentSquare = parseInt(selectedPiece.square);
    let currentSquareRow = getRow(currentSquare);
    let currentSquareCol = getCol(currentSquare);
    // Setting variables for selectedSquare
    let selectedSquare = parseInt(square.dataset.square);
    let selectedSquareRow = getRow(selectedSquare);
    let selectedSquareCol = getCol(selectedSquare);

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

    // Squares Moved
    let squaresMoved = currentSquare - selectedSquare;
    if (squaresMoved < 0) {
      squaresMoved = squaresMoved * -1;
    }

    // check Movement of pieces
    switch (selectedPiece.pieceType) {

      case 'pawn':
      let direction = UP;
      let takeLeft = UPLEFT;
      let takeRight = UPRIGHT;
        if (selectedPiece.color == 'black') {
          direction = DOWN;
          takeLeft = DOWNLEFT;
          takeRight = DOWNRIGHT;
        }
        if (chessboard[selectedSquareRow][selectedSquareCol] == 0 &&
          selectedSquare == currentSquare + direction ||
          // Moving forwards 2 spaces on turn 1
          (chessboard[selectedSquareRow][selectedSquareCol] == 0 &&
          chessboard[getRow(currentSquare + direction)][currentSquareCol] == 0 &&
          !selectedPiece.hasMoved &&
          selectedSquare == currentSquare + (direction * 2)) ||
          // Taking Left
          (chessboard[selectedSquareRow][selectedSquareCol] != 0 &&
             selectedSquare == currentSquare + takeLeft) ||
          // Taking Right
          (chessboard[selectedSquareRow][selectedSquareCol] != 0 &&
             selectedSquare == currentSquare + takeRight)
          ) {
            selectedPiece.hasMoved = true;
            return true;
          }
        return false;

      case 'rook':
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

      case 'knight':
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

      case 'bishop':
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

      case 'queen':
        let originalType = selectedPiece.pieceType;
        selectedPiece.pieceType = 'rook';
        if (checkifMoveIsLegal(selectedPiece, square, chessboard)) {
          selectedPiece.pieceType = originalType;
          return true;
        }
        selectedPiece.pieceType = "bishop";
        if (checkifMoveIsLegal(selectedPiece, square, chessboard)) {
          selectedPiece.pieceType = originalType;
          return true;
        }
        selectedPiece.pieceType = originalType;
        return false;

      case 'king':
      // console.log(selectedPiece.color);
      // console.log(`selected square - 2 ${selectedSquare - (LEFT * 2)});
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
        else if (selectedPiece.color == 'white' &&
        selectedSquare - (LEFT * 2) == currentSquare &&
        !selectPiece.hasMoved &&
        !chessboard[7][0].hasMoved) {
          return true;
        }
        return false;
      default:
        break;
    }
    //Reset selected piece if selecting your own piece
    if (chessboard[selectedSquareRow][selectedSquareCol] != 0 &&
    selectedPiece.color == chessboard[selectedSquareRow][selectedSquareCol].color) {
      resetSelection(selectedPiece);
      return false;
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

  // Model, Controller Initialization
  document.addEventListener("DOMContentLoaded", function() {
    // initialise the game
    chessController.init();
  });
