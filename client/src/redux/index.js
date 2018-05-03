import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import workoutsReducer from './workouts';
import movesReducer from './moves';

const store = createStore(
    combineReducers({workouts: workoutsReducer, moves: movesReducer}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

store.subscribe(() => {
    console.log('store', store.getState())
});

export default store;