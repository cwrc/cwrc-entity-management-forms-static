// @flow
import React from 'react'
import {Field} from 'redux-form'
import {DropdownComponent} from './FormControls'

import iso6392 from 'iso-639-2'

const langOptions = iso6392.map(lang => {
	const isoVal = lang.iso6392T === null ? lang.iso6392B : lang.iso6392T
	return {
		text: lang.name,
		value: isoVal,
		key: isoVal
	}
})

const LanguageSelector = ({
	input,
	...rest
}: any) => (
	<Field
		{...input}
		{...rest}
		search
		scrolling
		options={langOptions}
		placeholder='Select Language'
		component={DropdownComponent}/>
)

export default LanguageSelector
