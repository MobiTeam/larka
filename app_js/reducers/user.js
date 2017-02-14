const getStatusByCode = (code) => {
	return code == 401 ? 'Необходимо подтвердить учетную запись по email' :
		   code == 403 ? 'Пользователя с данным логином или паролем не существует' : 
		   code == 422 ? 'Логин должен быть корректным email адресом, также необходимо ввести пароль' : 
		   				 'На сервере произошла ошибка, повторите попытку позже';
}

const user = (state = null, action) => {
	switch (action.type) {
	case 'LOGIN_SUCCESS':
		return { ...state, 'token' : action.payload.token, 'role' : action.payload.role, 'authMsg' : '' };
	case 'LOGIN_ERROR':
		return { 'role' : 'guest', 'token' : null, 'authMsg' : getStatusByCode(action.payload) };
	case 'LOGOUT':
		return { 'role' : 'guest', 'token' : null, 'authMsg' : '' };
	default:
		return state;	
	}
};

export default user;