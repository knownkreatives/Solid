import { createSignal, For } from 'solid-js';
import { AddTodoForm } from './AddTodoForm';
import { TodoListItem } from './TodoListItem';

function App() {
  const [todos, setTodos] = createSignal([
    { text: 'Starting task', complete: false },
  ]);

  return (
    <div class="mx-auto p-5">
      <ul class="list-disc pl-5">
        <For each={todos()}>
          {(todo, index) => <TodoListItem todo={todo} setTodos={setTodos} index={index()} size={todos().length} />}
        </For>
      </ul>

      <AddTodoForm setTodos={setTodos} />
    </div>
  );
}

export default App;