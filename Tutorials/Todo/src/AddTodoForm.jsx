import { createSignal } from 'solid-js';

export function AddTodoForm(props) {
  const [newTodo, setNewTodo] = createSignal('');

  return (
    <form>
      <input
        value={newTodo()}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        class="border-2 border-gray-300 p-2 rounded-md"
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          props.setTodos((todos) => {
            return [...todos, { text: newTodo(), complete: false }];
          });
          setNewTodo('');
        }}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2"
      >
        Add
      </button>
    </form>
  );
}