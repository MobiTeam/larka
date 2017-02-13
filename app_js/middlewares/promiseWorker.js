import { showSpinner, closeSpinner } from '../actions/spinnerActions'

const isPromise = (val) => {
	return val && typeof val.then === 'function';
}

const promiseWorker = ({ dispatch }) => next => action => {
	action.showPreloader && dispatch(showSpinner());
	if (!isPromise(action.payload)) return next(action);
	
	return action.payload.then((result) => {
							action.handlers && result.ok ? dispatch(action.handlers.onSuccess(result))
														 : dispatch(action.handlers.onError(result));	

							action.showPreloader && dispatch(closeSpinner());
						 });
						
}

export default promiseWorker;