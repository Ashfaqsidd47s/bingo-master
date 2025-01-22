import { Bingo } from '../src/Bingo';

describe('Bingo Class', () => {
  let bingo: Bingo;

  beforeEach(() => {
    bingo = new Bingo(5, 3); // 5x5 board, 3 players as 5* 5 was the standard BIINGO 
  });

  it('should initialize with the correct size and player count', () => {
    expect(bingo.size).toBe(5);
    expect(bingo.members_count).toBe(3);
  });

  it('should throw an error for invalid board size or player count', () => {
    expect(() => new Bingo(1, 3)).toThrow('Bingo can not be played on board size less then 2');
    expect(() => new Bingo(5, 6)).toThrow('numbers of members can only be in the range 2 to size of bord');
  });

  it('should return the correct turn', () => {
    expect(bingo.getTurn()).toBe(0);
    bingo.cancelNumber(1, 0);
    expect(bingo.getTurn()).toBe(1);
  });

  it('should correctly update canceled numbers and cancel counts', () => {
    const numToCancel = bingo.getMyBoard(0)[0][0];
    bingo.cancelNumber(numToCancel, 0);

    expect(bingo.getCanceled()).toContain(numToCancel);
    expect(bingo.getMyCancelCount(0)).toBe(0); // No full rows, columns, or diagonals yet
  });

  it('should detect when a player wins', () => {
    const playerIndex = 0;
    let playingPlayer = 0;

    // Cancel all numbers to make player 1 win the game
    for(let row = 0; row < bingo.size; row++) {
      for(let col =0; col < bingo.size; col++) {
        if( row < 2 || row == col || row + col === bingo.size - 1 || (bingo.size % 2 == 1 && col == Math.floor(bingo.size / 2))) {
          bingo.cancelNumber(bingo.getMyBoard(playerIndex)[row][col], playingPlayer);
          playingPlayer = (playingPlayer + 1) % bingo.members_count;
        }
      }
    }

    expect(bingo.getWinner()).toBe(playerIndex);
    expect(() => bingo.cancelNumber(5, 1)).toThrow('hey game is over, why don\'t you try a new game...');
  });

  it('should prevent canceling numbers out of turn', () => {
    expect(() => bingo.cancelNumber(1, 1)).toThrow('Its not your turn...');
  });

  it('should prevent canceling invalid or already-canceled numbers', () => {
    expect(() => bingo.cancelNumber(0, 0)).toThrow('Invalid number, out of range');
    bingo.cancelNumber(1, 0);
    expect(() => bingo.cancelNumber(1, 1)).toThrow('Number already canceled');
  });

  it("should initialize custom game state", () => {
    const newBoards = Array.from({ length: 3 }, () =>
        Array.from({ length: 5 }, (_, i) => Array.from({ length: 5 }, (_, j) => i * 5 + j + 1))
    );
    const newCanceled = [1, 2, 3];

    bingo.customInitialize(newBoards, newCanceled);

    expect(bingo.getBoards()).toEqual(newBoards);
    expect(bingo.getCanceled()).toEqual(newCanceled);
});
});
