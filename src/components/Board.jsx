import Store from './Store.jsx';
import PitRow from './PitRow.jsx';
import { player1Store, player2Store } from '../engine/mancala.js';

// Physical layout (P1 sits at the bottom):
//   [P2 store (13)] [ 12 | 11 | 10 | 9 | 8 | 7 ] [P1 store (6)]
//                   [  0 |  1 |  2 |  3 |  4 |  5 ]
export default function Board({ state, onMove, disabled }) {
  const { pits, currentPlayer } = state;

  return (
    <div className="board">
      <Store count={pits[player2Store]} label={`AI score: ${pits[player2Store]}`} />

      <div className="board_pits">
        <PitRow
          indices={[12, 11, 10, 9, 8, 7]}
          pits={pits}
          isActive={currentPlayer === 2}
          onMove={onMove}
          disabled={disabled}
        />
        <PitRow
          indices={[0, 1, 2, 3, 4, 5]}
          pits={pits}
          isActive={currentPlayer === 1}
          onMove={onMove}
          disabled={disabled}
        />
      </div>

      <Store count={pits[player1Store]} label={`Your score: ${pits[player1Store]}`} />
    </div>
  );
}
