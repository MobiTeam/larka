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

export const regFetch = createFetchPromise('/auth/signup'); 
export const authFetch = createFetchPromise('/auth/login'); 
export const reAuthFetch = createFetchPromise('/auth/relogin'); 