import { activeSesonsFetch } from '../api';

export const fetchActiveSeasons = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'FETCH_ACTIVE_SEASONS',
		payload: activeSesonsFetch(payload, additionHeader),
		handlers: {
			'onSuccess': fetchActiveSeasonsSuccess,
			'onError': fetchActiveSeasonsError
		},
		redirect,
		showPreloader
	}
}

export const fetchActiveSeasonsSuccess = (payload) => {
	return {
		type: 'FETCH_ACTIVE_SEASONS_SUCCESS',
		payload
	}
}

export const fetchActiveSeasonsError = (payload) => {
	return {
		type: 'FETCH_ACTIVE_SEASONS_ERROR',
		payload
	}
}