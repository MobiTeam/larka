import hashTitle from '../constants/titles'

const title = (state = '', action) => {
	switch (action.type) {
	case 'CHANGE_TITLE':
		return hashTitle[action.payload] || '';	
	default:
		return state;	
	}
};

export default title;
