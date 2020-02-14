/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
// Import main views
import Sidebar from '../../components/parts/Sidebar'
import Footer from '../../components/parts/Footer'
import Header from '../../components/parts/Header'
// Import actions
import {TOGGLE_SIDEBAR, WINDOW_RESIZE} from '../../actions/layout'
import {getLayoutState, getWindowInnerWidth, getLayoutMobileStatuses} from '../../selectors'

// Import styled components
import {
	PageLayout,
	MainLayout,
	MainContent,
	SidebarSemanticPusherStyled,
	SidebarSemanticPushableStyled,
	MainContainer,
	StyledDimmer
} from './style'
import type {RouteItem} from '../../types'
import type {GlobalState} from '../../reducers'

type Props = {
	children: React$Node,
	// Routes of app passed as props in `Root`
	routes: Array<RouteItem>,
	// React-router `withRouter` props
	location: any,
	history: any,
	// SidebarOpened can force component to re-render
	sidebarOpened: boolean,
	toggleSidebar: Function,
	handleWindowResize: Function,
	// IsMobile can force component to re-render
	isMobile: boolean
}

class App extends Component <Props> {
	componentWillMount () {
		if (process.env.BROWSER) {
			const {handleWindowResize} = this.props
			handleWindowResize()
			window.addEventListener('resize', handleWindowResize)
		}
	}

	componentDidMount () {
	}

	render () {
		const {
			children,
			sidebarOpened,
			toggleSidebar,
			isMobile
		} = this.props

		const dimmerProps = {
			active: sidebarOpened,
			page: true,
			onClick: toggleSidebar
		}
		/** NOTE: There is an issue with props and styled-components,
			So we use custom attributes and handle them inside styled component
			{@link: https://github.com/styled-components/styled-components/issues/439}
		*/

		return (
			<PageLayout>
				<SidebarSemanticPushableStyled>
					<Sidebar />
					<SidebarSemanticPusherStyled
						isloggedin='1'
						ismobile={isMobile ? '1' : ''}
					>
						<StyledDimmer {...dimmerProps} />
						<Header />
						<MainLayout>
							<MainContent>
								<MainContainer>{children}</MainContainer>
								<Footer />
							</MainContent>
						</MainLayout>
					</SidebarSemanticPusherStyled>
				</SidebarSemanticPushableStyled>
			</PageLayout>
		)
	}
}

function mapStateToProps (state: GlobalState) {
	const {sidebarOpened} = getLayoutState(state)
	const {isMobile} = getLayoutMobileStatuses(state)

	return {
		sidebarOpened,
		isMobile
	}
}

function mapDispatchToProps (dispatch) {
	let resizer
	return {
		toggleSidebar () {
			dispatch(TOGGLE_SIDEBAR())
		},
		handleWindowResize () {
			clearTimeout(resizer)
			const innerWidth: number = getWindowInnerWidth(window)
			resizer = setTimeout(() => dispatch(WINDOW_RESIZE(innerWidth)), 100)
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
