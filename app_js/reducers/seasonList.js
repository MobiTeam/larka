const seasonList = (state = [], action) => {
	switch (action.type) {
	case 'DELETE_SEASON_SUCCESS':
		return state.filter(season => season.id != action.payload); 
	case 'FETCH_SEASONS_SUCCESS':
		return action.payload;
	case 'FETCH_SEASONS_ERROR':
		return null;
	default:
		return state;	
	}
};

export default seasonList;