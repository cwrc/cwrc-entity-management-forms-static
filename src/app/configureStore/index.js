// @flow
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from '../../reducers'

const isPromise = value => value !== null && typeof value === 'object' && typeof value.then === 'function'

const showErrors = true

export default (initialState: Object, history: History) => {
	const middlewares = []

	// https://stackoverflow.com/a/44139604
	middlewares.push(() => next => action => {
		if (!isPromise(action.payload)) {
			return next(action)
		}

		if (!action.meta || !action.meta.localError) {
			return next(action).catch(error => {
				if (showErrors) {
					console.warn(`${action.type} unhandled rejection caught at middleware with reason: ${JSON.stringify(error.message)}.`)
				}
				return error
			})
		}
	})

	middlewares.push(thunk)
	middlewares.push(routerMiddleware(history))
	middlewares.push(promiseMiddleware())

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
