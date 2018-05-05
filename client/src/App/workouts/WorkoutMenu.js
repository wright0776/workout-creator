import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteWorkout, editWorkout } from '../../redux/workouts';
import { getMoves } from '../../redux/moves';
import AddMoveFromExisting from './AddMoveFromExisting';
import AddMoveFromCreate from './AddMoveFromCreate';

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
            addingFromExisting: false,
            addingFromCreate: false
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
    addFromCreate = (e) => {
        e.persist();
        e.preventDefault();
        this.setState(prevState => ({ ...prevState, addingFromCreate: !this.state.addingFromCreate}))
    }
    addToMovesArray = (e, moves) => {
        e.persist();
        e.preventDefault();
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                moves: [...prevState.inputs.moves, ...moves]
            }
        }))
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
        return (
            <div>
                <div className='popMenuItems'>
                    <h2 className='popMenuName'>{this.props.workout.name}</h2>
                    <button onClick={this.edit} className='popMenuButton'>Edit</button>
                    {this.state.editing ?
                        <form className='editForm'>
                            <label className='name2'>Name:
                                <input onChange={this.handleChange} type="text" name='name' value={name} />
                            </label>
                            <label className='type2'>Type:
                                <input onChange={this.handleChange} type="text" name='type' value={type} />
                            </label>
                            <label className='target2'>Target:
                                <input onChange={this.handleChange} type="text" name='target' value={target} />
                            </label>
                            <button className='button2' onClick={this.addMoves}>Add Moves</button>
                            {this.state.adding ? <div>
                                <p>Add Move From:</p>
                                <button className='button2' onClick={this.addFromExisting}>Existing</button>
                                <button className='button2' onClick={this.addFromCreate}>New</button>
                            </div> : null}
                            <div className='wMMovesList'>
                                {moves.map((move, i) =>
                                    <div draggable={true} className='wMMLItem' key={move + i}>
                                        <div>{move.name}</div>
                                        <button id={move._id} className='wMMLItemx' onClick={this.removeMove}>&times;</button>
                                    </div>)}
                            </div>
                            <button className='save' onClick={this.save}>Save</button>
                        </form> : null}
                    <button onClick={this.delete} name={workout._id} className='popMenuButton'>Delete</button>
                    <button className='close' onClick={close}>&times;</button>
                </div>
                {this.state.addingFromExisting ?
                    <AddMoveFromExisting addToMovesArray={this.addToMovesArray} addFromExisting={this.addFromExisting} moves={this.props.data} />
                    : null}
                {this.state.addingFromCreate ? 
                    <AddMoveFromCreate addToMovesArray={this.addToMovesArray} addFromCreate={this.addFromCreate} workoutName={this.state.inputs.name} />
                    : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.moves
}

export default connect(mapStateToProps, { deleteWorkout, editWorkout, getMoves })(WorkoutMenu)