import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteWorkout, editWorkout } from '../../redux/workouts';
import { getMoves } from '../../redux/moves';
import ExistingMovesToAdd from './ExistingMovesToAdd';

class WorkoutMenu extends Component {
    constructor(props) {
        super(props);
        const { name, type, target, moves } = this.props.workout
        this.initialState = {
            inputs: {
                name: name,
                type: type,
                target: target,
                moves: moves
            },
            editing: false,
            editee: "",
            adding: false,
            addingFromExisting: false
        };
        this.state = this.initialState;
    }

    edit = (e) => {
        this.setState(prevState => ({ ...prevState, editing: !prevState.editing }))
    }
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }
    addMoves = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ ...prevState, adding: !this.state.adding }))
    }
    addFromExisting = (e) => {
        e.persist();
        e.preventDefault();
        !this.state.addingFromExisting ? this.props.getMoves() : null;
        this.setState(prevState => ({ ...prevState, addingFromExisting: !this.state.addingFromExisting }))
    }
    addToMovesArray = (e, moves) => {
        e.persist();
        e.preventDefault();
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                moves: [ ...prevState.inputs.moves, ...moves]
            }
        }))
    }
    addNewMove = (e) => {
        e.preventDefault();
    }
    removeMove = (e) => {
        e.persist();
        e.preventDefault();
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                moves: this.state.inputs.moves.filter((move, i) => move._id + i !== e.target.id)
            }
        }))
    }
    save = (e) => {
        e.persist();
        this.props.editWorkout(this.props.workout._id, this.state.inputs);
    }
    delete = (e) => {
        e.persist();
        this.props.deleteWorkout(this.props.workout._id);
        this.props.close();
    }

    render() {
        const { close, workout } = this.props;
        const { name, type, target, moves } = this.state.inputs;
        const allMoves = moves.map((move, i) =>
            <div draggable={true} className='wMMLItem' key={move + i}>
                <div>||</div>
                <div>{move.name}</div>
                <button id={move._id} className='wMMLItemx' onClick={this.removeMove}>&times;</button>
            </div>
        )
        return (
            <div>
                <div className='popMenuItems'>
                    <h2>{this.props.workout.name}</h2>
                    <button onClick={this.edit} className='popMB'>Edit</button>
                    {this.state.editing ?
                        <form className='editForm'>
                            <input onChange={this.handleChange} type="text" name='name' value={name} />
                            <input onChange={this.handleChange} type="text" name='type' value={type} />
                            <input onChange={this.handleChange} type="text" name='target' value={target} />
                            <button className='button2' onClick={this.addMoves}>Add Moves</button>
                            {this.state.adding ? <div>
                                <p>Add Move From:</p>
                                <button className='button2' onClick={this.addFromExisting}>Existing</button>
                                <button className='button2' onClick={this.addNewMove}>New</button>
                            </div> : null}
                            <div className='wMMovesList'>{allMoves}</div>
                            <button className='save' onClick={this.save}>Save</button>
                        </form> : null}
                    <button onClick={this.delete} name={workout._id} className='popMB'>Delete</button>
                    {/* <button className='popMB'>move up</button>
                    <button className='popMB'>move down</button> */}
                    <button className='close' onClick={close}>&times;</button>
                </div>
                {this.state.addingFromExisting ? 
                <ExistingMovesToAdd addToMovesArray={this.addToMovesArray} addFromExisting={this.addFromExisting} moves={this.props.data} /> 
                : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.moves
}

export default connect(mapStateToProps, { deleteWorkout, editWorkout, getMoves })(WorkoutMenu)