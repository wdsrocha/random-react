import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'

function getWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    };
    return null;
}

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="status">{this.props.status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                location: null,
            }],
            turnNumber: 0,
            isXTurn: true,
        }
    }

    currentSymbol() {
        return this.state.isXTurn ? 'X' : 'O';
    }

    jumpTo(turn) {
        this.setState({
            turnNumber: turn,
            isXTurn: (turn % 2) === 0,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.turnNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i] || getWinner(squares)) {
            return;
        }
        squares[i] = this.currentSymbol();
        this.setState({
            history: history.concat([{
                squares: squares,
                location: i,
            }]),
            turnNumber: history.length,
            isXTurn: !this.state.isXTurn,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.turnNumber];
        const winner = getWinner(current.squares);

        const status = winner ?
            `Winner: ${winner}` :
            `Next player: ${this.currentSymbol()}`;

        const moves = history.map((turn, move) => {
            let description;
            if (move) {
                const row = 1 + Math.floor(turn.location / 3);
                const col = 1 + (turn.location % 3);
                description = `Go to move #${move}. Location: (${row}, ${col})`;
            } else {
                description = 'Go to game start';
            }

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {description}
                    </button>
                </li>
            )
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
