// @flow
import 'semantic-ui-css/semantic.css'

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

import configureApp from './app/configureApp'
import configureRootComponent from './app/configureRoot'
import type {GlobalState} from 'reducers'
import type {i18nConfigObject} from 'types'

const initialState: GlobalState = window.__INITIAL_STATE__ || {}

const i18n: i18nConfigObject = window.__I18N__ || {}

const {store, routes, history} = configureApp(initialState)
const RootComponent = configureRootComponent({
	store,
	routes,
	history,
	i18n
})

class App extends Component {
	render () {
		return (
			RootComponent
		)
	}
}

export default App
