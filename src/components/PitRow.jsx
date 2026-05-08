import Pit from './Pit.jsx';

export default function PitRow({ indices, pits, isActive, onMove, disabled }) {
  return (
    <div className="board_row">
      {indices.map(i => (
        <Pit
          key={i}
          index={i}
          count={pits[i]}
          isActive={isActive}
          isValid={pits[i] > 0}
          onClick={onMove}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
