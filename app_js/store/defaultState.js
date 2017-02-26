import hashTitle from '../constants/titles'

const defaultState = {
	'user' : {
		'role': 'guest',
		'token': JSON.parse(localStorage.token || null),
		'authMsg' : '',
		'profile' : {},
		'isPersist' : true
	},
	'registration' : {
		'showHelper' : false,
		'errorFlag'  : false,
		'errorMsg'	 : '',
		'success'	 : false 
	},
	'spinner' : false,
	'hideSidebarOnSmallScr' : true,
	'currentTitle' : hashTitle[location.pathname] || ''
}

export default defaultState;