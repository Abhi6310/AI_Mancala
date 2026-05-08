import useGame from './hooks/useGame.js';
import Board from './components/Board.jsx';
import DifficultySelect from './components/DifficultySelect.jsx';
import GameStatus from './components/GameStatus.jsx';

export default function App() {
  const { board, phase, handleSelect, handleMove, handleRestart } = useGame();

  return (
    <div className="app">
      {phase === 'select' ? (
        <DifficultySelect onSelect={handleSelect} />
      ) : (
        <>
          <Board
            state={board}
            onMove={handleMove}
            disabled={phase !== 'player_turn'}
          />
          <GameStatus phase={phase} winner={board.winner} onRestart={handleRestart} />
        </>
      )}
    </div>
  );
}
