const defaultState = {
	'user' : {
		'role': 'guest',
		'token': null,
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