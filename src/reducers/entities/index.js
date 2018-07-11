// @flow
import typeToReducer from 'type-to-reducer'
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'

export type State = {
    status: 'none' | 'pending' | 'done' | 'error',
    error: Object,
    data: Object
}

const initialState : State = {
	status: 'none',
	error: null,
	data: null
}

const PERSON_POST_TYPE = 'PERSON_POST'
const PERSON_PUT_TYPE = 'PERSON_PUT'
const PERSON_GET_TYPE = 'PERSON_GET'

const PLACE_POST_TYPE = 'PLACE_POST'
const PLACE_GET_TYPE = 'PLACE_GET'
const PLACE_PUT_TYPE = 'PLACE_PUT'

const ORGANIZATION_POST_TYPE = 'ORGANIZATION_POST'
const ORGANIZATION_GET_TYPE = 'ORGANIZATION_GET'
const ORGANIZATION_PUT_TYPE = 'ORGANIZATION_PUT'

const promiseReducers = {
	[PENDING]: () => ({...initialState, status: 'pending'}),
	[REJECTED]: (state, action) => ({...initialState, status: 'error', error: action.payload}),
	[FULFILLED]: (state, action) => ({...initialState, status: 'done', data: action.payload})
}

export const personGet = typeToReducer({
	[ PERSON_GET_TYPE ]: promiseReducers
}, initialState)

export const personPut = typeToReducer({
	[ PERSON_PUT_TYPE ]: promiseReducers
}, initialState)

export const personPost = typeToReducer({
	[ PERSON_POST_TYPE ]: promiseReducers
}, initialState)

export const placeGet = typeToReducer({
	[ PLACE_GET_TYPE ]: promiseReducers
}, initialState)

export const placePut = typeToReducer({
	[ PLACE_PUT_TYPE ]: promiseReducers
}, initialState)

export const placePost = typeToReducer({
	[ PLACE_POST_TYPE ]: promiseReducers
}, initialState)

export const organizationGet = typeToReducer({
	[ ORGANIZATION_GET_TYPE ]: promiseReducers
}, initialState)

export const organizationPut = typeToReducer({
	[ ORGANIZATION_PUT_TYPE ]: promiseReducers
}, initialState)

export const organizationPost = typeToReducer({
	[ ORGANIZATION_POST_TYPE ]: promiseReducers
}, initialState)
