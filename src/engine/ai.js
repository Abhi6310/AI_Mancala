import { getValidMoves, player1Store, player2Store } from './mancala.js';

function utility(state) {
  return state.pits[player1Store] - state.pits[player2Store];
}

export function randomMove(state) {
  const moves = getValidMoves(state);
  return moves[Math.floor(Math.random() * moves.length)];
}
