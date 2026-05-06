export const player1Pits = [0, 1, 2, 3, 4, 5];
export const player1Store = 6;
export const player2Pits = [7, 8, 9, 10, 11, 12];
export const player2Store = 13;
export const boardSize = 14;

const initialStones = 4;

export function createBoard() {
  const pits = new Array(boardSize).fill(0);
  player1Pits.forEach(i => { pits[i] = initialStones; });
  player2Pits.forEach(i => { pits[i] = initialStones; });
  return { pits, currentPlayer: 1, gameOver: false, winner: null };
}
