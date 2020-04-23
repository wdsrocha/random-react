import React from 'react';

type Todo = Readonly<{
  id: string;
  description: string;
  done: boolean;
}>;

function generateId(): string {
  return Math.random().toString(36).substr(2, 4);
}

function App() {
  const [newTodoDescription, setNewTodoDescription] = React.useState<string>(
    '',
  );
  const [todos, setTodos] = React.useState<Todo[]>([
    {
      id: '0000',
      description: 'Walk the dog',
      done: true,
    },
    {
      id: '0001',
      description: 'Call John Doe',
      done: false,
    },
  ]);

  function toggleTodo(id: string) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return todo;
        } else {
          return {
            id: id,
            description: todo.description,
            done: !todo.done,
          };
        }
      }),
    );
  }

  function deleteTodo(id: string): void {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function createTodo(description: string) {
    const newTodo = {
      id: generateId(),
      description: description,
      done: false,
    };
    setTodos([...todos, newTodo]);
  }

  function handleNewTodoSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (!newTodoDescription.length) {
      return;
    }
    createTodo(newTodoDescription);
    setNewTodoDescription('');
  }

  function handleNewTodoChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setNewTodoDescription(event.currentTarget.value);
  }

  return (
    <div className="card">
      <h1 className="title">To-do list</h1>
      <div className="todoList">
        {!todos.length && <h1 className="noTodo">All tasks completed!</h1>}
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="description">{todo.description}</span>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>
              x
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleNewTodoSubmit}>
        <input
          className="newTodoInputText"
          type="text"
          value={newTodoDescription}
          onChange={handleNewTodoChange}
          placeholder="New task"
        />
        <input className="newTodoInputSubmit" type="submit" value="+" />
      </form>
    </div>
  );
}

export default App;
