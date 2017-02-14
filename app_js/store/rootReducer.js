import { combineReducers } from 'redux'
import user from '../reducers/user'
import store from '../reducers/store'
import spinner from '../reducers/spinner'
import registration from '../reducers/registration'

function rootReducer (state = {}, action) {
    return {
    	'user'          : user(state.user, action),
    	'spinner'       : spinner(state.spinner, action),
    	'registration'	: registration(state.registration, action)
    }
};

export default rootReducer;