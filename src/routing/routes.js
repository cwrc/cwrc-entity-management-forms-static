// @flow
import React from 'react'
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
			path: '/',
			exact: true,
			tag: Route,
			component: Dashboard,
			meta: {
				icon: 'tasks',
				name: 'Dashboard',
				sidebarVisible: true
			}
		},
		{
			path: '/person',
			exact: true,
			tag: Route,
			component: Person,
			meta: {
				name: 'Add a Person',
				icon: 'user',
				sidebarVisible: true
			}
		},
		{
			path: '/place',
			exact: true,
			tag: Route,
			component: Place,
			meta: {
				name: 'Add a Place',
				icon: 'world',
				sidebarVisible: true
			}
		},
		{
			path: '/organization',
			exact: true,
			tag: Route,
			component: Organization,
			meta: {
				name: 'Add an Organization',
				icon: 'users',
				sidebarVisible: true
			}
		},
		// Find the way to add/remove routes conditionally
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
