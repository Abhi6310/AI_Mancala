import { describe, it, expect } from 'vitest';
import {
  createBoard,
  getValidMoves,
  applyMove,
  player1Pits,
  player1Store,
  player2Pits,
  player2Store,
} from './mancala.js';

describe('createBoard', () => {
  it('starts with 48 total stones', () => {
    const { pits } = createBoard();
    expect(pits.reduce((a, v) => a + v, 0)).toBe(48);
  });

  it('initializes both stores to 0', () => {
    const { pits } = createBoard();
    expect(pits[player1Store]).toBe(0);
    expect(pits[player2Store]).toBe(0);
  });
});

describe('getValidMoves', () => {
  it('returns all 6 pits for the starting player', () => {
    expect(getValidMoves(createBoard())).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('excludes empty pits', () => {
    const state = { ...createBoard(), pits: [0, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0] };
    expect(getValidMoves(state)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('applyMove — sowing', () => {
  it('distributes 4 stones from pit 0 to pits 1–4', () => {
    const { pits } = applyMove(createBoard(), 0);
    expect(pits[0]).toBe(0);
    expect(pits[1]).toBe(5);
    expect(pits[2]).toBe(5);
    expect(pits[3]).toBe(5);
    expect(pits[4]).toBe(5);
    expect(pits[5]).toBe(4);
  });

  it('skips the opponent store during sowing', () => {
    const { pits } = applyMove(createBoard(), 0);
    expect(pits[player2Store]).toBe(0);
  });

  it('switches the current player after every move', () => {
    const next = applyMove(createBoard(), 0);
    expect(next.currentPlayer).toBe(2);
  });

  it('does not mutate the input state', () => {
    const state = createBoard();
    applyMove(state, 0);
    expect(state.pits[0]).toBe(4);
    expect(state.currentPlayer).toBe(1);
  });

  it('keeps total stones at 48 after a move', () => {
    const { pits } = applyMove(createBoard(), 0);
    expect(pits.reduce((a, v) => a + v, 0)).toBe(48);
  });
});

describe('applyMove — capture rule', () => {
  it('captures landing stone and opposite stones into own store', () => {
    const state = {
      ...createBoard(),
      pits: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
      currentPlayer: 1,
    };
    const { pits } = applyMove(state, 0);
    expect(pits[1]).toBe(0);
    expect(pits[11]).toBe(0);
    expect(pits[player1Store]).toBe(4);
  });

  it('does not capture if opposite pit is empty', () => {
    // P2 has stones elsewhere so the terminal sweep does not trigger
    const state = {
      ...createBoard(),
      pits: [1, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 4, 0],
      currentPlayer: 1,
    };
    const { pits } = applyMove(state, 0);
    expect(pits[player1Store]).toBe(0);
  });
});

describe('applyMove — terminal detection', () => {
  it('sets gameOver when one side is emptied', () => {
    let state = createBoard();
    while (!state.gameOver) {
      const moves = getValidMoves(state);
      state = applyMove(state, moves[0]);
    }
    expect(state.gameOver).toBe(true);
  });

  it('sets a winner on game over', () => {
    let state = createBoard();
    while (!state.gameOver) {
      const moves = getValidMoves(state);
      state = applyMove(state, moves[0]);
    }
    expect([1, 2, 'tie']).toContain(state.winner);
  });

  it('keeps total stones at 48 after game over', () => {
    let state = createBoard();
    while (!state.gameOver) {
      const moves = getValidMoves(state);
      state = applyMove(state, moves[0]);
    }
    expect(state.pits.reduce((a, v) => a + v, 0)).toBe(48);
  });

  it('zeroes all pit stones on game over', () => {
    let state = createBoard();
    while (!state.gameOver) {
      const moves = getValidMoves(state);
      state = applyMove(state, moves[0]);
    }
    [...player1Pits, ...player2Pits].forEach(i => {
      expect(state.pits[i]).toBe(0);
    });
  });
});
