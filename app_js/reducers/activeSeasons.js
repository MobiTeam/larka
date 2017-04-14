const activeSeasons = (state = null, action) => {
	switch (action.type) {
	case 'FETCH_ACTIVE_SEASONS_SUCCESS':
		return { data: action.payload };
	case 'FETCH_ACTIVE_SEASONS_ERROR':
		return { data: [], err: 'При загрузке сезонов произошла ошибка, повторите попытку позже.'};
	default:	
		return state;		
	}	
};

export default activeSeasons;