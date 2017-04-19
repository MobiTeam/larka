const getStatusByCode = (code) => {
	return code == 401 ? 'Необходимо подтвердить учетную запись по email' :
		   code == 403 ? 'Пользователя с данным логином или паролем не существует' : 
		   code == 422 ? 'Логин должен быть корректным email адресом, также необходимо ввести пароль' : 
		   				 'На сервере произошла ошибка, повторите попытку позже';
}

const user = (state = null, action) => {
	switch (action.type) {
	case 'BUYOUT_GROUP_BOOK_SUCCESS':
		return { ...state, groups: state.groups.map((group) => {
			if (group.id === action.payload.id) {
				return action.payload;
			}
			return group;
		}) }
	case 'PURCHASE_SUCCESS':
		return { ...state, profile: { ...state.profile, balance : (state.profile.balance - action.payload) } }
	case 'FETCH_USER_GROUPS_SUCCESS':
		return { ...state, groups: action.payload }
	case 'FETCH_USER_GROUPS_ERROR':
		return { ...state, groups: [] }	
	case 'UPDATE_PROFILE_INFO_SUCCESS':
		return { ...state, isPersist: true, persistStatus: 'Информация о профиле была успешно изменена.' }	
	case 'UPDATE_PROFILE_INFO_ERROR':
		return { ...state, isPersist: false, persistStatus: 'При сохранении данных произошла ошибка, повторите попытку позже!' }
	case 'LOCAL_UPDATE_PROFILE_INFO':
		return { ...state, 'profile' : { ...state.profile, ...action.payload }, isPersist: false, persistStatus: null };
	case 'FETCH_PROFILE_INFO_SUCCESS':
		return { ...state, 'profile' : action.payload, 'statusCode' : 200 };
	case 'FETCH_PROFILE_INFO_ERROR':
		return { ...state, 'profile' : {}, 'statusCode' : action.payload };	
	case 'RELOGIN_SUCCESS':
		return { ...state, 'token' : action.payload.token, 'role' : action.payload.role, 'authMsg' : '', 'fetchIsComplete' : true };	
	case 'RELOGIN_ERROR':
		return { 'role' : 'guest', profile : {}, 'token' : null, 'authMsg' : 'Время сессии истекло. Необходимо произвести повторный вход.', 'fetchIsComplete' : true };
	case 'LOGIN_SUCCESS':
		return { ...state, 'token' : action.payload.token, 'role' : action.payload.role, 'authMsg' : '', logOutFlag: false };
	case 'LOGIN_ERROR':
		return { 'role' : 'guest', profile : {}, 'token' : null, 'statusCode' : 200, 'authMsg' : getStatusByCode(action.payload) };
	case 'DROP_TOKEN':
		return { ...state, 'token' : null, 'authMsg' : 'Время сессии истекло. Необходимо произвести повторный вход.' };
	case 'LOGOUT':
		return { 'role' : 'guest', 'isPersist' : true, 'statusCode' : 200, profile : {}, 'token' : null, 'authMsg' : action.payload || '', logOutFlag: true };
	default:
		return state;	
	}
};

export default user;