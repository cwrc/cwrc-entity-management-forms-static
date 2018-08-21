// @flow
import React from 'react'
import {
	Grid
} from 'semantic-ui-react'
import {Field} from 'redux-form'
import {InputField, DropdownAddableComponent} from './FormControls'
import {required} from './FieldValidation'

const NameParts = ({
	name,
	nameOptions
}: any) => (
	<Grid columns='equal'>
		<Grid.Row verticalAlign='middle'>
			<Grid.Column>
				<Field
					required
					validate={[required]}
					inline
					label='Name Part'
					name={`${name}.value`}
					placeholder='Name Part'
					component={InputField}
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{nameOptions === null
					? <Field
						name={`${name}.type`}
						label='Name Type'
						placeholder='Optional'
						inline
						component={InputField}
					/>
					: <Field
						required
						validate={[required]}
						name={`${name}.type`}
						options={nameOptions}
						label='Name Type'
						placeholder='Name Type'
						component={DropdownAddableComponent}
					/>
				}
			</Grid.Column>
		</Grid.Row>
	</Grid>
)

export default NameParts
