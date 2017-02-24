import { createStore, applyMiddleware } from 'redux'
import { DEBUG } from '../constants/conf'
import rootReducer from './rootReducer'
import createLogger from 'redux-logger'
import promiseWorker from '../middlewares/promiseWorker'

export default function configureStore (initialState) {
	const middlewares = [
		DEBUG && createLogger(),
		promiseWorker
	].filter(Boolean);

	return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
} 