import fetch from 'isomorphic-fetch'

const BASE_URL = `${ location.origin }/api`;

const createFetchPromise = (link, method = 'POST') => {
	let query = {
		method,
		headers: {
			"Content-Type": "application/json"
		}
	}
	return (body, addHeader) => {
		if (body && method != 'GET') query.body = JSON.stringify(body);
		if (addHeader) query.headers = { ...query.headers, ...addHeader}; 
		return fetch(`${BASE_URL}${link}`, query); 
	}
}

export const regFetch = createFetchPromise('/auth/signup'); 
export const authFetch = createFetchPromise('/auth/login'); 
export const reAuthFetch = createFetchPromise('/auth/relogin'); 

export const profileInfoFetch = createFetchPromise('/user/user', 'GET'); 
export const profileInfoUpdate = createFetchPromise('/user/update', 'POST'); 
