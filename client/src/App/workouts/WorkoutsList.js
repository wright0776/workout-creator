import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWorkouts, deleteWorkout, editWorkout } from '../../redux/workouts';
import WorkoutMenu from './WorkoutMenu';

class WorkoutsList extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            open: false,
            opened: ""
        };
        this.state = this.initialState;
    }

    componentDidMount() {
        this.props.getWorkouts();
    }

    openClick = (e) => {
        e ? e.persist() : null;
        this.setState(prevState => ({
            open: !prevState.open,
            opened: e ? e.target.name : ""
        }));
    }

    render() {
        const { loading, errMsg, data } = this.props;
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
                <div className='workoutsList'>
                    <h2 className='pageTitle'>Workouts</h2>
                    <div className='navigationBar'>
                        <Link className='navigationBarLink' to='/'>Main Menu</Link>
                        {/* <input className='navigationBarLink' placeholder='search' type="search" /> */}
                    </div>
                    <div className='listOfWorkouts'>
                        {data.map((item, i) =>
                            <div key={i} className='workoutInList'>
                                <Link className='workoutLinkInList' to={`/workouts/${item._id}`} key={item._id}>{item.name}</Link>
                                <button className='workoutButtonInList' onClick={this.openClick} name={item._id}>&#8942;</button>
                                {this.state.open && this.state.opened === item._id ?
                                    <div className='popMenu'>
                                        <div className='popMenuContent'>
                                            <WorkoutMenu
                                                workout={{ ...item }}
                                                close={this.openClick}
                                                deleteWorkout={deleteWorkout}
                                                editWorkout={editWorkout}
                                            />
                                        </div>
                                    </div> : null}
                            </div>)}
                        <Link className='workoutLinkInList' to='/new-workout'>+ Create New Workout</Link>
                    </div>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return state.workouts
}

export default connect(mapStateToProps, { getWorkouts })(WorkoutsList)
