import { showSpinner, closeSpinner } from '../actions/spinnerActions'
import { logOut } from '../actions/userActions'

const isPromise = (val) => {
	return val && typeof val.then === 'function';
}

const status = (res) => {
	return res.ok ? Promise.resolve(res) : Promise.reject(new Error(res.statusText));
}

const promiseWorker = ({ dispatch }) => next => action => {
	if (!isPromise(action.payload)) return next(action);
	
	action.showPreloader && dispatch(showSpinner());
	
	action.payload
			.then((res) => {
						if (res.ok) {
							return res.json();
						} else {
							dispatch(action.handlers.onError(res));
							if (res.status == 401) {
								dispatch(logOut('Время сессии истекло. Необходимо произвести повторный вход.'));
							}
							throw new Error(res.statusText);
						}								
					})
			.then(data => {
				dispatch(action.handlers.onSuccess(data));
				action.handlers.afterFetch && action.handlers.afterFetch();
				action.showPreloader && dispatch(closeSpinner());
				action.redirect && action.redirect();
			})
			.catch(error => {
				// do something
				action.showPreloader && dispatch(closeSpinner());
			});	
			
	return next(action);
}

export default promiseWorker; 