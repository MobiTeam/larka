import { authFetch, reAuthFetch } from '../api';

export const logIn = (payload, { redirect, showPreloader }) => {
	return {
		type: 'LOGIN',
		payload: authFetch(payload),
		handlers: {
			'onSuccess': logInSuccess,
			'onError': logInError
		},
		redirect,
		showPreloader
	}
};

export const reLogIn = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'RELOGIN',
		payload: reAuthFetch(payload, additionHeader),
		handlers: {
			'onSuccess': relogInSuccess,
			'onError': relogInError
		},
		redirect,
		showPreloader,
	}
};

export const relogInSuccess = (payload) => {
	return {
		type: 'RELOGIN_SUCCESS',
		payload: {
			token : payload.token,
			role : payload.payload.user_group
		}
	}
}

export const relogInError = (payload) => {
	return {
		type: 'RELOGIN_ERROR'
	}
}

export const logInSuccess = (payload) => {
	return {
		type: 'LOGIN_SUCCESS',
		payload: {
			token : payload.token,
			role : payload.payload.user_group
		}
	}
};

export const logInError = (payload) => {
	return {
		type: 'LOGIN_ERROR',
		payload: payload.status
	}
};

export const logOut = () => {
	return {
		type: 'LOGOUT'
	}
};
