const season = (state = null, action) => {
	switch (action.type) {
	case 'LOCAL_UPDATE_SEASON':
		return { ...state, ...action.payload, 'statusText' : '', isPersist: false }
	case 'CREATE_SEASON_SUCCESS':
		return { 'statusText' : 'Сезон успешно сохранен.', isPersist: true }
	case 'CREATE_SEASON_ERROR':
		return { ...state, 'statusText' : 'При сохранении данных произошла ошибка, повторите попытку позже.', isPersist: false }	
	default:
		return state;	
	}
};

export default season;