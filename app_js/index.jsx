// basic libs
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import fetch from 'isomorphic-fetch'

// components
import App from './containers/App'
import Panel from './components/Panel'
import Home from './components/panel/Home'
import RegistrationForm from './components/panel/RegistrationForm'
import LoginForm from './components/panel/LoginForm'

import Dashboard from './components/Dashboard'
import DashboardIndex from './components/dashboard/Index'
import Profile from './components/dashboard/profile/Profile'
import NotFound from './components/NotFound'

// acl
import { all, admin, user, guest } from './constants/acl.js'
import canSee from './hocs/enableAuth'
import checkToken from './hocs/checkToken'

// store
import configureStore from './store/store'
import defaultState from './store/defaultState'

const store = configureStore(defaultState);

store.subscribe(() => {
	localStorage.token = JSON.stringify(store.getState().user.token);
})

render( 
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<Route component={Panel}>
						<IndexRoute component={Home} />
						<Route path='login' component={checkToken(LoginForm)} />
						<Route path='registration' component={checkToken(RegistrationForm)} />
					</Route>
					<Route component={canSee(Dashboard, [admin, user])}>
						<Route path='/dashboard' component={DashboardIndex} />
						<Route path='/dashboard/profile' component={Profile} />					
					</Route>					
				</Route>
				<Route path='*' component={NotFound} />
			</Router>
		</Provider>,
		document.getElementById('root')
	)



