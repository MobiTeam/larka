import { combineReducers } from 'redux'
import user from '../reducers/user'
import store from '../reducers/store'
import spinner from '../reducers/spinner'

function rootReducer (state = {}, action) {
    return {
    	'user'    : user(state.user, action),
    	'spinner' : spinner(state.spinner, action)	
    }
};

export default rootReducer;