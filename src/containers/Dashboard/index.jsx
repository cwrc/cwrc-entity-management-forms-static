// @flow
import React from 'react'
import {Helmet} from 'react-helmet'
import {Grid, Header} from 'semantic-ui-react'

const Dashboard = () => {
	return (
		<div>
			<Helmet>
				<title>CWRC Dashboard</title>
			</Helmet>
			<Grid columns={1}>
				<Grid.Row centered>
					<Grid.Column width={16}>
						<Header as="h1">Entity Management</Header>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	)
}

export default Dashboard
