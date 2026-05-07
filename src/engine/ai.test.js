import { describe, it, expect } from 'vitest';
import { createBoard, getValidMoves, applyMove, player1Store, player2Store } from './mancala.js';
import { randomMove, minimaxMove, alphaBetaMove } from './ai.js';

function utility(state) {
  return state.pits[player1Store] - state.pits[player2Store];
}

describe('randomMove', () => {
  it('returns a valid pit index for player 1', () => {
    const state = createBoard();
    const move = randomMove(state);
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThanOrEqual(5);
    expect(state.pits[move]).toBeGreaterThan(0);
  });

  it('returns a valid pit index for player 2', () => {
    const state = { ...createBoard(), currentPlayer: 2 };
    const move = randomMove(state);
    expect(move).toBeGreaterThanOrEqual(7);
    expect(move).toBeLessThanOrEqual(12);
    expect(state.pits[move]).toBeGreaterThan(0);
  });
});

describe('minimax node count', () => {
  it('visits 5961 nodes at depth 5 from the starting position', () => {
    let nodeCount = 0;

    function countedMinimax(state, depth, isMaximizing) {
      nodeCount++;
      if (state.gameOver || depth === 0) return { score: utility(state), move: null };
      const moves = getValidMoves(state);
      let best = isMaximizing ? -Infinity : Infinity;
      let bestMove = moves[0];
      for (const move of moves) {
        const result = countedMinimax(applyMove(state, move), depth - 1, !isMaximizing);
        if (isMaximizing ? result.score > best : result.score < best) {
          best = result.score;
          bestMove = move;
        }
      }
      return { score: best, move: bestMove };
    }

    countedMinimax(createBoard(), 5, true);
    expect(nodeCount).toBe(5961);
  });
});

describe('alpha-beta node count', () => {
  it('visits 1438 nodes at depth 5 from the starting position', () => {
    let nodeCount = 0;

    function countedAlphaBeta(state, depth, alpha, beta, isMaximizing) {
      nodeCount++;
      if (state.gameOver || depth === 0) return { score: utility(state), move: null };
      const moves = getValidMoves(state);
      let best = isMaximizing ? -Infinity : Infinity;
      let bestMove = moves[0];
      for (const move of moves) {
        const result = countedAlphaBeta(applyMove(state, move), depth - 1, alpha, beta, !isMaximizing);
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

    countedAlphaBeta(createBoard(), 5, -Infinity, Infinity, true);
    expect(nodeCount).toBe(1438);
  });
});

describe('move parity', () => {
  it('minimax and alpha-beta choose the same move at depth 5', () => {
    const state = createBoard();
    expect(minimaxMove(state, 5)).toBe(alphaBetaMove(state, 5));
  });

  it('both algorithms choose pit index 5 at depth 5', () => {
    const state = createBoard();
    expect(minimaxMove(state, 5)).toBe(5);
    expect(alphaBetaMove(state, 5)).toBe(5);
  });
});
