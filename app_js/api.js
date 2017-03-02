import fetch from 'isomorphic-fetch'

const BASE_URL = `${ location.origin }/api`;

const insertData = (link, data) => {
	if (!data) return link;
	for (var key in data) {
		link = link.replace('[:' + key + ']', data[key]);
	}
	return link;
} 

const createFetchPromise = (link, method = 'POST') => {
	let query = {
		method,
		headers: {
			"Content-Type": "application/json"
		}
	}
	return (body, addHeader) => {
		const dataLink = insertData(link, body);
		if (body && ['POST', 'PUT'].indexOf(method) != -1) query.body = JSON.stringify(body);
		if (addHeader) query.headers = { ...query.headers, ...addHeader}; 
		return fetch(`${BASE_URL}${dataLink}`, query); 
	}
}

export const regFetch = createFetchPromise('/auth/signup'); 
export const authFetch = createFetchPromise('/auth/login'); 
export const reAuthFetch = createFetchPromise('/auth/relogin'); 

export const profileInfoFetch = createFetchPromise('/user/user', 'GET'); 
export const profileInfoUpdate = createFetchPromise('/user/update', 'POST'); 

export const newSesonFetch = createFetchPromise('/season/create', 'POST'); 
export const allSesonsFetch = createFetchPromise('/season/season', 'GET'); 
export const deleteSeason = createFetchPromise('/season/delete/[:id]', 'DELETE'); 
