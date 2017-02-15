import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import createLogger from 'redux-logger'
import promiseWorker from '../middlewares/promiseWorker'

export default function configureStore (initialState) {
	const logger = createLogger();
	const promise = promiseWorker;
	return createStore(rootReducer, initialState, applyMiddleware(logger, promise));
} 