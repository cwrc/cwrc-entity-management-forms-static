// @flow
import React from 'react'
import {
	Grid
} from 'semantic-ui-react'
import {Field} from 'redux-form'
import {InputField, DropdownAddableComponent} from './FormControls'

const NameParts = ({
	name,
	nameOptions
}: any) => (
	<Grid columns='equal'>
		<Grid.Row verticalAlign='middle'>
			<Grid.Column>
				<Field
					name={`${name}.value`}
					placeholder='Name'
					component={InputField}
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				<Field
					name={`${name}.type`}
					options={nameOptions}
					label='Name Type'
					placeholder='Name Type'
					component={DropdownAddableComponent}
				/>
			</Grid.Column>
		</Grid.Row>
	</Grid>
)

export default NameParts
