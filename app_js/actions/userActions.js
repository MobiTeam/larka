export const logIn = (payload) => {
	return {
		type: 'LOGIN',
		payload
	}
};

export const logInSuccess = (payload) => {
	return {
		type: 'LOGIN_SUCCESS',
		payload
	}
};

export const logInError = (payload) => {
	return {
		type: 'LOGIN_ERROR',
		payload
	}
};

export const logOut = () => {
	return {
		type: 'LOGOUT'
	}
};