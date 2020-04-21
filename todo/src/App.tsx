import React from 'react';
import './App.css';

function App() {
    return (
        <div className="todo">
            <h1 className="title">Task list</h1>
            <div className="taskList">
                <div className="task">
                    <input type="checkbox"/>
                    <span className="description">Buy groceries</span>
                    <button className="delete">x</button>
                </div>
                <div className="task">
                    <input type="checkbox"/>
                    <span className="description">Walk the dog</span>
                    <button className="delete">x</button>
                </div>
                <div className="task">
                    <input type="checkbox"/>
                    <span className="description">Call John Doe</span>
                    <button className="delete">x</button>
                </div>
            </div>
            <div className="newTask">
                <input type="text"/>
                <button className="create">+</button>
            </div>
        </div>
    )
}

export default App;
