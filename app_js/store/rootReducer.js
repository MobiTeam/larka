import { combineReducers } from 'redux'
import user from '../reducers/user'
import store from '../reducers/store'
import spinner from '../reducers/spinner'
import registration from '../reducers/registration'
import sidebar from '../reducers/sidebar'
import title from '../reducers/title'
import season from '../reducers/season'
import seasonList from '../reducers/seasonList'
import group from '../reducers/group'
import groupList from '../reducers/groupList'
import operationList from '../reducers/operationList'

function rootReducer (state = {}, action) {
    return {
    	'user'                  : user(state.user, action),
    	'season'                : season(state.season, action),
    	'spinner'               : spinner(state.spinner, action),
    	'group'					: group(state.group, action),
    	'registration'	        : registration(state.registration, action),
    	'hideSidebarOnSmallScr'	: sidebar(state.hideSidebarOnSmallScr, action),
    	'currentTitle' 			: title(state.currentTitle, action),
    	'seasonList' 			: seasonList(state.seasonList, action),
    	'groupList' 			: groupList(state.groupList, action),
    	'operationList' 		: operationList(state.operationList, action)
    }
};

export default rootReducer;