import React from 'react';
import './App.css';

type Todo = Readonly<{
    id: number
    description: string
    done: boolean
}>

function App() {
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
        console.log(id);
        setTodos(todos.map(todo => todo.id !== id ? todo : {
            id: id,
            description: todo.description,
            done: !todo.done,
        }));
    }

    function deleteTodo(id: number): void {
        setTodos(todos.filter(todo => todo.id !== id));
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
            <div className="newTask">
                <input type="text" />
                <button className="create">+</button>
            </div>
        </div>
    )
}

export default App;
