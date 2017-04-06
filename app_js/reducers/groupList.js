const groupList = (state = [], action) => {
	switch (action.type) {
	case 'DELETE_GROUP_SUCCESS':
		return { ...state, data: state.data.filter(group => group.id != action.payload.id) } 
	case 'FETCH_GROUPS_SUCCESS':
		return { statusCode: 200, data: action.payload } 
	case 'FETCH_GROUPS_ERROR':
		return null;
	default:
		return state;	
	}
};

export default groupList;