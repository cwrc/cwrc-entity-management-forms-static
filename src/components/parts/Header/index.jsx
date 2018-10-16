/**
 * @flow
 */
import React from 'react'
import {connect} from 'react-redux'
import {withRouter, matchPath} from 'react-router'
import _ from 'lodash'
import {TOGGLE_SIDEBAR} from '../../../actions/layout'
import {
	StyledHeader,
	HeaderInner,
	PageTitle
} from './style'
import {Icon} from 'semantic-ui-react'
import {Spacer} from '../../../styles/base'
import {getMetaRoutes} from '../../../routing'
import {getLayoutMobileStatuses, getEntityId} from '../../../selectors'

type Props = {
	title: string,
	icon: string,
	isLoggedIn: boolean,
	isMobile: boolean
}

const Header = ({title, icon, isLoggedIn, isMobile}: Props) => {
	return (
		<StyledHeader>
			<HeaderInner>
				<PageTitle><Icon name={icon} size='large'/>&#160;{title}</PageTitle>
				<Spacer />
			</HeaderInner>
		</StyledHeader>
	)
}

const mapStateToProps = (state, props) => {
	const {location: {pathname}} = props
	const currentRoute = _.find(getMetaRoutes(), a => matchPath(pathname, a)) || {}
	if (currentRoute.meta === undefined) {
		console.warn("couldn't find current route!")
		currentRoute.meta = {
			name: 'Title'
		}
	}
	const entityId = getEntityId(state)
	let title
	if (entityId && currentRoute.meta.nameEdit) {
		title = currentRoute.meta.nameEdit
	} else {
		title = currentRoute.meta.name
	}
	const icon = currentRoute.meta.icon
	const {isMobile} = getLayoutMobileStatuses(state)
	return {
		title,
		icon,
		isMobile
	}
}

const mapDispatchToProps = dispatch => ({
	toggleSidebar () {
		dispatch(TOGGLE_SIDEBAR())
	}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
