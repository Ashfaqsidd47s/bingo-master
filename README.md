# Bingo Master Library

The **Bingo Master Library** offers a unique twist on the classic Bingo game. 
- In this version, players compete on randomly generated boards of a chosen size (default: 5x5, with numbers from 1 to size² arranged randomly). - Each player takes turns calling a number, and all players cancel that number on their boards. 
- A point is scored for canceling a complete row, column, or diagonal. 
- The first player to score points equal to the board size wins the game. 
- The library supports customizable board sizes and  2 to board size players (for 5*5 board there an be 2-5 players in a match).

## Table of Contents

- [Overview](#overview)
- [Bingo Class Functions](#bingo-class-functions)
- [Board Class Functions](#board-class-functions)
- [Usage Example](#usage-example)

---

## Overview

### Features

- The standard board is 5x5.
- Supports 2 to 5 players.
- Custom initialization of boards for saved game states.
- Automated or manual number cancellation.

### How the Game Works

- Players take turns calling numbers.
- The board tracks canceled numbers.
- Rows, columns, and diagonals can be canceled. The player who cancels the required numbers first wins.

---

## Bingo Class Functions

### `constructor(size: number = 5, count: number = 2)`
Initializes the game with a given board size and number of players.

- **Parameters:**
  - `size`: Size of the board (default: 5).
  - `count`: Number of players (default: 2).

- **Throws Errors:**
  - If `size` is less than 2.
  - If `count` is less than 2 or greater than `size`.

### `getTurn(): number`
Returns the current player's turn.

- **Example:** Player 1 starts the game, returns `0`.

### `getBoards(): number[][][]`
Returns all players' boards.

- **Example:** Used to inspect game boards.

### `getMyBoard(ind: number): number[][]`
Returns the board of a specific player.

- **Parameters:**
  - `ind`: Player index (0-based).

### `getMyCancelCount(ind: number): number`
Returns the cancel count for a specific player.

- **Parameters:**
  - `ind`: Player index (0-based).

### `getMyCanceledInfo(ind: number): string[]`
Returns canceled rows, columns, or diagonals for a specific player.

- **Parameters:**
  - `ind`: Player index (0-based).

### `getCanceled(): number[]`
Returns all canceled numbers so far.

### `getCancelCounts(): number[]`
Returns the cancel counts for all players.

### `getWinner(): number | null`
Returns the index of the winner or `null` if no one has won yet.

### `cancelNumber(num: number, turn: number)`
Cancels a number for the current player's turn.

- **Parameters:**
  - `num`: Number to cancel.
  - `turn`: Player's turn index.

- **Throws Errors:**
  - If the game is over.
  - If it’s not the player's turn.
  - If the number is out of range or already canceled.

### `customInitialize(newBoards: number[][][], newCanceles: number[])`
Initializes the game with custom boards and canceled numbers.

- **Parameters:**
  - `newBoards`: Array of custom boards for each player.
  - `newCanceles`: Array of canceled numbers.

---

## Board Class Functions

### `constructor(size: number)`
Creates a new board of the given size.

- **Throws Errors:**
  - If the size is less than 2.

### `getData(): number[][]`
Returns the current board data.

### `getCancelCount(): number`
Returns the count of canceled rows, columns, or diagonals.

### `getCanceldInfo(): string[]`
Returns a list of canceled rows, columns, and diagonals.

### `cancelNumber(num: number): number`
Cancels a specific number and updates the board state.

- **Parameters:**
  - `num`: Number to cancel.

### `customInitialize(newBoard: number[][], newCanceles: number[]): number`
Reinitializes the board with a custom setup.

- **Parameters:**
  - `newBoard`: Custom board configuration.
  - `newCanceles`: Array of numbers to cancel.

---

## Usage Example

Here is a complete example of a game between two players using a 3x3 board:

```typescript
import { Bingo } from "bingo-master";

// Initialize a 3x3 Bingo game for 2 players
const game = new Bingo(3, 2);

// Player 1 and Player 2 boards
console.log("Player 1 Board:", game.getMyBoard(0));
console.log("Player 2 Board:", game.getMyBoard(1));

// Player 1 cancels a number
const turn = game.getTurn();
console.log("Turn:", turn); // Should be 0 (Player 1)

try {
  game.cancelNumber(5, turn); // Player 1 cancels number 5
  console.log("Canceled Numbers:", game.getCanceled());
} catch (err) {
  console.error(err.message);
}

// Player 2 cancels a number
const nextTurn = game.getTurn();
console.log("Turn:", nextTurn); // Should be 1 (Player 2)

try {
  game.cancelNumber(3, nextTurn); // Player 2 cancels number 3
  console.log("Canceled Numbers:", game.getCanceled());
} catch (err) {
  console.error(err.message);
}

// Check if there is a winner
const winner = game.getWinner();
if (winner !== null) {
  console.log(`Player ${winner + 1} wins!`);
} else {
  console.log("No winner yet, keep playing!");
}
```

---

## Additional Notes

- **Default Board Size:** 5x5.
- **Default Players:** 2.
- The game ends when a player cancels an entire row, column, or diagonal.
- Use `customInitialize` to resume a game from a saved state.

