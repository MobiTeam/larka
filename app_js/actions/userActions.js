import { authFetch, reAuthFetch, profileInfoFetch, profileInfoUpdate, userGroupsFetch, buyoutGroupBookPromise } from '../api';

export const buyoutGroupBook = (payload, { redirect, showPreloader, additionHeader, afterFetch }) => {
	return {
		type: 'BUYOUT_GROUP_BOOK',
		payload: buyoutGroupBookPromise(payload, additionHeader),
		handlers: {
			'onSuccess': buyoutGroupBookSuccess,
			'onError': buyoutGroupBookError,
			'afterFetch': afterFetch 
		},
		redirect,
		showPreloader
	}
};

export const buyoutGroupBookSuccess = ({ group }) => {
	return {
		type: 'BUYOUT_GROUP_BOOK_SUCCESS',
		payload: group
	}
}

export const buyoutGroupBookError = (payload) => {
	return {
		type: 'BUYOUT_GROUP_BOOK_ERROR'
	}
}


export const fetchUserGroups = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'FETCH_USER_GROUPS',
		payload: userGroupsFetch(payload, additionHeader),
		handlers: {
			'onSuccess': fetchUserGroupsSuccess,
			'onError': fetchUserGroupsError
		},
		redirect,
		showPreloader
	}
};

export const fetchUserGroupsSuccess = (payload) => {
	return {
		type: 'FETCH_USER_GROUPS_SUCCESS',
		payload
	}
}

export const fetchUserGroupsError = (payload) => {
	return {
		type: 'FETCH_USER_GROUPS_ERROR'
	}
}

export const localUpdateProfileInfo = (payload) => {
	return {
		type: 'LOCAL_UPDATE_PROFILE_INFO',
		payload
	}
}

export const updateProfileInfo = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'UPDATE_PROFILE_INFO',
		payload: profileInfoUpdate(payload, additionHeader),
		handlers: {
			'onSuccess': updateProfileInfoSuccess,
			'onError': updateProfileInfoError
		},
		redirect,
		showPreloader
	}
};

export const updateProfileInfoSuccess = (payload) => {
	return {
		type: 'UPDATE_PROFILE_INFO_SUCCESS',
		payload
	}
}

export const updateProfileInfoError = (payload) => {
	return {
		type: 'UPDATE_PROFILE_INFO_ERROR'
	}
}

export const fetchProfileInfo = (payload, { redirect, showPreloader, additionHeader }) => {
	return {
		type: 'FETCH_PROFILE_INFO',
		payload: profileInfoFetch(payload, additionHeader),
		handlers: {
			'onSuccess': fetchProfileInfoSuccess,
			'onError': fetchProfileInfoError
		},
		redirect,
		showPreloader
	}
};

export const fetchProfileInfoSuccess = (payload) => {
	return {
		type: 'FETCH_PROFILE_INFO_SUCCESS',
		payload
	}
}

export const fetchProfileInfoError = (payload) => {
	return {
		type: 'FETCH_PROFILE_INFO_ERROR',
		payload: payload.status
	}
}

export const dropToken = (payload) => {
	return {
		type: 'DROP_TOKEN'
	}
}

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

export const logOut = (payload) => {
	return {
		type: 'LOGOUT',
		payload
	}
};

export const purchaseSuccess = (payload) => {
	return {
		type: 'PURCHASE_SUCCESS',
		payload
	}
}