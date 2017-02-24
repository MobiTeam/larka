import { showSpinner, closeSpinner } from '../actions/spinnerActions'

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
							throw new Error(res.statusText);
						}								
					})
			.then(data => {
				dispatch(action.handlers.onSuccess(data));
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