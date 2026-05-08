import { randomMove, minimaxMove, alphaBetaMove } from './ai.js';

export const difficulties = {
  random: { label: 'Random', fn: randomMove },
  easy: { label: 'Easy', fn: (state) => minimaxMove(state, 2) },
  hard: { label: 'Hard', fn: (state) => alphaBetaMove(state, 5) },
  expert: { label: 'Expert', fn: (state) => alphaBetaMove(state, 10) },
};
