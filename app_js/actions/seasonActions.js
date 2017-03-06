import { newSesonFetch, seasonFetch, seasonUpdate } from '../api';

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

export const updateSeason = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'UPDATE_SEASON',
		payload: seasonUpdate(payload, additionHeader),
		handlers: {
			'onSuccess': updateSeasonSuccess,
			'onError': updateSeasonError
		},
		redirect,
		showPreloader
	}
}

export const updateSeasonSuccess = (payload) => {
	return {
		type: 'UPDATE_SEASON_SUCCESS',
		payload: payload.season
	}
}

export const updateSeasonError = (payload) => {
	return {
		type: 'UPDATE_SEASON_ERROR'
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
	console.log(payload);
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