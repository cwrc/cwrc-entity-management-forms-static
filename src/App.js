// @flow
import 'semantic-ui-css/semantic.css'

import React, { Component } from 'react'
import {Provider} from 'react-redux'
import {IntlProvider, defineMessages, addLocaleData} from 'react-intl'

import {createStore} from 'redux'
import rootReducer from './reducers'

import {ThemeProvider} from 'styled-components'
import theme from './styles/theme'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'

import configureApp from './app/configureApp'
import configureRootComponent from './app/configureRoot'
import type {GlobalState} from 'reducers'
import type {i18nConfigObject} from 'types'

import AppC from './containers/App'
import RoutingWrapper from './components/addons/RoutingWrapper'
import {getRouterRoutes} from './routing'

import Dashboard from './containers/Dashboard'
import Login from './containers/Login'
import NotFound from './containers/NotFound'

import Person from './containers/EntityForm/Person'
import Place from './containers/EntityForm/Place'
import Organization from './containers/EntityForm/Organization'

const routes = [{
	path: '/',
	exact: true,
	tag: Route,
	component: Dashboard,
	meta: {
		icon: 'tasks',
		name: 'Dashboard',
		sidebarVisible: true
	}
},
{
	path: '/person',
	exact: true,
	tag: Route,
	component: Person,
	meta: {
		name: 'Add a Person',
		icon: 'user',
		sidebarVisible: true
	}
},
{
	path: '/place',
	exact: true,
	tag: Route,
	component: Place,
	meta: {
		name: 'Add a Place',
		icon: 'world',
		sidebarVisible: true
	}
},
{
	path: '/organization',
	exact: true,
	tag: Route,
	component: Organization,
	meta: {
		name: 'Add an Organization',
		icon: 'users',
		sidebarVisible: true
	}
},
{
	path: '/auth',
	exact: true,
	tag: Route,
	component: Login,
	meta: {
		name: 'Auth'
	}
},
// Find the way to add/remove routes conditionally
{
	tag: Route,
	component: NotFound,
	meta: {
		name: '404'
	}
},
{
	tag: Redirect,
	to: '/auth'
}]

const store = createStore(rootReducer)

const i18n = {
	messages: {},
	localeData: {},
	locale: 'en'
}

class App extends Component {
	render () {
		return (
			<IntlProvider
				key={i18n.locale}
				locale={i18n.locale}
				messages={defineMessages(i18n.messages)}
			>
				<Provider store={store} key={Date.now()}>
					<ThemeProvider theme={theme}>
						<Router>
							<AppC routes={routes}>
								<RoutingWrapper routes={getRouterRoutes(routes)} />
							</AppC>
						</Router>
					</ThemeProvider>
				</Provider>
			</IntlProvider>
		)
	}
}

export default App
