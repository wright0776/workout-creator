import React from 'react';
import {Switch,Route} from 'react-router-dom';

// STATIC
import TopMargin from './TopMargin';
import Footer from './Footer';

// SWITCH ROUTES
import MainMenu from './MainMenu';
import WorkoutsList from './workouts/WorkoutsList';
import Workout from './workouts/Workout';
import MovesList from './moves/MovesList';
import Move from './moves/Move';
import NewWorkout from './workouts/NewWorkout';
import NewMove from './moves/NewMove';

function App () {
    return (
        <div className='app'>
            <TopMargin />
            <Switch>
                <Route exact path='/' component={MainMenu} />
                <Route exact path='/workouts' component={WorkoutsList} />
                <Route path='/workouts/:workoutId' component={Workout} />
                <Route exact path='/moves' component={MovesList} />
                <Route path='/moves/:moveId' component={Move} />
                <Route path='/new-workout' component={NewWorkout} />
                <Route path='/new-move' component={NewMove} />
            </Switch>
            <Footer />
        </div>
    )
}

export default App;