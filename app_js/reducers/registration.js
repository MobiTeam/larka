const getErrorByCode = (code = 422) => {
	return code == 422 ? 'Указан некорректный email-адрес.' :
		   code == 409 ? 'Данный email-адрес уже зарегистрирован в системе' :
		   				 'На сервере произошла ошибка, повторите попытку позже';
}

const registration = (state = null, action) => {
	switch (action.type) {
	case 'REGISTER_SUCCESS':
		return { ...state, 'errorMsg': '', 'errorFlag': false, 'showHelper' : true, 'success' : true };
	case 'REGISTER_ERROR':
		return { ...state, 'errorMsg': getErrorByCode(action.payload), 'errorFlag': true, 'showHelper' : true, 'success' : false };
	case 'REGISTER_RESET':
		return { ...state, 'errorMsg': '', 'errorFlag': false, 'showHelper' : true, 'success' : false };
	case 'OPEN_HELPER':
		return { ...state, 'showHelper' : true, 'success' : false };
	default:
		return state;	
	}
};

export default registration;