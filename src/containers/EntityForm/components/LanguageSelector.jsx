// @flow
import React from 'react'
import {Field} from 'redux-form'
import {DropdownComponent} from './FormControls'

import langOptions from '../../../static/lang.js'

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
