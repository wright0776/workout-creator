import React, { Component } from 'react'

class AddMoveFromExisting extends Component {
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
                            <div className='addFromExistingItem' key={move.id}>
                                <button className='button3' onClick={(e) => this.removeFromAdds(e, move._id)}>Remove</button>
                                <div className='existingName'>{move.name}</div>
                            </div>
                        ) : null}
                        <div className='line'></div>
                        {this.props.moves.map ? this.props.moves.map((move, i) =>
                            <div className='addFromExistingItem' key={move._id}>
                                <button className='button3' onClick={(e) => this.addToAdds(e, move)}>Add</button>
                                <div className='existingName'>{move.name}</div>
                            </div>
                        ) : null}
                        <div className='center'>
                            <button onClick={this.addToMoves} className='save'>Done</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddMoveFromExisting;
