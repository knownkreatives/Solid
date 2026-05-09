import { createSignal } from 'solid-js';

export default function Selector(props) {
  const [selected, setSelected] = createSignal(0);

  return (
    <div class="selector-container">
      <label for={`${props.name}-select`}>Select between the following:</label>
      <select
        id={`${props.name}-select`}
        value={selected()}
        onChange={(e) => {
          setSelected(parseInt(e.target.value));
          props.onSelect?.(parseInt(e.target.value));
        }}
      >
        {props.item?.map((val, index) => (
          <option value={index}>{val.name || `${props.group} ${index + 1}`}</option>
        ))}
      </select>
    </div>
  );
}
