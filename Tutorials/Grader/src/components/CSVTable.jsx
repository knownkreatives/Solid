import { parseCSV } from '../utils/Parser';

export default function CSVTable(props) {
  if (!props.data) return <div>Loading CSV...</div>;

  const { headers, rows } = parseCSV(props.data);

  return (
    <table class="table-auto border-collapse border border-gray-300 w-full mt-4">
      <thead>
        <tr>
          {headers.map(h => <th class="border border-gray-300 px-4 py-2">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr>
            {row.map(cell => <td class="border border-gray-300 px-4 py-2">{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}