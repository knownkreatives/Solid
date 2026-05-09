export default function ResultItem({ subject, grade }) {
  return (
    <div className="result-item">
      <span>{subject}</span>
      <span>{grade}</span>
    </div>
  );
}