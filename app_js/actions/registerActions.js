import { regFetch } from '../api';

export const register = (payload, showPreloader = true) => {
	return {
		type: 'REGISTER',
		payload: regFetch(payload),
		handlers: {
			'onSuccess': registerSuccess, 
			'onError': registerError
		},
		showPreloader
	}
};

export const registerSuccess = (payload) => {
	return {
		type: 'REGISTER_SUCCESS',
		payload
	}
};

export const registerError = (payload) => {
	return {
		type: 'REGISTER_ERROR',
		payload: payload.status
	}
};

export const openHelper = () => {
	return {
		type: 'OPEN_HELPER',
		payload: true
	}
}