import { difficulties } from '../engine/difficulties.js';

export default function DifficultySelect({ onSelect }) {
  return (
    <div className="difficulty-select">
      <img src={`${import.meta.env.BASE_URL}pit.svg`} alt="" className="game-logo" aria-hidden="true" />
      <h1 className="game-title">
        Mancala<span className="game-title_pp">++</span>
      </h1>
      <h2 className="difficulty-select_label">Choose difficulty</h2>
      <div className="difficulty-select_buttons">
        {Object.entries(difficulties).map(([key, { label }]) => (
          <button key={key} className="btn" onClick={() => onSelect(key)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
