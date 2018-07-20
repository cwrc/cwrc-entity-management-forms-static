// @flow
import React from 'react'
import {
	Header,
	Grid,
	Button,
	Icon,
	Segment,
	Popup
} from 'semantic-ui-react'
import {Field, FieldArray} from 'redux-form'
import {DropdownComponent} from './FormControls'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import {DateTimePicker} from 'react-widgets'
import EntityLookup from './EntityLookup'
import {required} from '../components/FieldValidation'

import 'react-widgets/dist/css/react-widgets.css'

Moment.locale('en')
momentLocalizer()

const dateQualifierOptions = [
	{key: '', text: '', value: ''},
	{key: 'when-iso', text: 'When', value: 'when-iso'},
	{key: 'from-iso', text: 'From', value: 'from-iso'},
	{key: 'to-iso', text: 'To', value: 'to-iso'},
	{key: 'notBefore-iso', text: 'Not before', value: 'notBefore-iso'},
	{key: 'notAfter-iso', text: 'Not after', value: 'notAfter-iso'}
]

const dateTypeOptions = [
	{key: '', text: '', value: ''},
	{key: 'birth', text: 'Birth', value: 'birth'},
	{key: 'death', text: 'Death', value: 'death'},
	{key: 'floruit', text: 'Floruit', value: 'floruit'}
]

const certaintyOptions = [
	{key: '', text: '', value: ''},
	{key: 'high', text: 'High', value: 'high'},
	{key: 'medium', text: 'Medium', value: 'medium'},
	{key: 'low', text: 'Low', value: 'low'},
	{key: 'unknown', text: 'Unknown', value: 'unknown'}
]

const DateRepeater = ({
	fieldArrayName,
	componentLabel,
	changeFunc,
	...rest
}: any) => {
	return (
		<FieldArray
			name={fieldArrayName}
			props={{componentLabel, changeFunc}}
			component={renderSegment}
			{...rest}
		/>
	)
}

const renderDatePicker = ({input: {onChange, value}, showTime = false}: any) => {
	if (value === '') {
		value = null
	} else {
		// handling for weird date stuff
		// see https://stackoverflow.com/a/31732581
		value = new Date(value.replace(/-/g, '/'))
	}
	return (
		<DateTimePicker
			onChange={onChange}
			value={value}
			min={new Date(-3000, 1, 1)}
			max={new Date(3000, 12, 31)}
			format='YYYY-MM-DD'
			placeholder='YYYY-MM-DD'
			time={showTime}
		/>
	)
}

const renderSegment = ({
	fields,
	headerLabel,
	componentLabel,
	changeFunc,
	meta: {touched, error, submitFailed},
	...rest
}: any) => (
	<Segment secondary>
		<Segment clearing basic style={{padding: 0}}>
			<Header as="h4" floated='left'>{headerLabel}</Header>
			<Button type="button" floated='right' size='tiny' color='olive' onClick={() => fields.push({isRange: true})}>
				<Icon name='plus' />Date Range
			</Button>
			<Button type="button" floated='right' size='tiny' color='olive' onClick={() => fields.push({isRange: false})}>
				<Icon name='plus' />Simple Date
			</Button>
		</Segment>
		{fields.map((name, index) => {
			const field = fields.get(index)
			let isRange = field.isRange
			if (isRange === undefined) {
				isRange = field.date1 !== undefined && field.date2 !== undefined
			}
			return (
				<Segment key={index}>
					<Grid columns='equal'>
						<Grid.Column>
							<Grid>
								<Grid.Row columns={2}>
									{!isRange &&
										<Grid.Column>
											<Field
												name={`${name}.date1`}
												component={renderDatePicker} />
											<Field
												required
												validate={[required]}
												label='Type'
												style={{marginTop: '1em'}}
												name={`${name}.type`}
												options={dateTypeOptions}
												placeholder='Date Type'
												component={DropdownComponent}/>
										</Grid.Column>
									}
									{!isRange &&
										<Grid.Column>
											<Field
												required
												validate={[required]}
												label='Qualifier'
												name={`${name}.qualifier1`}
												options={dateQualifierOptions}
												placeholder='Qualifier'
												component={DropdownComponent}/>
											<Field
												required
												validate={[required]}
												label='Certainty'
												name={`${name}.cert`}
												options={certaintyOptions}
												placeholder='Certainty'
												component={DropdownComponent}/>
										</Grid.Column>
									}
									{isRange &&
										<Grid.Column>
											<Field
												name={`${name}.date1`}
												component={renderDatePicker} />
											<Field
												required
												validate={[required]}
												label='Qualifier'
												style={{marginTop: '1em'}}
												name={`${name}.qualifier1`}
												options={dateQualifierOptions}
												placeholder='Qualifier'
												component={DropdownComponent}/>
											<Field
												required
												validate={[required]}
												label='Type'
												name={`${name}.type`}
												options={dateTypeOptions}
												placeholder='Date Type'
												component={DropdownComponent}/>
										</Grid.Column>
									}
									{isRange &&
										<Grid.Column>
											<Field
												name={`${name}.date2`}
												component={renderDatePicker} />
											<Field
												required
												validate={[required]}
												label='Qualifier'
												style={{marginTop: '1em'}}
												name={`${name}.qualifier2`}
												options={dateQualifierOptions}
												placeholder='Qualifier'
												component={DropdownComponent}/>
											<Field
												required
												validate={[required]}
												label='Certainty'
												name={`${name}.cert`}
												options={certaintyOptions}
												placeholder='Certainty'
												component={DropdownComponent}/>
										</Grid.Column>
									}
								</Grid.Row>
								<Grid.Row>
									<Grid.Column>
										<EntityLookup
											buttonLabel='Add Place'
											name={`${name}.place`}
											entityType='place'
											changeFunc={changeFunc}
											includeClear={true}
										/>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Grid.Column>
						<Grid.Column width={4} stretched>
							<Field
								name={`${name}.note`}
								component="textarea"
								placeholder="Note"/>
						</Grid.Column>
						<Grid.Column width={1}>
							<Popup size='tiny' position='right center' trigger={
								<Button type="button" floated="right" size='tiny' color='red' icon='minus' onClick={() => fields.remove(index)}/>
							} content={`Remove ${componentLabel}`} />
						</Grid.Column>
					</Grid>
				</Segment>
			)
		})}
	</Segment>
)

export default DateRepeater
