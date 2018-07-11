// @flow
import {createBrowserHistory, createMemoryHistory} from 'history'
const selectedHistory = process.env.BROWSER ? createBrowserHistory : createMemoryHistory

export const history = selectedHistory()
