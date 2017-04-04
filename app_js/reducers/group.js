const defGroupState = {
	season_id : '',
	name : '',
	description : '',
	capacity : '',
	count_training : '',
	price : '',
	day_price : ''
}

const group = (state = null, action) => {
	switch (action.type) {
	case 'DROP_GROUP':
		return { ...state, ...defGroupState, 'statusText' : '', isPersist: false, errFlag: false }
	case 'FETCH_GROUP_SUCCESS':
		return { ...state, ...action.payload, 'statusText' : '', isPersist: true, 'errFlag': false }
	case 'UPDATE_GROUP_SUCCESS':
		return { ...state, 'statusText' : 'Группа была успешно обновлена.', isPersist: true, errFlag: false }	
	case 'UPDATE_GROUP_ERROR':
		return { ...state, 'statusText' : 'При обновлении группы произошла ошибка.', isPersist: false, errFlag: false }	
	case 'FETCH_GROUP_ERROR':
		return { 'statusText' : 'При загрузке данных произошла ошибка, повторите попытку позже.', isPersist: true, errFlag: true }
	case 'LOCAL_UPDATE_GROUP':
		return { ...state, ...action.payload, statusText : '', isPersist: false, err: false }
	case 'FETCH_SEASON_BRIEF_SUCCESS':
		return { ...state, seasonsBrief : action.payload.seasons }
	case 'CREATE_GROUP_SUCCESS':
		return { ...defGroupState, seasonsBrief : state.seasonsBrief, statusText : 'Группа была успешно создана!', err: false }
	case 'CREATE_GROUP_ERROR':
		return { ...state, seasonsBrief : state.seasonsBrief, statusText : 'Ошибка создания группы!', err: true }
	default:	
		return state;		
	}	
};

export default group;