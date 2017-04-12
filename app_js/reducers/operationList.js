const operationList = (state = null, action) => {
	switch (action.type) {
	case 'FETCH_OPERATION_LIST_SUCCESS':
		return { data: action.payload.userPayments }
	case 'FETCH_OPERATION_LIST_ERROR':
		return { data: [], err: true }
	default:
		return state;	
	}
};

export default operationList;