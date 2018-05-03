import axios from 'axios';

const initialState = {
    data: [],
    currentMove: {},
    currentLoading: true,
    loading: true,
    errMsg: ""
};

const movesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true
            }
        case 'GET_MOVES':
            return {
                ...state,
                data: action.moves,
                loading: false
            }
        case 'POST_MOVE':
            return {
                ...state,
                data: [...state.data, action.move],
                loading: false
            }
        case 'GET_MOVE':
            return {
                ...state,
                currentMove: action.move,
                loading: false
            }
        case 'DELETE_MOVE':
            return {
                ...state,
                data: state.data.filter(id => action.id !== id),
                loading: false
            }
        case 'EDIT_MOVE':
            return {
                ...state,
                data: state.data.map(move => action.id === move.id ? action.move : move)
            }
        default:
            return state;
    }
}

export const getMoves = () => {
    return dispatch => {
        axios.get("/api/moves")
            .then(response => {
                dispatch({
                    type: 'GET_MOVES',
                    moves: response.data
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

export const postMove = (newMove) => {
    return dispatch => {
        axios.post("/api/moves/",newMove)
            .then(response => {
                dispatch({
                    type: 'POST_MOVE',
                    move: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: "Sorry, cannot post new move"
                })
            })
    }
}

export const getMove = (id) => {
    return dispatch => {
        dispatch({
            type: "LOADING"
        })
        axios.get("/api/moves/" + id)
            .then(response => {
                dispatch({
                    type: 'GET_MOVE',
                    move: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: "Sorry, cannot get this move right now."
                })
            })
    }
}

export const deleteMove = (id) => {
    return dispatch => {
        axios.delete("/api/moves/" + id)
            .then(response => {
                dispatch({
                    type: 'DELETE_MOVE',
                    move: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: "Sorry, cannot delete this move right now."
                })
            })
    }
}

export const editMove = (id, newMove) => {
    return dispatch => {
        axios.put("/api/moves/" + id, newMove)
            .then(response => {
                dispatch({
                    type: 'EDIT_MOVE',
                    move: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: "Sorry, cannot update this move right now."
                })
            })
    }
}

export default movesReducer;