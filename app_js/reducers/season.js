const season = (state = null, action) => {
	switch (action.type) {
	case 'FETCH_SEASON_SUCCESS':
		return { ...action.payload, 'statusText' : '', isPersist: true, 'errFlag': false, 'acceptedFiles': [], 'deletedImages' : [] }
	case 'UPDATE_SEASON_SUCCESS':
		return { ...state, ...action.payload, 'acceptedFiles': [], 'deletedImages' : [], 'statusText' : 'Информация о сезоне успешно обновлена.', isPersist: true, errFlag: false }
	case 'UPDATE_SEASON_ERROR':
		return { ...state, 'statusText' : 'При обновлении информации о сезоне произошла ошибка!', isPersist: false, errFlag: true }
	case 'FETCH_SEASON_ERROR':
		return { 'statusText' : 'При загрузке данных произошла ошибка, повторите попытку позже.', isPersist: true, errFlag: true }
	case 'DROP_LOCAL_SEASON':
		return 	{ 'statusText' : '', 'isPersist': true, 'errFlag': false, 'images': [], 'acceptedFiles': [], 'deletedImages' : [] }
	case 'LOCAL_UPDATE_SEASON':
		return { ...state, ...action.payload, statusText : action.payload.statusText || '', isPersist: false, errFlag: action.payload.errFlag || false }
	case 'CREATE_SEASON_SUCCESS':
		return { 'statusText' : 'Сезон успешно сохранен.', isPersist: true, 'images': [], 'acceptedFiles': [], 'deletedImages' : [] }
	case 'CREATE_SEASON_ERROR':
		return { ...state, 'statusText' : 'При сохранении данных произошла ошибка, повторите попытку позже.', isPersist: false }	
	default:
		return state;	
	}
};

export default season;