const getStatusByCode = (code) => {
	return code == 401 ? 'Необходимо подтвердить учетную запись по email' :
		   code == 403 ? 'Пользователя с данным логином или паролем не существует' : 
		   code == 422 ? 'Логин должен быть корректным email адресом, также необходимо ввести пароль' : 
		   				 'На сервере произошла ошибка, повторите попытку позже';
}

const user = (state = null, action) => {
	switch (action.type) {
	case 'FETCH_PROFILE_INFO_SUCCESS':
		return { ...state, 'profile' : action.payload };
	case 'FETCH_PROFILE_INFO_ERROR':
		return { ...state, 'profile' : {} };	
	case 'RELOGIN_SUCCESS':
		return { ...state, 'token' : action.payload.token, 'role' : action.payload.role, 'authMsg' : '' };	
	case 'RELOGIN_ERROR':
		return { ...state, 'role' : 'guest', 'token' : null, 'authMsg' : 'Время сессии истекло. Необходимо произвести повторный вход.' };
	case 'LOGIN_SUCCESS':
		return { ...state, 'token' : action.payload.token, 'role' : action.payload.role, 'authMsg' : '' };
	case 'LOGIN_ERROR':
		return { ...state, 'role' : 'guest', 'token' : null, 'authMsg' : getStatusByCode(action.payload) };
	case 'DROP_TOKEN':
		return { ...state, 'token' : null }
	case 'LOGOUT':
		return { ...state, 'role' : 'guest', 'token' : null, 'authMsg' : '' };
	default:
		return state;	
	}
};

export default user;