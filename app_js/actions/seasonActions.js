import { newSesonFetch } from '../api';

export const createNewSeason = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'CREATE_SEASON',
		payload: newSesonFetch(payload, additionHeader),
		handlers: {
			'onSuccess': createNewSeasonSuccess,
			'onError': createNewSeasonError
		},
		redirect,
		showPreloader
	}
};

export const createNewSeasonSuccess = (payload) => {
	return {
		type: 'CREATE_SEASON_SUCCESS',
		payload
	}
}

export const createNewSeasonError = (payload) => {
	return {
		type: 'CREATE_SEASON_ERROR'
	}
}
