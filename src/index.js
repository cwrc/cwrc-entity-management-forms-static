// @flow
import 'semantic-ui-css/semantic.css'
import './styles/global'
import {
	PageLayout,
	MainLayout,
	MainContent,
	MainContainer
} from './containers/App/style'

// necessary?
// import 'babel-polyfill'

import React from 'react'
import {ThemeProvider} from 'styled-components'
import theme from './styles/theme'

import {createBrowserHistory} from 'history'

import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'

import RoutingWrapper from './components/addons/RoutingWrapper'
import {getRouterRoutes, getRoutes} from './routing'

import {render} from 'react-snapshot'

import type {GlobalState} from './reducers'
import rootReducer from './reducers'

import Footer from './components/parts/Footer'
import Header from './components/parts/Header'

const initialState: GlobalState = window.__INITIAL_STATE__ || {}

const history = createBrowserHistory()

const middlewares = [thunk, routerMiddleware(history), promiseMiddleware()]
const enhancers = middlewares.map(a => applyMiddleware(a))
const getComposeFunc = () => {
	return compose
}
const composeFunc = getComposeFunc()
const composedEnhancers = composeFunc.apply(null, enhancers)

const store = createStore(
	rootReducer,
	initialState,
	composedEnhancers
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
