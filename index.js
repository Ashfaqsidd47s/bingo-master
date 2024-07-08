class Board {
    
    constructor() {
        this.board = Board.generateRandomBoard();
    }

    // method genrates a random board
    static generateRandomBoard() {
        const size = 5;
        const numbers = [];

        // Fill the array with numbers 1 to 25
        for (let i = 1; i <= size * size; i++) {
            numbers.push(i);
        }

        // Shuffle the array
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        // Create the 5x5 array
        const board = [];
        for (let i = 0; i < size; i++) {
            board[i] = numbers.slice(i * size, i * size + size);
        }

        return board;
    }
}

class Bingo {

    constructor() {
        this.playerWhiteBoard = new Board().board;
        this.playerBlackBoard = new Board().board;
        this.whiteBingoCount = 0;
        this.blackBingoCount = 0;
        this.canceledNumbers = [];
        this.turn = 'w';
        this.winner = null;
    }

    cancelNumber = function(number, player) {
        if(this.isGameOver()){
            return;
        }
        if(number < 1 && number > 25 ){
            return;
        }
        if(this.canceledNumbers.includes(number)){
            return;
        }
        if(this.turn == player) {
            this.canceledNumbers.push(number);
            this.whiteBingoCount = this.bingoCount(this.playerWhiteBoard)
            this.blackBingoCount = this.bingoCount(this.playerBlackBoard)
            if(this.turn == "w"){
                this.turn = "b"
                return;
            }
            if(this.turn == "b") {
                this.turn = "w";
                return;
            }
            return;
        } else {
            console.log("not your turn")
            return;
        }
    }

    loadWhite = function(board) {
        this.playerWhiteBoard = board;
    }
    loadBlack = function(board) {
        this.playerBlackBoard = board;
    }

    getTurn = function() {
        return this.turn;
    }

    isCanceled = function(num) {
        return this.canceledNumbers.includes(num);
    }

    bingoCount = function(board) {
        // count how many lined has been crossed in the board
        // row count 
        let count = 0;
        for (let i = 0; i < 5; i++) {
            let rowCanceled = true;
            let columnCanceled = true;
            for (let j = 0; j < 5; j++) {
                if (!this.isCanceled(board[i][j])) {
                    rowCanceled = false;
                }
                if (!this.isCanceled(board[j][i])) {
                    columnCanceled = false;
                }
            }
            if (rowCanceled) count++;
            if (columnCanceled) count++;
        }
    
        console.log("row column count :" + count)
        // Check diagonals
        let diagonal1Canceled = true;
        let diagonal2Canceled = true;
        for (let i = 0; i < 5; i++) {
            if (!this.isCanceled(board[i][i])) {
                diagonal1Canceled = false;
            }
            if (!this.isCanceled(board[i][4 - i])) {
                diagonal2Canceled = false;
            }
        }
        if (diagonal1Canceled) count++;
        if (diagonal2Canceled) count++;
    
        return count;
    }

    getWinner = function() {
        if(this.whiteBingoCount >= 5){
            this.winner = "w"
        }
        if(this.blackBingoCount >= 5){
            this.winner = "b"
        }
    }

    isGameOver = function(){
        return this.whiteBingoCount >= 5 || this.blackBingoCount >= 5
    }

}

export default Bingo;