import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postWorkout } from '../../redux/workouts';
import { getMoves } from '../../redux/moves';

class NewWorkout extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                target: "",
                type: "",
                moves: []
            },
            movesAdded: []
        }
        this.state = this.initialState;
    }

    componentDidMount() {
        this.props.getMoves();
    }

    handleSubmit = (e) => {
        if(this.state.inputs.name.length > 0){
            
            document.getElementById('cWPageTitle').scrollIntoView();
        } else {}
        e.preventDefault();
        this.props.postWorkout(this.state.inputs);
        this.setState(this.initialState);
        document.getElementById('cWPageTitle').scrollIntoView();
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
    addToWorkout = (e, item) => {
        e.persist();
        e.preventDefault();
        console.log(this.state.inputs.moves)
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    moves: [...prevState.inputs.moves, item]
                }
            }
        })
    }
    removeMove = (e, item) => {
        e.persist();
        e.preventDefault();
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    moves: prevState.inputs.moves.filter(move => move._id !== item._id)
                }
            }
        })
    }
    formReset = (e) => {
        this.setState(this.initialState)
    }

    render() {
        let { name, target, type } = this.state.inputs
        const { loading, errMsg, data } = this.props
        if (loading) {
            return (
                <div className='loading'>...loading</div>
            )
        }
        if (errMsg) {
            return (
                <div className='errMsg'>{errMsg}</div>
            )
        } else {
            return (
                <div className='newWorkout'>
                    <h2 className='pageTitle' id='cWPageTitle'>Create New Workout</h2>
                    <div className='navigationBar'>
                        <Link className='navigationBarLink' to='/'>Main Menu</Link>
                        <Link className='navigationBarLink' to='/workouts'>Workouts</Link>
                    </div>
                    <div className='formContainer'>
                        <form onSubmit={this.handleSubmit} className='workoutForm'>
                            <div className='workoutFormInputs'>
                                <input onChange={this.handleChange} name='name' value={name} placeholder='Workout Name' type="text" />
                                <input onChange={this.handleChange} name='target' value={target} placeholder='Target' type="text" />
                                <input onChange={this.handleChange} name='type' value={type} placeholder='Type' type="text" />
                                <h3>Exercises:</h3>
                                {this.state.inputs.moves.length > 0 ? this.state.inputs.moves.map((move,i) =>
                                    <p key={i}>
                                        <button onClick={(e)=>this.removeMove(e, move)}>x</button>
                                        {i+1}.
                                        {move.name}
                                    </p>) : null}
                                <div className='formButtonsContainer'>
                                    <input className='submit' type="submit" />
                                    <input onClick={this.formReset} className='reset' type="reset" />
                                </div>
                            </div>
                            <div className='moveListNewWContainer'>
                                {data.map((item, i) =>
                                    <div className='moveInNewWList' key={item._id + i}>
                                        <Link to={`/moves/${item._id}`} key={item._id}>
                                            {item.name}
                                        </Link>
                                        <button onClick={(e)=>this.addToWorkout(e, item)}>+</button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return state.moves
}

export default connect(mapStateToProps, { postWorkout, getMoves })(NewWorkout)