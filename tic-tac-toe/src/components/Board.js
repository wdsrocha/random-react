import React from 'react';

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

export default Board;