import React from 'react';

type Todo = Readonly<{
    id: number;
    description: string;
    done: boolean;
}>

function App() {
    const [newTodoDescription, setNewTodoDescription] = React.useState<string>('');
    const [todos, setTodos] = React.useState<Todo[]>([
        {
            id: 1,
            description: "Walk the dog",
            done: true,
        },
        {
            id: 2,
            description: "Call John Doe",
            done: false,
        }
    ]);

    function toggleTodo(id: number) {
        setTodos(todos.map(todo => todo.id !== id ? todo : {
            id: id,
            description: todo.description,
            done: !todo.done,
        }));
    }

    function deleteTodo(id: number): void {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function createTodo(description: string) {
        const id = 1 + Math.max(...todos.map(todo => todo.id));
        setTodos(todos.concat({ id: id, description: description, done: false }));
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
        <div className="todoComponent">
            <h1 className="title">Task list</h1>
            <div className="taskList">
                {!todos.length && <h1>All tasks completed!</h1>}
                {todos.map(todo => (
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span className="description">{todo.description}</span>
                        <button className="delete" onClick={() => deleteTodo(todo.id)}>x</button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleNewTodoSubmit}>
                <input type="text" value={newTodoDescription} onChange={handleNewTodoChange} />
                <input type="submit" value="+" />
            </form>
        </div>
    )
}

export default App;
