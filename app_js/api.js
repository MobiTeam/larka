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
export const profileInfoUpdate = createFetchPromise('/user/update', 'POST'); 


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

export const fetchBankOperations = createFetchPromise('/sberbank/index', 'GET');
export const createBankOrder = createFetchPromise('/sberbank/create', 'POST');