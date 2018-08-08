// @flow
import 'semantic-ui-css/semantic.css'
import './styles/global'
import {
	PageLayout,
	MainLayout,
	MainContent,
	MainContainer,
	StyledDimmer
} from './containers/App/style'

// necessary?
// import 'babel-polyfill'

import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import {ThemeProvider} from 'styled-components'
import theme from './styles/theme'

import {createBrowserHistory} from 'history'
import {Route} from 'react-router-dom'

import {
	ConnectedRouter,
	routerMiddleware
} from 'react-router-redux'

import RoutingWrapper from './components/addons/RoutingWrapper'
import {getRouterRoutes, getRoutes} from './routing'

import { render } from 'react-snapshot'

import type {GlobalState} from './reducers'
import rootReducer from './reducers'

import Footer from './components/parts/Footer'
import Header from './components/parts/Header'

import Dashboard from './containers/Dashboard'
import Person from './containers/EntityForm/Person'
import Place from './containers/EntityForm/Place'
import Organization from './containers/EntityForm/Organization'

const initialState: GlobalState = window.__INITIAL_STATE__ || {}

const history = createBrowserHistory()

const middleware = routerMiddleware(history)

const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(middleware)
)

console.log('__INITIAL_STATE__:', initialState)
render(
	<Provider store={store} key={Date.now()}>
		<ThemeProvider theme={theme}>
			<ConnectedRouter history={history}>
				<PageLayout>
					<Header />
					<MainLayout>
						<MainContent>
							<MainContainer>
								<RoutingWrapper routes={getRouterRoutes(getRoutes())} />
							</MainContainer>
							<Footer />
						</MainContent>
					</MainLayout>
				</PageLayout>
			</ConnectedRouter>
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
)
