import hashTitle from '../constants/titles'

const defaultState = {
	'user' : {
		'role': 'guest',
		'token': JSON.parse(localStorage.token || null),
		'authMsg' : '',
		'profile' : {
			"id"        : null,
			"email"     : '-',
			"name"      : 'Пользователь',
			"bornDate"  : '-',
			"sex"       : '-',
			"phone"     : '-',
  			"photoLink" : null
		}
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