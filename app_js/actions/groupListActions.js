import { groupFetch, groupDelete } from '../api';

export const deleteGroup = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'DELETE_GROUP',
		payload: groupDelete(payload, additionHeader),
		handlers: {
			'onSuccess': groupDeleteSuccess,
			'onError': groupDeleteError
		},
		redirect,
		showPreloader
	}
}

export const groupDeleteSuccess = (payload) => {
	return {
		type: 'DELETE_GROUP_SUCCESS',
		payload
	}
}

export const groupDeleteError = (payload) => {
	return {
		type: 'DELETE_GROUP_ERROR'
	}
}

export const fetchAllGroups = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'FETCH_GROUPS',
		payload: groupFetch(payload, additionHeader),
		handlers: {
			'onSuccess': fetchAllGroupsSuccess,
			'onError': fetchAllGroupsError
		},
		redirect,
		showPreloader
	}
};

export const fetchAllGroupsSuccess = (payload) => {
	return {
		type: 'FETCH_GROUPS_SUCCESS',
		payload: payload.info_groups || []
	}
}

export const fetchAllGroupsError = (payload) => {
	return {
		type: 'FETCH_GROUPS_ERROR',
		payload
	}
}

