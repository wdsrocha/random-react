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
            return {
                winner: squares[a],
                line: lines[i],
            };
        }
    };
    return null;
}

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
            style={{
                color: props.highlight ? 'red' : 'black',
                fontWeight: props.highlight ? 'bold' : 'normal'
            }}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                highlight={this.props.toHighlight?.includes(i)}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const range = n => [...Array(n).keys()];
        const board = range(3).map(i => (
            <div className="board-row" key={i}>
                {range(3).map(j => this.renderSquare(3 * i + j))}
            </div>
        ));
        return (
            <div>
                <div className="status">{this.props.status}</div>
                {board}
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
            isHistoryAscending: true,
        }

        this.handleClick = this.handleClick.bind(this);
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
        const winner = getWinner(current.squares)?.winner;
        const winnerLine = getWinner(current.squares)?.line;
        const isGameOver = current.squares.every(k => k != null);

        let status = `Next player: ${this.currentSymbol()}`;
        if (winner) {
            status = `Winner: ${winner}`;
        } else if (isGameOver) {
            status = 'It\'s a draw!';
        }

        let moves = history.map((turn, move) => {
            let description;
            if (move) {
                const row = 1 + Math.floor(turn.location / 3);
                const col = 1 + (turn.location % 3);
                description = `Go to move #${move}. Location: (${row}, ${col})`;
            } else {
                description = 'Go to game start';
            }

            if (move === this.state.turnNumber) {
                description = <b>{description}</b>
            }

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {description}
                    </button>
                </li>
            )
        });

        if (this.state.isHistoryAscending === false) {
            moves = moves.reverse();
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        toHighlight={winnerLine}
                        squares={current.squares}
                        onClick={this.handleClick}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.reverseHistoryOrder()}>Invert order</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    reverseHistoryOrder() {
        this.setState({
            isHistoryAscending: !this.state.isHistoryAscending
        });
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
