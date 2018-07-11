// @flow
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as reduxFormReducer} from 'redux-form'

import type {State as AuthState} from 'reducers/auth'
import type {State as LayoutState} from 'reducers/layout'
import type {State as EntityState} from 'reducers/entities'

import {layout} from './layout'
import {personGet, personPut, personPost, placeGet, placePut, placePost, organizationGet, organizationPost, organizationPut} from './entities'
import {auth} from './auth'

// Root reducer
export default combineReducers({
	layout,
	auth,
	entities: combineReducers({
		person: combineReducers({
			get: personGet,
			put: personPut,
			post: personPost
		}),
		place: combineReducers({
			get: placeGet,
			put: placePut,
			post: placePost
		}),
		organization: combineReducers({
			get: organizationGet,
			put: organizationPut,
			post: organizationPost
		})
	}),
	routing: routerReducer,
	form: reduxFormReducer
})

export type GlobalState = {layout: LayoutState} & {auth: AuthState} &
    {
        entities: {
            person: {
                get: EntityState,
                put: EntityState,
                post: EntityState
            },
            place: {
                get: EntityState,
                put: EntityState,
                post: EntityState
            },
            organization: {
                get: EntityState,
                put: EntityState,
                post: EntityState
            }
        }
    }
