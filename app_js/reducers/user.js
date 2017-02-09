const user = (state = null, action) => {
	switch (action.type) {
	case 'LOGIN':
		return action.payload;
	case 'LOGOUT':
		return { 'role' : 'guest' };
	default:
		return state;	
	}
};

export default user;