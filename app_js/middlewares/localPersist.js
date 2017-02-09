import { createSession } from 'redux-session';

const session = createSession({
	ns: 'fit', // namespace
	throttle: 1, // ms
	selectState (state) {
		return {
			user: state.user
		};
	},
	clearStorage (action) {
    	return action.type === 'DROP_SESSION_DATA';
  	}
});

export default session;

