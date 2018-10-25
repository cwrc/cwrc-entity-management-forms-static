// @flow
import {Route, Redirect} from 'react-router-dom'
import _ from 'lodash'

import Dashboard from '../containers/Dashboard'
import NotFound from '../containers/NotFound'

import Person from '../containers/EntityForm/Person'
import Place from '../containers/EntityForm/Place'
import Organization from '../containers/EntityForm/Organization'

import type {RouteItem} from 'types'

function routingFnCreator (useFor: 'sidebar' | 'routing' | 'meta' | 'all' = 'all') {
	const sidebarExternalLinks = [
		// {
		// 	external: true,
		// 	path: 'http://cwrc.ca',
		// 	meta: {
		// 		sidebarVisible: true,
		// 		icon: 'home',
		// 		name: 'CWRC'
		// 	}
		// }
	]

	const routes: Array<RouteItem> = [
		{
			path: '/sites/default/libraries/cwrc-entity-management-forms-static/build/',
			exact: true,
			tag: Route,
			component: Dashboard,
			meta: {
				icon: 'tasks',
				name: 'Dashboard'
			}
		},
		{
			path: '/sites/default/libraries/cwrc-entity-management-forms-static/build/person',
			exact: false,
			tag: Route,
			component: Person,
			meta: {
				name: 'Add a Person',
				nameEdit: 'Edit a Person',
				icon: 'user'
			}
		},
		{
			path: '/sites/default/libraries/cwrc-entity-management-forms-static/build/place',
			exact: false,
			tag: Route,
			component: Place,
			meta: {
				name: 'Add a Place',
				nameEdit: 'Edit a Place',
				icon: 'world'
			}
		},
		{
			path: '/sites/default/libraries/cwrc-entity-management-forms-static/build/organization',
			exact: false,
			tag: Route,
			component: Organization,
			meta: {
				name: 'Add an Organization',
				nameEdit: 'Edit an Organization',
				icon: 'users'
			}
		}
		// Find the way to add/remove routes conditionally
/*
		{
			tag: Route,
			component: NotFound,
			meta: {
				name: '404'
			}
		},
		{
			tag: Redirect,
			to: '/'
		}
*/
	]

	const fns = {
		// Returns routing for sidebar menu
		sidebar (x: Array<RouteItem> = routes.concat(sidebarExternalLinks)) {
			return x
				.filter(a => a.meta && a.meta.sidebarVisible)
				.map(a => _.pick(a, ['path', 'meta', 'external', 'strict', 'exact']))
		},
		// Returns routing for React-Router
		routing (x: Array<RouteItem> = routes) {
			return x
				.filter(a => a.tag)
				.map(a =>
					_.pick(a, [
						'path',
						'strict',
						'exact',
						'component',
						'tag',
						'to'
					])
				)
		},
		// Returns `meta` + path. used in Header
		meta (x: Array<RouteItem> = routes) {
			return x
				.filter(a => a.tag)
				.map(a =>
					_.pick(a, [
						'path',
						'strict',
						'exact',
						'meta'
					])
				)
		},
		all () {
			return routes
		}
	}

	return fns[useFor]
}

export const getRoutes = routingFnCreator()
export const getMetaRoutes = routingFnCreator('meta')
export const getSidebarRoutes = routingFnCreator('sidebar')
export const getRouterRoutes = routingFnCreator('routing')
