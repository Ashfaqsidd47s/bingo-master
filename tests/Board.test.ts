import { Board } from '../src/Board';

describe('Board Class', () => {
  let board: Board;
  let newBoard: number[][];

  beforeEach(() => {
    board = new Board(5); // Create a 5x5 board for reuse
    newBoard = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ];
  });

  it('should initialize with the correct size', () => {
    expect(board.size).toBe(5);
  });

  it('should throw an error for size less than 2', () => {
    expect(() => new Board(1)).toThrow('Board size must be greater then 1');
  });

  it('should generate a unique set of numbers', () => {
    const flatData = board.getData().flat();
    const uniqueNumbers = new Set(flatData);
    expect(uniqueNumbers.size).toBe(25); // 5x5 board
  });

  it('should correctly cancel a number and update counts', () => {
    const numToCancel = board.getData()[2][3]; // Select a number from the board
    board.cancelNumber(numToCancel);

    const cancelCount = board.getCancelCount();
    expect(cancelCount).toBe(0); // No row, column, or diagonal is fully canceled yet

    const canceledInfo = board.getCanceldInfo();
    expect(canceledInfo).toEqual([]); // No rows, columns, or diagonals are completed
  });

  it('should detect a completed row, column, or diagonal', () => {
    const row = 2;
    for (let col = 0; col < board.size; col++) {
      board.cancelNumber(board.getData()[row][col]);
    }

    expect(board.getCancelCount()).toBe(1); // One row completed
    expect(board.getCanceldInfo()).toContain(`R_${row}`);
  });

  it('should detect diagonal completion', () => {
    for (let i = 0; i < board.size; i++) {
      board.cancelNumber(board.getData()[i][i]); // Primary diagonal
    }

    
    expect(board.getCancelCount()).toBe(1);
    expect(board.getCanceldInfo()).toContain('D_0');

    for (let i = 0; i < board.size; i++) {
      if( i != board.size - i - 1) (board.cancelNumber(board.getData()[i][board.size - i - 1])); // Secondary diagonal
    }

    expect(board.getCancelCount()).toBe(2);
    expect(board.getCanceldInfo()).toContain('D_1');
  });

  // New Tests for customInitialize
  it('should initialize with a new board and update the map', () => {
    board.customInitialize(newBoard, []);
    expect(board.getData()).toEqual(newBoard);
    expect(board.getCancelCount()).toBe(0);
    expect(board.getCanceldInfo()).toEqual([]);
  });

  it('should update canceled rows, columns, or diagonals', () => {
    const canceledNumbers = [1, 2, 3, 4, 5]; // Complete first row
    board.customInitialize(newBoard, canceledNumbers);

    expect(board.getCancelCount()).toBe(1); // One row completed
    expect(board.getCanceldInfo()).toContain('R_0');
  });

  it('should handle an empty list of canceled numbers', () => {
    board.customInitialize(newBoard, []);
    expect(board.getCancelCount()).toBe(0);
    expect(board.getCanceldInfo()).toEqual([]);
  });

  it('should handle full cancellation scenarios', () => {
    const canceledNumbers = [1, 7, 13, 19, 25]; // Complete diagonal
    board.customInitialize(newBoard, canceledNumbers);

    expect(board.getCancelCount()).toBe(1);
    expect(board.getCanceldInfo()).toContain('D_0');
  });
});
