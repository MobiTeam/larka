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