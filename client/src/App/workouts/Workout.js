import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWorkout } from '../../redux/workouts';
import WorkoutMove from './WorkoutMove';

class Workout extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            loading: true,
            errMsg: "",
            data: {}
        }
    }

    componentDidMount() {
        this.props.getWorkout(this.props.match.params.workoutId);
    }

    render() {
        const { workoutLoading, errMsg, currentWorkout } = this.props;
        if (workoutLoading) {
            return (
                <div className='loading'>loading...</div>
            )
        }
        if (errMsg) {
            return (
                <div className='errMsg'>{errMsg}</div>
            )
        } else {
            const { name, moves, target, type } = currentWorkout
            return (
                <div className='workout'>
                    <h2 className='pageTitle black'>{name}</h2>
                    <div className='navigationBar'>
                        <Link className='navigationBarLink' to='/workouts'>Workouts</Link>
                        <Link className='navigationBarLink' to='/'>Main Menu</Link>
                    </div>
                    <div className='workoutDetails'>
                        <h1 className='workoutName'>{name}</h1>
                        <div className='workoutDetail'>
                            <div className='type'>Type:</div>
                            <div>{type}</div>
                        </div>
                        <div className='workoutDetail'>
                            <div className='target'>Target:</div>
                            <div>{target}</div>
                        </div>
                        <div className='exercises'>Exercises:</div>
                        <div className='movesInWorkout'>
                            {moves.map((move, i) =>
                                <div className='moveInWorkout'>
                                    <WorkoutMove key={move._id + i}{...move} />
                                    <div className='moveDetail'>
                                        <div className='sets'>Sets:</div>
                                        <div></div>
                                    </div>
                                    <div className='moveDetail'>
                                        <div className='reps'>Reps:</div>
                                        <div></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return state.workouts
}

export default connect(mapStateToProps, { getWorkout })(Workout)
