// @flow
import React from 'react'
import OrganizationForm from './components/OrganizationForm.jsx'
import {Helmet} from 'react-helmet'

const OrganizationEdit = ({login, errors}: Props) => {
	return (
		<div>
			<Helmet>
				<title>CWRC: Organization Entity</title>
			</Helmet>
			<OrganizationForm />
		</div>
	)
}

export default OrganizationEdit
