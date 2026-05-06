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

export function getValidMoves(state) {
  const pits = state.currentPlayer === 1 ? player1Pits : player2Pits;
  return pits.filter(i => state.pits[i] > 0);
}

export function applyMove(state, pitIndex) {
  const next = { ...state, pits: [...state.pits] };
  const opponentStore = next.currentPlayer === 1 ? player2Store : player1Store;

  let stones = next.pits[pitIndex];
  next.pits[pitIndex] = 0;
  let cursor = pitIndex;

  while (stones > 0) {
    cursor = (cursor + 1) % boardSize;
    if (cursor === opponentStore) continue;
    next.pits[cursor]++;
    stones--;
  }

  next.currentPlayer = next.currentPlayer === 1 ? 2 : 1;
  return next;
}
