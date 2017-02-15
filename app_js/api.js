import fetch from 'isomorphic-fetch'

const BASE_URL = `${ location.origin }/api`;

const defaultPost = {
	method: 'POST',
	headers: {
		"Content-Type": "application/json"
	}
}

const createFetchPromise = (link) => {
	return (payload) => fetch(`${BASE_URL}${link}`, { body: JSON.stringify(payload), ...defaultPost });
}

const createAuthFetchPromise = (link) => {
	return (payload, headers) => {
		const authPost = { ...defaultPost };
		authPost.headers = { ...authPost.headers, ...headers }; 
		return fetch(`${BASE_URL}${link}`, { body: JSON.stringify(payload), ...authPost });
	}
}

export const regFetch = createFetchPromise('/auth/signup'); 
export const authFetch = createFetchPromise('/auth/login'); 
export const reAuthFetch = createAuthFetchPromise('/auth/relogin'); 