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

    function deleteTodo(id: number) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <div className="todoComponent">
            <h1 className="title">Task list</h1>
            <div className="taskList">
                {!todos.length && <h1>All tasks completed!</h1>}
                {todos.map(todo => (
                    <div className="todo">
                        <input type="checkbox"/>
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
