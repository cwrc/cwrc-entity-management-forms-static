// @flow
import {createSelector} from 'reselect'
import type {State as AuthState} from 'reducers/auth'
import type {State as LayoutState} from 'reducers/layout'
import type {State as EntitiesLinksState} from 'reducers/links'
import type {GlobalState} from 'reducers'

export const getAuthState = (state: GlobalState): AuthState => state.auth
export const getLayoutState = (state: GlobalState): LayoutState => state.layout
export const getEntitiesLinksState = (state: GlobalState): EntitiesLinksState =>
	state.entities.links

export const getWindowInnerWidth = (window: Object): number => {
	const defaultWindowInnerWidth = 1025
	return window && window.innerWidth
		? window.innerWidth
		: defaultWindowInnerWidth
}

export const getLayoutMobileStatuses = createSelector(
	getLayoutState,
	({innerWidth}) => {
		const isMobile: boolean = innerWidth < 1025 // 1024px - breakpoint
		const isMobileXS: boolean = innerWidth < 481
		const isMobileSM: boolean = innerWidth > 480 && innerWidth < 767
		return {isMobileSM, isMobileXS, isMobile}
	}
)

const getUrlParameter = (search, name) => {
	name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
	var results = regex.exec(search)
	return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export const getEntityId = state => {
	return getUrlParameter(state.routing.location.search, 'entityId')
}

export const getCollectionId = state => {
	let search
	// can't figure out a good way to send state from CollectionsSvc so use window location instead
	if (state !== undefined) {
		search = state.routing.location.search
	} else {
		search = window.location.search
	}
	return getUrlParameter(search, 'collectionId')
}

export const isPersonPostDone =	state => state.entities.person.post.status === 'done'
export const isPersonPostPending = state => state.entities.person.post.status === 'pending'
export const isPersonPostError = state => state.entities.person.post.status === 'error'
export const getPersonPostError = state => state.entities.person.post.error
export const getPersonPostData = state => state.entities.person.post.data

export const isPersonGetDone =	state => state.entities.person.get.status === 'done'
export const isPersonGetPending = state => state.entities.person.get.status === 'pending'
export const isPersonGetError = state => state.entities.person.get.status === 'error'
export const getPersonGetError = state => state.entities.person.get.error
export const getPersonGetData = state => state.entities.person.get.data

export const isPersonPutDone =	state => state.entities.person.put.status === 'done'
export const isPersonPutPending = state => state.entities.person.put.status === 'pending'
export const isPersonPutError = state => state.entities.person.put.status === 'error'
export const getPersonPutError = state => state.entities.person.put.error
export const getPersonPutData = state => state.entities.person.put.data

export const isPlacePostDone =	state => state.entities.place.post.status === 'done'
export const isPlacePostPending = state => state.entities.place.post.status === 'pending'
export const isPlacePostError = state => state.entities.place.post.status === 'error'
export const getPlacePostError = state => state.entities.place.post.error
export const getPlacePostData = state => state.entities.place.post.data

export const isPlaceGetDone =	state => state.entities.place.get.status === 'done'
export const isPlaceGetPending = state => state.entities.place.get.status === 'pending'
export const isPlaceGetError = state => state.entities.place.get.status === 'error'
export const getPlaceGetError = state => state.entities.place.get.error
export const getPlaceGetData = state => state.entities.place.get.data

export const isPlacePutDone =	state => state.entities.place.put.status === 'done'
export const isPlacePutPending = state => state.entities.place.put.status === 'pending'
export const isPlacePutError = state => state.entities.place.put.status === 'error'
export const getPlacePutError = state => state.entities.place.put.error
export const getPlacePutData = state => state.entities.place.put.data

export const isOrganizationPostDone =	state => state.entities.organization.post.status === 'done'
export const isOrganizationPostPending = state => state.entities.organization.post.status === 'pending'
export const isOrganizationPostError = state => state.entities.organization.post.status === 'error'
export const getOrganizationPostError = state => state.entities.organization.post.error
export const getOrganizationPostData = state => state.entities.organization.post.data

export const isOrganizationGetDone =	state => state.entities.organization.get.status === 'done'
export const isOrganizationGetPending = state => state.entities.organization.get.status === 'pending'
export const isOrganizationGetError = state => state.entities.organization.get.status === 'error'
export const getOrganizationGetError = state => state.entities.organization.get.error
export const getOrganizationGetData = state => state.entities.organization.get.data

export const isOrganizationPutDone =	state => state.entities.organization.put.status === 'done'
export const isOrganizationPutPending = state => state.entities.organization.put.status === 'pending'
export const isOrganizationPutError = state => state.entities.organization.put.status === 'error'
export const getOrganizationPutError = state => state.entities.organization.put.error
export const getOrganizationPutData = state => state.entities.organization.put.data
