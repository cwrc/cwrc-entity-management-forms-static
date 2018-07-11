// @flow
import React from 'react'
import {Field} from 'redux-form'
import {DropdownComponent} from './FormControls'

const projectOptions = [
	{key: 'ww', text: 'Women Writers', value: 'ww'},
	{key: 'isicily', text: 'I.Sicily', value: 'isicily'},
	{key: 'smith', text: 'Smith', value: 'smith'}
]

const ProjectSelector = ({
	input,
	...rest
}: any) => (
	<Field
		{...input}
		{...rest}
		options={projectOptions}
		placeholder='Select Project'
		component={DropdownComponent}/>
)

export default ProjectSelector
