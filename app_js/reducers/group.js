const group = (state = null, action) => {
	switch (action.type) {
	case 'LOCAL_UPDATE_GROUP':
		return { ...state, ...action.payload, statusText : '', isPersist: false, err: false }
	case 'FETCH_SEASON_BRIEF_SUCCESS':
		return { ...state, seasonsBrief : action.payload.seasons }
	case 'CREATE_GROUP_SUCCESS':
		console.log(state);
		return { seasonsBrief : state.seasonsBrief, statusText : 'Группа была создана', err: false }
	case 'CREATE_GROUP_ERROR':
		return { seasonsBrief : state.seasonsBrief, statusText : 'Ошибка создания группы', err: true }
	default:	
		return state;		
	}	
};

export default group;