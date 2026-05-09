import { createSignal } from 'solid-js';
import { parseCSV } from '../utils/Parser';

export default function CSVTable(props) {
  const { headers, rows } = parseCSV(props.csv, props.height || 1);

  return (
    <table>
      <thead>
        <tr>
          {headers.map(h => <th>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr>
            {row.map(cell => <td>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}