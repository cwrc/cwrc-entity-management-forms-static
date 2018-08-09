// @flow
import React from 'react'
import {render} from 'react-snapshot'

import {ThemeProvider} from 'styled-components'
import theme from './styles/theme'
import 'semantic-ui-css/semantic.css'
import './styles/global'

import {PageLayout, MainLayout, MainContent, MainContainer} from './containers/App/style'
import Footer from './components/parts/Footer'
import Header from './components/parts/Header'

import {createBrowserHistory} from 'history'

import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'

import RoutingWrapper from './components/addons/RoutingWrapper'
import {getRouterRoutes, getRoutes} from './routing'

import type {GlobalState} from './reducers'

import configureStore from './app/configureStore'

const initialState: GlobalState = window.__INITIAL_STATE__ || {}

const history = createBrowserHistory()

const store = configureStore(initialState, history)

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
