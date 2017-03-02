import { newSesonFetch, seasonFetch } from '../api';

export const fetchSeason = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'FETCH_SEASON',
		payload: seasonFetch(payload, additionHeader),
		handlers: {
			'onSuccess': fetchSeasonSuccess,
			'onError': fetchSeasonError
		},
		redirect,
		showPreloader
	}
}

export const fetchSeasonSuccess = (payload) => {
	return {
		type: 'FETCH_SEASON_SUCCESS',
		payload: payload.season
	}
}

export const fetchSeasonError = (payload) => {
	return {
		type: 'FETCH_SEASON_ERROR',
		payload
	}
}

export const dropSeason = (payload) => {
	return {
		type: 'DROP_LOCAL_SEASON',
		payload
	}
}

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

export const localUpdateSeason = (payload) => {
	return {
		type: 'LOCAL_UPDATE_SEASON',
		payload
	}
}