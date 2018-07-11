/**
 * @flow
 */
import React from 'react'
import {Grid, Header} from 'semantic-ui-react'
// import Logo from 'components/elements/Logo'
import {StyledFooter, StyledFooterInner} from './style'

const Footer = () => {
	return (
		<StyledFooter>
			<StyledFooterInner>
				<Grid relaxed>
					<Grid.Row verticalAlign="middle">
						<Grid.Column width={12} mobile={16}>
							<a href="https://cwrc.ca">
								<Header as="h3" inverted>
									{/* <Logo white={true} /> */}
									<Header.Content>
										CWRC / CSÉC
										<Header.Subheader>
											Canadian Writing Research Collaboratory
										</Header.Subheader>
									</Header.Content>
								</Header>
							</a>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</StyledFooterInner>
		</StyledFooter>
	)
}

export default Footer
