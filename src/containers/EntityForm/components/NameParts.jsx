// @flow
import React from 'react'
import {
	Grid,
	Button,
	Popup
} from 'semantic-ui-react'
import {Field} from 'redux-form'
import {InputField, DropdownAddableComponent} from './FormControls'

const NameParts = ({
	fields,
	name,
	nameOptions,
	meta: {touched, error, submitFailed}
}: any) => {
	if (fields.length === 0) fields.push({})
	return (
		<Grid columns='equal'>
			{fields.map((nameComponent, index) => (
				<Grid.Row key={index} verticalAlign='middle'>
					<Grid.Column>
						<Field
							name={`${nameComponent}.value`}
							placeholder='Name'
							component={InputField}
						/>
					</Grid.Column>
					<Grid.Column width={6}>
						<Field
							name={`${nameComponent}.type`}
							options={nameOptions}
							label='Name Type'
							placeholder='Name Type'
							component={DropdownAddableComponent}
						/>
					</Grid.Column>
					<Grid.Column width={1}>
						{index === 0 &&
						<Popup size='tiny' position='right center' trigger={
							<Button type="button" size='tiny' color='olive' icon='plus' onClick={() => fields.push({})}/>
						} content='Add a Name Part'/>
						}
						{index > 0 &&
						<Popup size='tiny' position='right center' trigger={
							<Button type="button" size='tiny' color='red' icon='minus' onClick={() => fields.remove(index)}/>
						} content='Remove Name Part'/>
						}
					</Grid.Column>
				</Grid.Row>
			))}
		</Grid>
	)
}

export default NameParts
