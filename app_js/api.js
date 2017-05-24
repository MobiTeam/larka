import fetch from 'isomorphic-fetch'

const BASE_URL = `${ location.origin }/api`;

const insertData = (link, data) => {
	if (!data) return link;
	if (Object.prototype.toString.call(data) === "[object FormData]") {
		link = insertDataFromFormData(link, data);
	} else {
		link = insertDataFromObj(link, data);
	}
	return link;
} 

const insertDataFromFormData = (link, data) => {
	for (var pair of data.entries()) {
		link = link.replace('[:' + pair[0] + ']', pair[1]);
   	}
	return link;
}

const insertDataFromObj = (link, data) => {
	for (var key in data) {
		link = link.replace('[:' + key + ']', data[key]);
	}
	return link;
}

const createFetchPromise = (link, method = 'POST') => {
	let query = {
		method,
		headers: {}
	}
	return (body, addHeader) => {
		const dataLink = insertData(link, body);
		if (body && ['POST', 'PUT'].indexOf(method) != -1) {
			if (Object.prototype.toString.call(body) === "[object FormData]") {
				query.body = body;
			} else {
				query.body = JSON.stringify(body);
				query.headers["Content-Type"] = "application/json";
			}
		} 
		if (addHeader) query.headers = { ...query.headers, ...addHeader}; 
		return fetch(`${BASE_URL}${dataLink}`, query); 
	}
}

export const regFetch = createFetchPromise('/auth/signup'); 
export const authFetch = createFetchPromise('/auth/login'); 
export const reAuthFetch = createFetchPromise('/auth/relogin'); 

export const profileInfoFetch = createFetchPromise('/user/user', 'GET'); 
export const userGroupsFetch = createFetchPromise('/tsgroup/index', 'GET'); 
export const profileInfoUpdate = createFetchPromise('/user/update', 'POST'); 
export const joinToSeasonGroup = createFetchPromise('/tsgroup/create', 'POST');
export const bookingSeasonGroup = createFetchPromise('/tsgroup/create_booking', 'POST');
export const buyoutGroupBookPromise = createFetchPromise('/tsgroup/pay_booking', 'POST');

export const allSesonsBriefFetch = createFetchPromise('/season/brief_index', 'GET'); 
export const newSesonFetch = createFetchPromise('/season/create', 'POST'); 
export const allSesonsFetch = createFetchPromise('/season/season', 'GET'); 
export const activeSesonsFetch = createFetchPromise('/season/season_group', 'GET'); 
export const seasonFetch = createFetchPromise('/season/show/[:id]', 'GET'); 
export const seasonUpdate = createFetchPromise('/season/update/[:id]', 'POST'); 
export const deleteSeason = createFetchPromise('/season/delete/[:id]', 'DELETE'); 

export const createGroup = createFetchPromise('/group/create', 'POST'); 
export const groupFetch = createFetchPromise('/group/group', 'GET'); 
export const groupShow = createFetchPromise('/group/show/[:id]', 'GET'); 
export const groupUpdate = createFetchPromise('/group/update/[:id]', 'POST'); 
export const groupDelete = createFetchPromise('/group/delete/[:id]', 'DELETE'); 

export const getUsersInGroups = createFetchPromise('/tsgroup/list', 'GET');

export const fetchBankOperations = createFetchPromise('/sberbank/index', 'GET');
export const createBankOrder = createFetchPromise('/sberbank/create', 'POST');
export const getPaymentsList = createFetchPromise('/sberbank/list', 'GET');

export const fetchAllSeasonEventsPromise = createFetchPromise('/event/index', 'GET');
export const fetchAllEventsPromise = createFetchPromise('/event/list', 'GET');
export const fetchEventPromise = createFetchPromise('/event/show/[:id]', 'GET');
export const createEventPromise = createFetchPromise('/event/create', 'POST');
export const updateEventPromise = createFetchPromise('/event/update/[:id]', 'POST');
export const deleteEventPromise = createFetchPromise('/event/delete/[:id]', 'DELETE');

export const fetchEventTimePromise = createFetchPromise('/event_time/brief_index/[:id]', 'GET');
export const createEventTimePromise = createFetchPromise('/event_time/create', 'POST');
export const updateEventTimePromise = createFetchPromise('/event_time/update/[:id]', 'POST');
export const deleteEventTimePromise = createFetchPromise('/event_time/delete/[:id]', 'DELETE');

export const fetchUserEvents = createFetchPromise('/user_event/list', 'GET');
export const fetchAvailUserEvents = createFetchPromise('/user_event/show', 'GET');
export const fetchAllUserEvents = createFetchPromise('/user_event/index', 'GET');

export const createUserEventsRelation = createFetchPromise('/user_event/create', 'POST');
export const updateUserEventsRelation = createFetchPromise('/user_event/update', 'POST');
export const deleteUserEventsRelation = createFetchPromise('/user_event/delete', 'POST');
