const defaultState = {
	'user' : {
		'role': 'guest',
		'token': JSON.parse(localStorage.token || null),
		'authMsg' : ''
	},
	'registration' : {
		'showHelper' : false,
		'errorFlag'  : false,
		'errorMsg'	 : '',
		'success'	 : false 
	},
	'spinner' : false	
}

export default defaultState;