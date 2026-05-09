export default function ResultItem({ subject, grade }) {
  return (
    <div class="flex justify-between items-center border-b border-gray-300 py-2">
      <span class="font-bold">{subject}</span>
      <span>{grade}</span>
    </div>
  );
}