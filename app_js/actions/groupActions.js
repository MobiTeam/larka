import { allSesonsBriefFetch, createGroup, groupShow, groupUpdate } from '../api';

export const dropGroup = () => {
	return {
		type: 'DROP_GROUP'
	}
}

export const updateGroup = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'UPDATE_GROUP',
		payload: groupUpdate(payload, additionHeader),
		handlers: {
			'onSuccess': groupUpdateSuccess,
			'onError': groupUpdateError
		},
		redirect,
		showPreloader
	}
}

export const groupUpdateSuccess = (payload) => {
	return {
		type: 'UPDATE_GROUP_SUCCESS',
		payload: payload
	}
}

export const groupUpdateError = (payload) => {
	return {
		type: 'UPDATE_GROUP_ERROR'
	}
}

export const fetchGroup = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'FETCH_GROUP',
		payload: groupShow(payload, additionHeader),
		handlers: {
			'onSuccess': fetchGroupSuccess,
			'onError': fetchGroupError
		},
		redirect,
		showPreloader
	}
}

export const fetchGroupSuccess = (payload) => {
	return {
		type: 'FETCH_GROUP_SUCCESS',
		payload: payload.group
	}
}

export const fetchGroupError = (payload) => {
	return {
		type: 'FETCH_GROUP_ERROR',
		payload
	}
}

export const groupCreate = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'CREATE_GROUP',
		payload: createGroup(payload, additionHeader),
		handlers: {
			'onSuccess': groupCreateSuccess,
			'onError': groupCreateError
		},
		redirect,
		showPreloader
	}
}

export const groupCreateSuccess = (payload) => {
	return {
		type: 'CREATE_GROUP_SUCCESS',
		payload
	}
}

export const groupCreateError = (payload) => {
	return {
		type: 'CREATE_GROUP_ERROR',
		payload
	}
}

export const localUpdateGroup = (payload) => {
	return {
		type: 'LOCAL_UPDATE_GROUP',
		payload
	}
}

export const fetchSesonsBrief = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'FETCH_SEASON',
		payload: allSesonsBriefFetch(payload, additionHeader),
		handlers: {
			'onSuccess': fetchSesonsBriefSuccess,
			'onError': fetchSesonsBriefError
		},
		redirect,
		showPreloader
	}
}

export const fetchSesonsBriefSuccess = (payload) => {
	return {
		type: 'FETCH_SEASON_BRIEF_SUCCESS',
		payload
	}
}

export const fetchSesonsBriefError = (payload) => {
	return {
		type: 'FETCH_SEASON_BRIEF_ERROR',
		payload
	}
}
