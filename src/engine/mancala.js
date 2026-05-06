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

  const ownPits = next.currentPlayer === 1 ? player1Pits : player2Pits;
  const ownStore = next.currentPlayer === 1 ? player1Store : player2Store;

  if (ownPits.includes(cursor) && next.pits[cursor] === 1) {
    const oppositeIndex = boardSize - 2 - cursor;
    if (next.pits[oppositeIndex] > 0) {
      next.pits[ownStore] += next.pits[cursor] + next.pits[oppositeIndex];
      next.pits[cursor] = 0;
      next.pits[oppositeIndex] = 0;
    }
  }

  const p1Empty = player1Pits.every(i => next.pits[i] === 0);
  const p2Empty = player2Pits.every(i => next.pits[i] === 0);

  if (p1Empty || p2Empty) {
    player1Pits.forEach(i => { next.pits[player1Store] += next.pits[i]; next.pits[i] = 0; });
    player2Pits.forEach(i => { next.pits[player2Store] += next.pits[i]; next.pits[i] = 0; });
    next.gameOver = true;
    const p1Score = next.pits[player1Store];
    const p2Score = next.pits[player2Store];
    if (p1Score > p2Score) next.winner = 1;
    else if (p2Score > p1Score) next.winner = 2;
    else next.winner = 'tie';
  }

  next.currentPlayer = next.currentPlayer === 1 ? 2 : 1;
  return next;
}
