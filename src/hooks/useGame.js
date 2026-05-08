import { useState, useEffect } from 'react';
import { createBoard, applyMove } from '../engine/mancala.js';
import { difficulties } from '../engine/difficulties.js';

export default function useGame() {
  const [board, setBoard] = useState(createBoard());
  const [difficulty, setDifficulty] = useState(null);
  const [phase, setPhase] = useState('select');

  function handleSelect(key) {
    setDifficulty(key);
    setPhase('player_turn');
  }

  function handleMove(pitIndex) {
    if (phase !== 'player_turn') return;
    const next = applyMove(board, pitIndex);
    setBoard(next);
    setPhase(next.gameOver ? 'game_over' : 'ai_thinking');
  }
  
  // AI call blocks the thread.
  useEffect(() => {
    if (phase !== 'ai_thinking') return;
    const id = setTimeout(() => {
      const aiPit = difficulties[difficulty].fn(board);
      const next = applyMove(board, aiPit);
      setBoard(next);
      setPhase(next.gameOver ? 'game_over' : 'player_turn');
    }, 0);
    return () => clearTimeout(id);
  }, [phase, board, difficulty]);

  function handleRestart() {
    setBoard(createBoard());
    setDifficulty(null);
    setPhase('select');
  }

  return { board, phase, handleSelect, handleMove, handleRestart };
}
