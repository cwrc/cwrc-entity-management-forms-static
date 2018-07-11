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
import type {i18nConfigObject} from './types'

const initialState: GlobalState = window.__INITIAL_STATE__ || {}

const i18n: i18nConfigObject = window.__I18N__ || {}

const {store, routes, history} = configureApp(initialState)
const RootComponent = configureRootComponent({
	store,
	routes,
	history,
	i18n
})

console.log('__INITIAL_STATE__:', initialState)
render(RootComponent, document.getElementById('root'))
