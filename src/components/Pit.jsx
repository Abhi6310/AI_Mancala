export default function Pit({ index, count, isActive, isValid, onClick, disabled }) {
  const cls = [
    'pit',
    isActive && 'pit--active',
    isValid && 'pit--valid',
    count === 0 && 'pit--empty',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={cls}
      onClick={() => onClick(index)}
      disabled={disabled || !isValid || !isActive}
      aria-label={`Pit ${index}: ${count} stone${count !== 1 ? 's' : ''}`}
    >
      <span className="pit_count">{count}</span>
    </button>
  );
}
