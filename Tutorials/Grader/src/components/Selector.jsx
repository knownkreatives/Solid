import { createSignal } from 'solid-js';

export default function Selector(props) {
  const [selected, setSelected] = createSignal(0);

  return (
    <div class="space-y-2">
      <label for={`${props.name}-select`}>Select between the following:</label>
      <select
        id={`${props.name}-select`}
        value={selected()}
        onChange={(e) => {
          setSelected(parseInt(e.target.value));
          props.onSelect?.(parseInt(e.target.value));
        }}
        class="ml-2 border border-gray-500 rounded-md px-4 py-2"
      >
        {props.item?.map((val, index) => (
          <option value={index}>{val || `${props.name} ${index + 1}`}</option>
        ))}
      </select>
    </div>
  );
}
