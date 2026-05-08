export default function Store({ count, label }) {
  return (
    <div className="store" aria-label={label}>
      {count}
    </div>
  );
}
