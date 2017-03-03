import hashTitle from '../constants/titles'

const defaultState = {
	'user' : {
		'role': 'guest',
		'token': JSON.parse(localStorage.token || null),
		'authMsg' : '',
		'profile' : {},
		'isPersist' : true,
		'statusCode' : 200,
		'logOutFlag' : false,
		'isAuthorised' : false
	},
	'registration' : {
		'showHelper' : false,
		'errorFlag'  : false,
		'errorMsg'	 : '',
		'success'	 : false 
	},
	'season' : {
		'statusText'    : '',
		'isPersist'     : true,
		'errFlag'       : false,
		'images'        : [],
		'acceptedFiles' : []
	},
	'seasonList' : { 
		'data' : [],
		'statusCode' : 200
	},
	'spinner' : false,
	'hideSidebarOnSmallScr' : true,
	'currentTitle' : hashTitle[location.pathname] ? hashTitle[location.pathname] : (hashTitle[location.pathname.replace(/(.*)(\/.*)/, '$1')] || '')
}

export default defaultState;