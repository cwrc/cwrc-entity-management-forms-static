// @flow
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {APPLICATION_INIT} from '../../../actions/common'
import {ThemeProvider} from 'styled-components'
import theme from '../../../styles/theme'
import App from '../../../containers/App'
import RoutingWrapper from '../../../components/addons/RoutingWrapper'
import {getRouterRoutes} from '../../../routing'
import type {RouteItem} from '../../../types'
import {ConnectedRouter} from 'react-router-redux'

const Router = ConnectedRouter

type Props = {
	store: Object,
	// SSR: {
	// 	location?: Object,
	// 	context?: Object
	// },
	history: any,
	routes: Array<RouteItem>
}

export default class Root extends Component<Props> {
	static defaultProps = {
		// SSR: {}
	}

	componentWillMount () {
		const {store} = this.props
		store.dispatch({type: APPLICATION_INIT})
	}

	render () {
		const {store, history, routes} = this.props
		const routerProps = {history}
		// key={Math.random()} = hack for HMR from https://github.com/webpack/webpack-dev-server/issues/395

		return (
			<Provider store={store} key={Date.now()}>
				<ThemeProvider theme={theme}>
					<Router {...routerProps}>
						<App routes={routes}>
							<RoutingWrapper routes={getRouterRoutes(routes)} />
						</App>
					</Router>
				</ThemeProvider>
			</Provider>
		)
	}
}
