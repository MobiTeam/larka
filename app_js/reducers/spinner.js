const spinner = (state = false, action) => {
	switch (action.type) {
	case 'SHOW_SPINNER':
		return action.payload;
	case 'CLOSE_SPINNER':
		return action.payload;
	default:
		return state;		
	}
}

export default spinner;