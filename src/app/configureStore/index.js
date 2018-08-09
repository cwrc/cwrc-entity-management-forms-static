// @flow
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from '../../reducers'

export default (initialState: Object, history: History) => {
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

	return store
}
