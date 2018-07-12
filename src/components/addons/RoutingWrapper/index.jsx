/**
 * @flow
 */
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Switch} from 'react-router-dom'
import _ from 'lodash'
import type {RouteItem} from '../../../types'

type Props = {
	routesToRender: RouteItem[],
	routes: RouteItem[]
}

const RoutingWrapper = (props: Props) => {
	const {routesToRender} = props
	// render components that are inside Switch (main view)
	const routesRendered = routesToRender.map((a: RouteItem, i) => {
		// Get tag for Route.
		const Tag = a.tag
		return (
			<Tag
				key={i}
				{..._.pick(a, 'component', 'path', 'exact', 'strict', 'to')}
			/>
		)
	})

	return <Switch>{routesRendered}</Switch>
}

function mapStateToProps (state, props) {
	const {routes} = props
	const onlyRealRoutes = routes.filter(a => a.component)
	const onlyRedirects = routes.filter(a => a.to)
	const routesToRender = onlyRealRoutes.concat(onlyRedirects)

	return {
		routesToRender
	}
}

export default connect(mapStateToProps)(withRouter(RoutingWrapper))
