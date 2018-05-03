import axios from 'axios';

const initialState = {
    data: [],
    currentWorkout:{},
    loading: true,
    workoutLoading: true,
    errMsg: ""
};

const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'GET_WORKOUTS':
            return {
                ...state,
                data: action.workouts,
                loading: false
            }
        case 'POST_WORKOUT':
            return {
                ...state,
                data: [...state.data, action.workout],
                loading: false
            }
        case 'GET_WORKOUT':
            return {
                ...state,
                currentWorkout: action.workout,
                workoutLoading: false
            }
        case 'DELETE_WORKOUT':
            return {
                ...state,
                data: state.data.filter(workout => action.id !== workout._id),
                loading: false
            }
        case 'EDIT_WORKOUT':
            return {
                ...state,
                data: state.data.map(workout => action.id === workout.id ? action.workout : workout)
            }
        default:
            return state;
    }
}

export const getWorkouts = () => {
    return dispatch => {
        axios.get("/api/workouts")
            .then(response => {
                dispatch({
                    type: 'GET_WORKOUTS',
                    workouts: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: 'Sorry, data not available.'
                })
            })
    }
}

export const postWorkout = (newWorkout) => {
    return dispatch => {
        axios.post("/api/workouts/", newWorkout)
            .then(response => {
                dispatch({
                    type: 'POST_WORKOUT',
                    workout: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: "Sorry, cannot post new workout"
                })
            })
    }
}

export const getWorkout = (id) => {
    return dispatch => {
        dispatch({
            type: "LOADING"
        })
        axios.get("/api/workouts/" + id)
            .then(response => {
                dispatch({
                    type: 'GET_WORKOUT',
                    workout: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: "Sorry, cannot get this workout right now."
                })
            })
    }
}

export const deleteWorkout = (id) => {
    return dispatch => {
        axios.delete("/api/workouts/" + id)
            .then(response => {
                dispatch({
                    type: 'DELETE_WORKOUT',
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: "Sorry, cannot delete this workout right now."
                })
            })
    }
}

export const editWorkout = (id, newWorkout) => {
    return dispatch => {
        axios.put("/api/workouts/" + id, newWorkout)
            .then(response => {
                dispatch({
                    type: 'EDIT_WORKOUT',
                    workout: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: "Sorry, cannot update this workout right now."
                })
            })
    }
}

export default workoutsReducer;