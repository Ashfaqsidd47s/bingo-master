# Bingo Master

A JavaScript library to create and play a Bingo game. This library allows you to create Bingo boards, cancel numbers, track turns, and determine the winner.

## Installation

To install the package, use npm:

```bash
npm install bingo-master
```

## Usage
First, import the Bingo class from the package:

```javascript
import Bingo from 'bingo-master';
```

Creating a Bingo Game
To create a new Bingo game, instantiate the Bingo class:

```javascript
const bingoGame = new Bingo();
```
## Functions
### cancelNumber(number, player)
**Cancels a number for the current player if it is their turn.**

#### Parameters:
- number (number): The number to cancel (must be between 1 and 25).
- player (string): The player making the move ('w' for white, 'b' for black).
- Returns: A message indicating the result of the move or an error.
- Throws:
    - Error if the game is over.
    - Error if the number is invalid.
    - Error if the number has already been canceled.
    - Error if it's not the player's turn.
#### Example:

```javascript
try {
  const message = bingoGame.cancelNumber(10, 'w');
  console.log(message); // Output: "Number 10 canceled for player w."
} catch (error) {
  console.error(error.message);
}
```

### loadWhite(board)
**Loads a custom board for the white player.**

#### Parameters:
- board (number[][]): A 5x5 array representing the board.
- Returns: A message indicating the board was loaded.
- Throws: Error if the board is not a valid 5x5 array.
#### Example:

```javascript
try {
  const customBoard = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
  ];
  const message = bingoGame.loadWhite(customBoard);
  console.log(message); // Output: "White player's board loaded."
} catch (error) {
  console.error(error.message);
}
```

### loadBlack(board)
**Loads a custom board for the black player.**

#### Parameters:
board (number[][]): A 5x5 array representing the board.
Returns: A message indicating the board was loaded.
Throws: Error if the board is not a valid 5x5 array.
#### Example:

```javascript
try {
  const customBoard = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
  ];
  const message = bingoGame.loadBlack(customBoard);
  console.log(message); // Output: "Black player's board loaded."
} catch (error) {
  console.error(error.message);
}
```

### getTurn()
**Gets the current turn.**

- Returns: 'w' if it's white player's turn, 'b' if it's black player's turn.
#### Example:

```javascript
const currentTurn = bingoGame.getTurn();
console.log(currentTurn); // Output: 'w' or 'b'
```

### isCanceled(num)
**Checks if a number has been canceled.**

#### Parameters:
- num (number): The number to check.
- Returns: boolean True if the number  has been canceled, false otherwise.
#### Example:

```javascript
const isNumberCanceled = bingoGame.isCanceled(10);
console.log(isNumberCanceled); // Output: true or false
```
### bingoCount(board)
**Counts the number of completed rows, columns, and diagonals on a board.**

#### Parameters:
- board (number[][]): The board to check.
- Returns: number The count of completed rows, columns, and diagonals.
#### Example:

```javascript
const whiteBingoCount = bingoGame.bingoCount(bingoGame.playerWhiteBoard);
console.log(whiteBingoCount); // Output: A number indicating completed lines
```

### getWinner()
**Determines if there is a winner. Updates the winner property if a player has 5 or more completed lines.**

#### Example:

```javascript

bingoGame.getWinner();
if (bingoGame.winner) {
  console.log(`Player ${bingoGame.winner} wins!`);
}
```

### isGameOver()
**Checks if the game is over.**

- Returns: boolean True if there is a winner, false otherwise.
Example:

```javascript

const gameOver = bingoGame.isGameOver();
console.log(gameOver); // Output: true or false
```

## Full Example
**Here is a complete example of using the Bingo Master package:**

```javascript

import Bingo from 'bingo-master';

const bingoGame = new Bingo();

try {
  console.log(bingoGame.cancelNumber(10, 'w')); // Cancel number 10 for white player
  console.log(bingoGame.getTurn()); // Get current turn

  console.log(bingoGame.cancelNumber(20, 'b')); // Cancel number 20 for black player
  console.log(bingoGame.getTurn()); // Get current turn

  const customBoard = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
  ];
  console.log(bingoGame.loadWhite(customBoard)); // Load custom board for white player

  bingoGame.getWinner();
  if (bingoGame.winner) {
    console.log(`Player ${bingoGame.winner} wins!`);
  } else {
    console.log("No winner yet.");
  }
} catch (error) {
  console.error(error.message);
}
```

This example demonstrates creating a Bingo game, canceling numbers, loading custom boards, checking the current turn, and determining the winner.