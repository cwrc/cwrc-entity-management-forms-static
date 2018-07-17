// @flow
import React, {Component} from 'react'
import {
	Form,
	Header,
	Message,
	Grid,
	Button,
	Segment,
	Rail
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {reduxForm, Field, FieldArray} from 'redux-form'

import {InputField, DropdownComponent} from '../../components/FormControls'
import {DescriptiveNote, ProjectNote} from '../../components/CommonComponents'
import SegmentRepeater from '../../components/SegmentRepeater'
import DateRepeater from '../../components/DateRepeater'
import NameParts from '../../components/NameParts'
import VariantNames from '../../components/VariantNames'
import LanguageSelector from '../../components/LanguageSelector'
import EntityLookup from '../../components/EntityLookup'

import {required} from '../../components/FieldValidation'

import Values from '../../components/Values'

import type {FormProps} from 'redux-form'

const nameOptions = [
	{key: '', text: '', value: ''},
	{key: 'forename', text: 'Forename', value: 'forename'},
	{key: 'surname', text: 'Surname', value: 'surname'},
	{key: 'generational', text: 'Generational', value: 'generational'},
	{key: 'role', text: 'Role', value: 'role'}
]

const variantOptions = [
	{key: 'birth', text: 'birth', value: 'birth'},
	{key: 'married', text: 'married', value: 'married'},
	{key: 'indexed', text: 'indexed', value: 'indexed'},
	{key: 'pseudonym', text: 'pseudonym', value: 'pseudonym'},
	{key: 'nickname', text: 'nickname', value: 'nickname'},
	{key: 'religious', text: 'religious', value: 'religious'},
	{key: 'royal', text: 'royal', value: 'royal'},
	{key: 'self-constructed', text: 'self-constructed', value: 'self-constructed'},
	{key: 'styled', text: 'styled', value: 'styled'},
	{key: 'titled', text: 'titled', value: 'titled'},
	{key: 'orlando_standard', text: 'orlando standard', value: 'orlando_standard'},
	{key: 'descriptive', text: 'descriptive', value: 'descriptive'},
	{key: 'popular', text: 'popular', value: 'popular'},
	{key: 'acronym', text: 'acronym', value: 'acronym'},
	{key: 'alternate', text: 'alternate', value: 'alternate'},
	{key: 'deprecated', text: 'deprecated', value: 'deprecated'},
	{key: 'historic', text: 'historic', value: 'historic'}
]

const factualityOptions = [
	{key: '', text: '', value: ''},
	{key: 'real', text: 'Real', value: 'real'},
	{key: 'fake', text: 'Fake', value: 'fake'}
]

const orgTypeOptions = [
	{key: '', text: '', value: ''}
]

const certaintyOptions = [
	{key: '', text: '', value: ''},
	{key: 'high', text: 'High', value: 'high'},
	{key: 'medium', text: 'Medium', value: 'medium'},
	{key: 'low', text: 'Low', value: 'low'},
	{key: 'unknown', text: 'Unknown', value: 'unknown'}
]

type Props = FormProps

class OrganizationComponent extends Component<Props, State> {
	render () {
		const NamePanels = [
			{
				title: 'Standard Name',
				key: 'standardNamePanel',
				content: (
					<Segment>
						<Field
							required
							validate={[required]}
							placeholder="e.g. Last Name, First Name (for indexing purposes)"
							name="identity.standardName"
							label="Standard Name"
							component={InputField}
						/>
						<Segment basic>
							<Header as="h4">Components</Header>
							<LanguageSelector label="Language" name="identity.namePartsLang"/>
							<FieldArray name="identity.nameParts" component={NameParts} nameOptions={nameOptions}/>
						</Segment>
					</Segment>
				)
			},
			{
				title: 'Variant Name(s)',
				key: 'variantPanel',
				content: (
					<SegmentRepeater
						fieldArrayName="identity.variants"
						headerLabel="Variant Name(s)"
						componentLabel="Variant Name"
						RepeatableComponent={VariantNames}
						nameOptions={nameOptions}
						variantOptions={variantOptions}
					/>
				)
			},
			{
				title: 'Same As',
				key: 'sameAsPanel',
				content: (
					<SegmentRepeater
						fieldArrayName="identity.sameAs"
						headerLabel="Same As"
						componentLabel="Same As"
						RepeatableComponent={EntityLookup}
						buttonLabel='Add Place'
						includeCertainty={true}
						certaintyOptions={certaintyOptions}
						entityType='place'
						changeFunc={this.props.change}
					/>
				)
			}
		]

		const DescriptionPanels = [
			{
				title: 'Important Date(s)',
				key: 'datePanel',
				content: (
					<DateRepeater
						fieldArrayName="description.dates"
						headerLabel="Important Date(s)"
						componentLabel="Date"
						changeFunc={this.props.change}
					/>
				)
			},
			{
				title: 'Properties',
				key: 'propPanel',
				content: (
					<Segment.Group>
						<Segment><Header as='h4'>Properties</Header></Segment>
						<Segment>
							<Grid columns='equal'>
								<Grid.Column>
									<Field
										label="Factuality"
										name="description.properties.factuality.value"
										placeholder="Factuality"
										options={factualityOptions}
										component={DropdownComponent}
									/>
								</Grid.Column>
								<Grid.Column>
									<Field
										label='Certainty'
										name='description.properties.factuality.cert'
										placeholder='Certainty'
										options={certaintyOptions}
										component={DropdownComponent}/>
								</Grid.Column>
							</Grid>
						</Segment>
						<Segment>
							<Grid columns='equal'>
								<Grid.Column>
									<Field
										label="Organization Type"
										name="description.properties.orgType.value"
										placeholder="Organization Type"
										options={orgTypeOptions}
										component={DropdownComponent}
									/>
								</Grid.Column>
								<Grid.Column>
									<Field
										label='Certainty'
										name='description.properties.orgType.cert'
										placeholder='Certainty'
										options={certaintyOptions}
										component={DropdownComponent}/>
								</Grid.Column>
							</Grid>
						</Segment>
					</Segment.Group>
				)
			},
			{
				title: 'General Description(s)',
				key: 'genNotePanel',
				content: (
					<SegmentRepeater
						fieldArrayName="description.descriptiveNote"
						headerLabel="General Description(s)"
						componentLabel="Description"
						RepeatableComponent={DescriptiveNote}
					/>
				)
			},
			{
				title: 'Project-Specific Note(s)',
				key: 'projNotePanel',
				content: (
					<SegmentRepeater
						fieldArrayName="description.projectNote"
						headerLabel="Project-Specific Note(s)"
						componentLabel="Note"
						RepeatableComponent={ProjectNote}
					/>
				)
			}
		]

		const {handleSubmit, invalid, submitting} = this.props

		return (
			<Segment basic>
				{/* <Rail attached position='left' size='tiny'>
					<Values form='ORG_FORM'/>
				</Rail> */}
				<Form onSubmit={handleSubmit} error={invalid}>
					<Header as="h2">Identity</Header>

					<Segment.Group>
						{NamePanels.map((panel, index) => (
							<Segment basic key={panel.key}>{panel.content}</Segment>
						))}
					</Segment.Group>

					<Header as="h2">Description</Header>

					<Segment.Group>
						{DescriptionPanels.map((panel, index) => (
							<Segment basic key={panel.key}>{panel.content}</Segment>
						))}
					</Segment.Group>

					<Header as="h2">Sources</Header>
					{/* <Segment> */}
					<SegmentRepeater
						fieldArrayName="sources.bibl"
						headerLabel=""
						componentLabel="Source"
						RepeatableComponent={EntityLookup}
						buttonLabel='Add Source'
						entityType='title'
						changeFunc={this.props.change}
					/>
					{/* </Segment> */}

					<Field key="non_field_errors"
						name="non_field_errors"
						component={({meta: {error}}) => {
							return error ? (
								<Message error>
									<Message.Header>{'Login failed :('}</Message.Header>
									<p>{error}</p>
								</Message>
							) : null
						}}
					/>

					<div style={{textAlign: 'center'}}>
						<Button content="Submit" icon="sign in" loading={submitting}/>
					</div>
				</Form>
			</Segment>
		)
	}
}

const onSubmit = (values, dispatch) => {
	console.log(values)
	// dispatch()
}

const validate = values => {
	const errors = {}
	return errors
}

// i.e. model -> view
const mapStateToProps = state => ({
	// initialValues: {}
})

// i.e. controller -> model
const mapDispatchToProps = dispatch => ({})

const reduxFormConfig = reduxForm({
	form: 'ORG_FORM',
	validate,
	onSubmit
})

export default reduxFormConfig(
	connect(mapStateToProps, mapDispatchToProps)(OrganizationComponent)
)
