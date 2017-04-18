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
		'isAuthorised' : false,
		'groups' : []
	},
	'operationList' : {
		'data' : [],
		'err' : false
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
		'acceptedFiles' : [],
		'deletedImages' : []
	},
	'activeSeasons' : {
		'data' : undefined
	},
	'seasonList' : { 
		'data' : [],
		'statusCode' : 200
	},
	'group' : {
		'statusText'    : '',
		'isPersist'     : true,
		'err'           : false,
		'seasonsBrief'	: []
	},
	'groupList' : { 
		'data' : [],
		'statusCode' : 200
	},
	'spinner' : false,
	'hideSidebarOnSmallScr' : true,
	'currentTitle' : hashTitle[location.pathname] ? hashTitle[location.pathname] : (hashTitle[location.pathname.replace(/(.*)(\/.*)/, '$1')] || '')
}

export default defaultState;