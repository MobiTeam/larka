import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import createLogger from 'redux-logger'
import localPersist from '../middlewares/localPersist'

export default function configureStore (initialState) {
	const logger = createLogger();
	return createStore(rootReducer, initialState, applyMiddleware(logger, localPersist));
} 