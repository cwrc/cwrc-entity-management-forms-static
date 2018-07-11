// @flow
import React from 'react'

import {connect} from 'react-redux'
import {Field, FormSection} from 'redux-form'

import {
	Grid,
	Button
} from 'semantic-ui-react'

import {DropdownComponent} from './FormControls'

import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'

import {DateTimePicker} from 'react-widgets'

import 'react-widgets/dist/css/react-widgets.css'

Moment.locale('en')
momentLocalizer()

const dateQualifierOptions = [
	{key: 'when-iso', text: 'When', value: 'when-iso'},
	{key: 'from-iso', text: 'From', value: 'from-iso'},
	{key: 'to-iso', text: 'To', value: 'to-iso'},
	{key: 'notBefore-iso', text: 'Not before', value: 'notBefore-iso'},
	{key: 'notAfter-iso', text: 'Not after', value: 'notAfter-iso'}
]

const dateTypeOptions = [
	{key: 'birth', text: 'Birth', value: 'birth'},
	{key: 'death', text: 'Death', value: 'death'},
	{key: 'floruit', text: 'Floruit', value: 'floruit'}
]

const certaintyOptions = [
	{key: 'high', text: 'High', value: 'high'},
	{key: 'medium', text: 'Medium', value: 'medium'},
	{key: 'low', text: 'Low', value: 'low'},
	{key: 'unknown', text: 'Unknown', value: 'unknown'}
]

class DateComponent extends FormSection<Props, State> {
	render () {
		const name = this.props.name
		const isRange = this.props.isRange
		const date1 = this.props.date1
		const date2 = this.props.date2
		return (
			<Grid>
				<Grid.Row>
					<Grid.Column>
						<Button.Group size='tiny'>
							<Button type='button' active={!isRange} onClick={this.handleDateTypeChange} value='simple'>Simple</Button>
							<Button type='button' active={isRange} onClick={this.handleDateTypeChange} value='range'>Range</Button>
						</Button.Group>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={6}>
						<Field
							name={`${name}.date1`}
							props={{
								value: !date1 ? null : new Date(date1),
								onChange: this.handleDateChange,
								format: 'YYYY MM DD',
								time: false
							}}
							component={DateTimePicker} />
						<Field
							required
							label='Qualifier'
							name={`${name}.qualifier1`}
							options={dateQualifierOptions}
							placeholder='Qualifier'
							component={DropdownComponent}/>
						{isRange &&
							<div>
								<Field
									name={`${name}.date2`}
									props={{
										value: !date2 ? null : new Date(date2),
										onChange: this.handleDateChange,
										format: 'YYYY MM DD',
										time: false
									}}
									component={DateTimePicker} />
								<Field
									required
									label='Qualifier'
									name={`${name}.qualifier2`}
									options={dateQualifierOptions}
									placeholder='Qualifier'
									component={DropdownComponent}/>
							</div>
						}
					</Grid.Column>
					<Grid.Column width={6}>
						<Field
							required
							label='Type'
							name={`${name}.type`}
							options={dateTypeOptions}
							placeholder='Date type'
							component={DropdownComponent}/>
						<Field
							label='Certainty'
							name={`${name}.cert`}
							options={certaintyOptions}
							placeholder='Certainty'
							component={DropdownComponent}/>
					</Grid.Column>
					<Grid.Column width={4}>
						<Field
							name={`${name}.note`}
							component="textarea"
							rows={3}
							placeholder="Note"/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(DateComponent)
