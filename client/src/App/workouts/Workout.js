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
            const workoutMoves = moves.map((move, i) =>
                <WorkoutMove key={move._id + i}{...move} />)
            return (
                <div className='workout'>
                    <h2 className='pageTitle'>{name}</h2>
                    <div className='backInner'>
                        <Link to='/workouts'>Workouts</Link>
                        <Link to='/'>Main Menu</Link>
                    </div>
                    <div className='list'>
                        <h3>Type:</h3>
                        <h2>{type}</h2>
                        <h3>Target:</h3>
                        <h2>{target}</h2>
                        <h3>Exercises:</h3>
                        {workoutMoves}
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
