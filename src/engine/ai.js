import { getValidMoves, applyMove, player1Store, player2Store } from './mancala.js';

function utility(state) {
  return state.pits[player1Store] - state.pits[player2Store];
}

export function randomMove(state) {
  const moves = getValidMoves(state);
  return moves[Math.floor(Math.random() * moves.length)];
}

function minimax(state, depth, isMaximizing) {
  if (state.gameOver || depth === 0) return { score: utility(state), move: null };

  const moves = getValidMoves(state);
  let best = isMaximizing ? -Infinity : Infinity;
  let bestMove = moves[0];

  for (const move of moves) {
    const result = minimax(applyMove(state, move), depth - 1, !isMaximizing);
    if (isMaximizing ? result.score > best : result.score < best) {
      best = result.score;
      bestMove = move;
    }
  }
  return { score: best, move: bestMove };
}

export function minimaxMove(state, depth) {
  return minimax(state, depth, state.currentPlayer === 1).move;
}

function alphaBeta(state, depth, alpha, beta, isMaximizing) {
  if (state.gameOver || depth === 0) return { score: utility(state), move: null };

  const moves = getValidMoves(state);
  let best = isMaximizing ? -Infinity : Infinity;
  let bestMove = moves[0];

  for (const move of moves) {
    const result = alphaBeta(applyMove(state, move), depth - 1, alpha, beta, !isMaximizing);
    if (isMaximizing) {
      if (result.score > best) { best = result.score; bestMove = move; }
      alpha = Math.max(alpha, best);
    } else {
      if (result.score < best) { best = result.score; bestMove = move; }
      beta = Math.min(beta, best);
    }
    if (alpha >= beta) break;
  }
  return { score: best, move: bestMove };
}

export function alphaBetaMove(state, depth) {
  return alphaBeta(state, depth, -Infinity, Infinity, state.currentPlayer === 1).move;
}
