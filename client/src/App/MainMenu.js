import React from 'react';
import {Link} from 'react-router-dom';

function MainMenu () {
    return (
        <div className='mainMenu'>
            <h2 className='pageTitle alpha'>WORKOUT CREATOR</h2>
            <div className='mainTitle'>Main Menu</div>
            <div className='menuContainer'>
                <Link to='/workouts'>My Workouts</Link>
                <Link to='/moves'>My Exercises</Link>
                <Link to='/new-workout'>Create New Workout</Link>
                <Link to='/new-move'>Create New Exercise</Link>
            </div>
        </div>
    )
}

export default MainMenu;