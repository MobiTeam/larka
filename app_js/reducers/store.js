const store = (state = {}, action) => {
	switch (action.type) {
	case 'LOAD_STORED_STATE':
		return action.storedState;
	default:
		return state;
	}
};

export default store;