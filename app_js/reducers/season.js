const season = (state = null, action) => {
	switch (action.type) {
	case 'FETCH_SEASON_SUCCESS':
		return { ...action.payload, 'statusText' : '', isPersist: true, 'errFlag': false, 'acceptedFiles': [] }
	case 'FETCH_SEASON_ERROR':
		return { 'statusText' : 'При загрузке данных произошла ошибка, повторите попытку позже.', isPersist: true, errFlag: true }
	case 'DROP_LOCAL_SEASON':
		return 	{ 'statusText' : '', 'isPersist': true, 'errFlag': false, 'images': [], 'acceptedFiles': [] }
	case 'LOCAL_UPDATE_SEASON':
		return { ...state, ...action.payload, 'statusText' : '', isPersist: false, errFlag: false }
	case 'CREATE_SEASON_SUCCESS':
		return { 'statusText' : 'Сезон успешно сохранен.', isPersist: true, 'images': [], 'acceptedFiles': [] }
	case 'CREATE_SEASON_ERROR':
		return { ...state, 'statusText' : 'При сохранении данных произошла ошибка, повторите попытку позже.', isPersist: false }	
	default:
		return state;	
	}
};

export default season;