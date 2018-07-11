// @flow
import React from 'react'
import {
	Form,
	Button,
	Segment,
	Popup
} from 'semantic-ui-react'
import {FieldArray} from 'redux-form'

const FieldRepeater = ({
	fieldArrayName,
	componentLabel,
	RepeatableComponent
}: any) => {
	return (
		<FieldArray
			name={fieldArrayName}
			props={{
				RepeatableComponent,
				componentLabel
			}}
			component={renderFields}
		/>
	)
}

const renderFields = ({
	fields,
	RepeatableComponent,
	componentLabel,
	meta: {touched, error, submitFailed}}: any
) => {
	if (fields.length === 0) fields.push({})
	return (
		(fields.map((field, index) => (
			<Segment key={index} secondary>
				<Form.Group inline>
					<RepeatableComponent field={field}/>
					{index === 0 &&
					<Popup size='tiny' position='right center' trigger={
						<Button floated='right' color="olive" type="button" size='mini' icon='plus' onClick={() => fields.push({})}/>
					} content={`Add ${componentLabel}`}/>
					}
					{index > 0 &&
					<Popup size='tiny' position='right center' trigger={
						<Button type="button" width="4" floated="right" size='mini' color='red' icon='minus' onClick={() => fields.remove(index)}/>
					} content={`Remove ${componentLabel}`}/>
					}
				</Form.Group>
			</Segment>
		)))
	)
}

export default FieldRepeater
