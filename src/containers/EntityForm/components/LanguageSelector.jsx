// @flow
import React from 'react'
import {Field} from 'redux-form'
import {DropdownComponent} from './FormControls'
import _ from 'lodash'

import iso6392 from 'iso-639-2'

const langOptions = iso6392.map(lang => {
	const isoVal = lang.iso6392T === null ? lang.iso6392B : lang.iso6392T
	return {
		text: lang.name,
		value: isoVal,
		key: isoVal
	}
})

langOptions.sort((a, b) => {
	if (a.text > b.text) {
		return 1
	}
	if (a.text < b.text) {
		return -1
	}
	return 0
})

const langSearch = (options: array, query: string) => {
	const re = new RegExp('^' + _.escapeRegExp(query), 'i')
	let filteredOptions = _.filter(options, opt =>
		re.test(opt.text)
	)
	return filteredOptions
}

const LanguageSelector = ({
	input,
	...rest
}: any) => (
	<Field
		{...input}
		{...rest}
		search={langSearch}
		scrolling
		options={langOptions}
		placeholder='Optional'
		component={DropdownComponent}/>
)

export default LanguageSelector
