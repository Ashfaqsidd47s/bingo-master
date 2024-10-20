class Board {
    constructor() {
        this.board = Board.generateRandomBoard();
    }

    static generateRandomBoard() {
        const size = 5;
        const numbers = [];

        for (let i = 1; i <= size * size; i++) {
            numbers.push(i);
        }

        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

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


    cancelNumber(number, player) {
        if (this.isGameOver()) {
            throw new Error("The game is over.");
        }
        if (number < 1 || number > 25) {
            throw new Error("Invalid number. Must be between 1 and 25.");
        }
        if (this.canceledNumbers.includes(number)) {
            throw new Error("Number has already been canceled.");
        }
        if (this.turn !== player) {
            throw new Error("Not your turn.");
        }

        this.canceledNumbers.push(number);
        this.whiteBingoCount = this.bingoCount(this.playerWhiteBoard);
        this.blackBingoCount = this.bingoCount(this.playerBlackBoard);
        this.getWinner();

        if (this.winner) {
            return `Player ${this.winner} wins!`;
        }

        this.turn = this.turn === 'w' ? 'b' : 'w';
        return `Number ${number} canceled for player ${player}.`;
    }

    loadWhite(board) {
        if (!Array.isArray(board) || board.length !== 5 || !board.every(row => Array.isArray(row) && row.length === 5)) {
            throw new Error("Invalid board. Must be a 5x5 array.");
        }
        this.playerWhiteBoard = board;
        return "White player's board loaded.";
    }

    loadBlack(board) {
        if (!Array.isArray(board) || board.length !== 5 || !board.every(row => Array.isArray(row) && row.length === 5)) {
            throw new Error("Invalid board. Must be a 5x5 array.");
        }
        this.playerBlackBoard = board;
        return "Black player's board loaded.";
    }

    getTurn() {
        return this.turn;
    }

    isCanceled(num) {
        return this.canceledNumbers.includes(num);
    }

    bingoCount(board) {
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

    getWinner() {
        if (this.whiteBingoCount >= 5) {
            this.winner = 'w';
        } else if (this.blackBingoCount >= 5) {
            this.winner = 'b';
        }
    }

    isGameOver() {
        return this.winner !== null;
    }
}

export function boardDetails(board, canceled){
    let resBoard = [];
    for (let i = 0; i < 5; i++) {
        resBoard.push([]);
        for (let j = 0; j < 5; j++) {
            resBoard[i].push({
                val: board[i][j],
                isCanceled: canceled.includes(board[i][j])
            })
        }
    }
    let canceledRows = [];
    let canceledCols = [];
    let canceledDig = [];
    for (let i = 0; i < 5; i++) {
        let rowCanceled = true;
        let columnCanceled = true;
        for (let j = 0; j < 5; j++) {
            if (!canceled.includes(board[i][j])) {
                rowCanceled = false;
            }
            if (!canceled.includes(board[j][i])) {
                columnCanceled = false;
            }
        }
        if (rowCanceled) canceledRows.push(i);
        if (columnCanceled) canceledCols.push(j);
    }

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
    if (diagonal1Canceled) canceledDig.push(1);
    if (diagonal2Canceled) canceledDig.push(2);

    return {
        board: resBoard,
        rows: canceledRows,
        cols: canceledCols,
        digs: canceledDig
    }
}

export default Bingo;
