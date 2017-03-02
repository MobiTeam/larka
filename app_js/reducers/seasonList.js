const seasonList = (state = [], action) => {
	switch (action.type) {
	case 'DELETE_SEASON_SUCCESS':
		return { ...state, data: state.data.filter(season => season.id != action.payload) } 
	case 'FETCH_SEASONS_SUCCESS':
		return { statusCode: 200, data: action.payload } 
	case 'FETCH_SEASONS_ERROR':
		return null;
	default:
		return state;	
	}
};

export default seasonList;