import React, { Component } from 'react'

class ExistingMovesToAdd extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            moves: props.moves,
            movesToAdd: [],
        };
        this.state = this.initialState;
    }

    componentWillReceiveProps(props) {
        this.setState({ moves: props.moves })
    }

    addToAdds = (e, move) => {
        e.preventDefault();
        if (this.state.movesToAdd.find(item => item._id === move._id)) {
            return;
        }
        this.setState(prevState => {
            return {
                movesToAdd: [...prevState.movesToAdd, move]
            }
        });
    }
    removeFromAdds = (e, id) => {
        e.preventDefault();
        this.setState(prevState => ({
            movesToAdd: prevState.movesToAdd.filter(move => id !== move._id)
        }));
    }
    addToMoves = (e) => {
        e.preventDefault();
        this.props.addToMovesArray(e, this.state.movesToAdd);
        this.props.addFromExisting(e);
    }

    render() {
        return (
            <div className='addFromExisting'>
                <div className='addFromExistingContent'>
                    <button className='close' onClick={this.props.addFromExisting}>&times;</button>
                    <form className='addFromExistingItems'>
                        {this.state.movesToAdd.map ? this.state.movesToAdd.map((move, i) =>
                            <div key={move.id}>
                                <button className='button2' onClick={(e) => this.removeFromAdds(e, move._id)}>Remove</button>
                                {move.name}
                            </div>
                        ) : null}
                        <div className='line'></div>
                        {this.props.moves.map ? this.props.moves.map((move, i) =>
                            <div key={move._id}>
                                <button className='button2' onClick={(e) => this.addToAdds(e, move)}>Add</button>
                                {move.name}
                            </div>
                        ) : null}
                        <button onClick={this.addToMoves} className='save'>Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ExistingMovesToAdd
