/**
 * @flow
 */
import React from 'react'
import {connect} from 'react-redux'
import {Icon} from 'semantic-ui-react'
import {withRouter, matchPath} from 'react-router'
import _ from 'lodash'
import {TOGGLE_SIDEBAR} from '../../../actions/layout'
import {
	StyledHeader,
	HeaderInner,
	Navicon,
	PageTitle
} from './style'
import {Spacer} from '../../../styles/base'
import {getMetaRoutes} from '../../../routing'
import {getLayoutMobileStatuses} from '../../../selectors'
import Headroom from 'react-headroom'

type Props = {
	title: string,
	toggleSidebar: () => void,
	isLoggedIn: boolean,
	isMobile: boolean
}

const Header = ({title, toggleSidebar, isLoggedIn, isMobile}: Props) => {
	return (
		<Headroom>
			<StyledHeader>
				<HeaderInner>
					{isLoggedIn &&
						isMobile && (
						<Navicon onClick={toggleSidebar}>
							<Icon name="content" />
						</Navicon>
					)}
					<PageTitle>{title}</PageTitle>
					<Spacer />
				</HeaderInner>
			</StyledHeader>
		</Headroom>
	)
}

const mapStateToProps = (state, props) => {
	const {location: {pathname}} = props
	const currentRoute = _.find(getMetaRoutes(), a => matchPath(pathname, a)) || {}
	if (currentRoute.meta === undefined) {
		currentRoute.meta = {
			name: 'Title'
		}
	}
	const title = currentRoute.meta.name
	const {isMobile} = getLayoutMobileStatuses(state)
	return {
		title,
		isMobile
	}
}

const mapDispatchToProps = dispatch => ({
	toggleSidebar () {
		dispatch(TOGGLE_SIDEBAR())
	}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
