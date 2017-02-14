import fetch from 'isomorphic-fetch'

const BASE_URL = `${ location.origin }/api`;

const defaultPost = {
	method: 'POST',
	headers: {
		"Content-Type": "application/json"
	}
}

export const regFetch = (payload) => fetch(`${BASE_URL}/auth/signup`, { body: JSON.stringify(payload), ...defaultPost });

