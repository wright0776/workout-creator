import React from 'react';
import {Link} from 'react-router-dom';

function MainMenu () {
    return (
        <div className='mainMenu'>
            <h2 className='pageTitle'>WORKOUT CREATOR</h2>
            <div className='mainMenuTitle'>Main Menu</div>
            <div className='menuContainer'>
                <Link className='mainMenuLink' to='/workouts'>My Workouts</Link>
                <Link className='mainMenuLink' to='/moves'>My Moves</Link>
                <Link className='mainMenuLink' to='/new-workout'>Create New Workout</Link>
                <Link className='mainMenuLink' to='/new-move'>Create New Move</Link>
            </div>
        </div>
    )
}

export default MainMenu;