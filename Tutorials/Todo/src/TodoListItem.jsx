export function TodoListItem(props) {
  return (
    <li
      style={{
        'text-decoration': props.todo.complete ? 'line-through' : undefined,
      }}
      class="py-2"
    >
      <label>
        <input
          type="checkbox"
          checked={props.todo.complete}
          onChange={() => {
            props.setTodos((todos) => {
              const newTodos = todos.map((todo) =>
                props.todo === todo
                  ? { ...todo, complete: !todo.complete }
                  : todo
              );
              return newTodos;
            });
          }}
          class="mr-2"
        />
        {props.todo.text}
        <input
            type="button"
            value="Delete"
            onClick={() => {
              props.setTodos((todos) => {
                const newTodos = todos.filter((todo) => props.todo !== todo);
                return newTodos;
              });
            }}
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md ml-4"
        />
        {props.index > 0 && (
            <input
                type="button"
                value="Up"
                onClick={() => {
                    props.setTodos((todos) => {
                const newTodos = [...todos];
                const index = newTodos.indexOf(props.todo);
                if (index > 0) {
                  [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];
                }
                return newTodos;
              });
            }}
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md ml-4"
            />
        )}
        {props.index < props.size - 1 && (
            <input
              type="button"
              value="Down"
              onClick={() => {
                props.setTodos((todos) => {
                  const newTodos = [...todos];
                  const index = newTodos.indexOf(props.todo);
                  if (index < newTodos.length - 1) {
                    [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
                  }
                  return newTodos;
                });
              }}
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md ml-4"
            />
        )}
      </label>
    </li>
  );
}