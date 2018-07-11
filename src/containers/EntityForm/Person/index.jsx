// @flow
import React from 'react'
import PersonForm from './components/PersonForm.jsx'
import {Helmet} from 'react-helmet'

const PersonEdit = ({login, errors}: Props) => {
	return (
		<div>
			<Helmet>
				<title>CWRC: Person Entity</title>
			</Helmet>
			<PersonForm />
		</div>
	)
}

export default PersonEdit
