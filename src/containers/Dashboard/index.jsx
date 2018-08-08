// @flow
import React from 'react'
import {Helmet} from 'react-helmet'
import {List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Dashboard = () => {
	return (
		<div>
			<Helmet>
				<title>CWRC Entity Management</title>
			</Helmet>
			<List>
				<List.Item as={Link} to='./person'>Create Person</List.Item>
				<List.Item as={Link} to='./place'>Create Place</List.Item>
				<List.Item as={Link} to='./organization'>Create Organization</List.Item>
			</List>
		</div>
	)
}

export default Dashboard
