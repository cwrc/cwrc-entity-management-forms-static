// @flow
import React from 'react'
import PlaceForm from './components/PlaceForm.jsx'
import {Helmet} from 'react-helmet'

const PlaceEdit = ({login, errors}: Props) => {
	return (
		<div>
			<Helmet>
				<title>CWRC: Place Entity</title>
			</Helmet>
			<PlaceForm />
		</div>
	)
}

export default PlaceEdit
