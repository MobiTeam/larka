// basic libs
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import jwt from 'jwt-simple'
// import fetch from 'isomorphic-fetch'

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

// store
import configureStore from './store/store'
import defaultState from './store/defaultState'

const store = configureStore(JSON.parse(localStorage['fit.root'] || JSON.stringify(defaultState)));

// const str = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2dyb3VwX2lkIjoiQWxleGFuZGVyIiwic3ViIjozLCJpc3MiOiJodHRwOlwvXC9maXQubG9jYWxcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE0ODYzODQ1MjIsImV4cCI6MTQ4NjM4ODEyMiwibmJmIjoxNDg2Mzg0NTIyLCJqdGkiOiIwY2IyZTU1YTQxNTU4MWNkODMwOTJhYzhiZjhjZTg1ZCJ9.OrHB40RZDBeJRcd3sfzuYPOaj2Zg6CiZFxeIrBBEtjg';
// const secret = 'privetmedved';
// var token = jwt.decode(str, secret);

render( 
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<Route component={Panel}>
						<IndexRoute component={Home} />
						<Route path='login' component={LoginForm} />
						<Route path='registration' component={RegistrationForm} />
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



