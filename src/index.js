// @flow
import 'semantic-ui-css/semantic.css'

// necessary?
import 'babel-polyfill'

// Application
import React from 'react'
import { render } from 'react-snapshot'

import configureApp from './app/configureApp'
import configureRootComponent from './app/configureRoot'

import type {GlobalState} from './reducers'

const initialState: GlobalState = window.__INITIAL_STATE__ || {}

const {store, routes, history} = configureApp(initialState)
const RootComponent = configureRootComponent({
	store,
	routes,
	history
})

console.log('__INITIAL_STATE__:', initialState)
render(RootComponent, document.getElementById('root'))
