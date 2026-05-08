export default function GameStatus({ phase, winner, onRestart }) {
  let message = '';
  if (phase === 'player_turn') message = 'Your turn';
  else if (phase === 'ai_thinking') message = 'AI thinking...';
  else if (phase === 'game_over') {
    if (winner === 1) message = 'You win!';
    else if (winner === 2) message = 'AI wins.';
    else message = "It's a tie.";
  }

  return (
    <div className="game-status">
      <span className="game-status_message">{message}</span>
      {phase === 'game_over' && (
        <button className="btn btn--primary" onClick={onRestart}>
          Play again
        </button>
      )}
    </div>
  );
}
