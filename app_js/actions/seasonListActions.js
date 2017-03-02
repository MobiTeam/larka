import { allSesonsFetch, deleteSeason } from '../api';

export const fetchAllSeasons = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'FETCH_SEASONS',
		payload: allSesonsFetch(payload, additionHeader),
		handlers: {
			'onSuccess': fetchAllSeasonsSuccess,
			'onError': fetchAllSeasonsError
		},
		redirect,
		showPreloader
	}
};

export const fetchAllSeasonsSuccess = (payload) => {
	return {
		type: 'FETCH_SEASONS_SUCCESS',
		payload: payload.seasons
	}
}

export const fetchAllSeasonsError = (payload) => {
	return {
		type: 'FETCH_SEASONS_ERROR',
		payload
	}
}

export const seasonDelete = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'DELETE_SEASON',
		payload: deleteSeason(payload, additionHeader),
		handlers: {
			'onSuccess': seasonDeleteSuccess,
			'onError': seasonDeleteError
		},
		redirect,
		showPreloader
	}
};

export const seasonDeleteSuccess = (payload) => {
	return {
		type: 'DELETE_SEASON_SUCCESS',
		payload: payload.id
	}
}

export const seasonDeleteError = (payload) => {
	return {
		type: 'DELETE_SEASON_ERROR',
		payload
	}
}
