// @flow
import React, {Component} from 'react'
import {
	Form,
	Header,
	Message,
	Grid,
	Button,
	Segment,
	Dimmer,
	Loader
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {
	reduxForm,
	getFormInitialValues,
	initialize,
	Field,
	FieldArray
} from 'redux-form'

import {InputField, DropdownComponent} from '../../components/FormControls'
import {DescriptiveNote, ProjectNote} from '../../components/CommonComponents'
import SegmentRepeater from '../../components/SegmentRepeater'
import DateRepeater from '../../components/DateRepeater'
import NameParts from '../../components/NameParts'
import VariantNames from '../../components/VariantNames'
import LanguageSelector from '../../components/LanguageSelector'
import EntityLookup from '../../components/EntityLookup'
import MessageDialog from '../../components/MessageDialog'

import {required} from '../../components/FieldValidation'

import type {FormProps} from 'redux-form'

import {isPersonPostDone,
	isPersonPostPending,
	isPersonPostError,
	getPersonPostError,
	getPersonPostData,

	isPersonGetDone,
	isPersonGetPending,
	isPersonGetError,
	getPersonGetError,
	getPersonGetData,

	isPersonPutDone,
	isPersonPutPending,
	isPersonPutError,
	getPersonPutError,
	getPersonPutData} from '../../../../selectors'

import {GET_PERSON, PUT_PERSON, POST_PERSON} from '../../../../actions/entities'

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

const certaintyOptions = [
	{key: '', text: '', value: ''},
	{key: 'high', text: 'High', value: 'high'},
	{key: 'medium', text: 'Medium', value: 'medium'},
	{key: 'low', text: 'Low', value: 'low'},
	{key: 'unknown', text: 'Unknown', value: 'unknown'}
]

const genderOptions = [
	{key: '', text: '', value: ''},
	{key: 'cisgender', text: 'cisgender', value: 'cisgender'},
	{key: 'ciswoman', text: 'ciswoman', value: 'ciswoman'},
	{key: 'cisman', text: 'cisman', value: 'cisman'},
	{key: 'woman', text: 'woman', value: 'woman'},
	{key: 'man', text: 'man', value: 'man'},
	{key: 'transgender', text: 'transgender', value: 'transgender'},
	{key: 'transwoman', text: 'transwoman', value: 'transwoman'},
	{key: 'transman', text: 'transman', value: 'transman'},
	{key: 'androgynous', text: 'androgynous', value: 'androgynous'},
	{key: 'genderqueer', text: 'genderqueer', value: 'genderqueer'},
	{key: 'genderselfreported', text: 'genderselfreported', value: 'genderselfreported'}
]

type Props = FormProps

class PersonComponent extends Component<Props, State> {
	resetForm = () => {
		this.props.dispatch(initialize('PERSON_FORM', {}))
	}

	doSampleLoad = () => {
		// let json = xml2json(samplePersonDoc)
		// this.props.dispatch(initialize('PERSON_FORM', json))
	}

	testGet = () => {
		console.log('triggered the testGet')
		this.props.getPerson('cwrc:d47d3302-b566-478f-a53f-dd433c4ed648')
		// AFTER THE GET IS ISSUE, THE STATE WILL GO THROUGH AT LEAST TWO CHANGES:
		// 1. WHEN THE CALL IS ISSUED, THE STATE AT state.entities.person.get.status changes to 'pending' from 'none'
		// 2. after the call returns, that status changes to either 'done' or 'error'.  If 'done' then state.entities.person.get.data
		//    has the returned data.  if 'error', then data has the error.
		// To get the values from the state, use the selectors that I've mapped to props below in mapStateToProps.
	}

	render () {
		const NationalityComponent = ({name}) => (
			<div>
				<Grid verticalAlign='middle' columns='equal'>
					<Grid.Column>
						<Field
							inline
							label="Nationality"
							name={`${name}.value`}
							placeholder="Nationality"
							component={InputField}
						/>
					</Grid.Column>
					<Grid.Column>
						<Field
							label='Certainty'
							name={`${name}.cert`}
							placeholder='Certainty'
							options={certaintyOptions}
							component={DropdownComponent}/>
					</Grid.Column>
				</Grid>
			</div>
		)

		const OccupationComponent = ({name}) => (
			<div>
				<Grid verticalAlign='middle' columns='equal'>
					<Grid.Column>
						<Field
							inline
							label="Occupation"
							name={`${name}.value`}
							placeholder="Occupation"
							component={InputField}
						/>
					</Grid.Column>
					<Grid.Column>
						<Field
							label='Certainty'
							name={`${name}.cert`}
							placeholder='Certainty'
							options={certaintyOptions}
							component={DropdownComponent}/>
					</Grid.Column>
				</Grid>
			</div>
		)

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
						buttonLabel='Add Person'
						includeCertainty={true}
						certaintyOptions={certaintyOptions}
						entityType='person'
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
							<Field
								label="Gender"
								name="description.properties.gender"
								placeholder="Gender"
								multiple
								scrolling
								options={genderOptions}
								component={DropdownComponent}
							/>
						</Segment>
						<SegmentRepeater
							fieldArrayName="description.properties.nationality"
							headerLabel="Nationality"
							componentLabel="Nationality"
							RepeatableComponent={NationalityComponent}
						/>
						<SegmentRepeater
							fieldArrayName="description.properties.occupation"
							headerLabel="Occupation"
							componentLabel="Occupation"
							RepeatableComponent={OccupationComponent}
						/>
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
				{this.props.isPersonPostDone ? (
					<MessageDialog
						header="Entity Created!"
						content={<p>New entity: <a href={process.env.REACT_APP_ENTITIES_HOST + '/islandora/object/' + this.props.getPersonPostData.data.pid + '/manage/datastreams'} target="_blank" rel="noopener noreferrer">{this.props.getPersonPostData.data.pid}</a></p>}
						onClose={this.resetForm}
					/>
				) : ''}
				{this.props.isPersonGetPending ? (
					<Dimmer active inverted>
						<Loader inverted>Loading Person</Loader>
					</Dimmer>
				) : ''}
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
					<SegmentRepeater
						fieldArrayName="sources.bibl"
						headerLabel=""
						componentLabel="Source"
						RepeatableComponent={EntityLookup}
						buttonLabel='Add Source'
						entityType='title'
						changeFunc={this.props.change}
					/>

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
						{/* <Button type="button" content="Load Sample Person (local)" icon="cloud download" onClick={() => this.doSampleLoad()}/> */}
						<Button type="button" content="Load Person (remote)" icon="cloud download" onClick={this.testGet}/>
						<Button content="Submit" icon="sign in" loading={submitting}/>
					</div>
				</Form>
			</Segment>
		)
	}
}

const onSubmit = (values, dispatch, props) => {
	return props.postPerson(values)
}

const validate = values => {
	const errors = {}
	return errors
}

// i.e. model -> view
const mapStateToProps = state => {
	return {
		initialValues: getFormInitialValues('PERSON_FORM')(state),
		isPersonPostDone: isPersonPostDone(state),
		isPersonPostPending: isPersonPostPending(state),
		isPersonPostError: isPersonPostError(state),
		getPersonPostError: getPersonPostError(state),
		getPersonPostData: getPersonPostData(state),

		isPersonGetDone: isPersonGetDone(state),
		isPersonGetPending: isPersonGetPending(state),
		isPersonGetError: isPersonGetError(state),
		getPersonGetError: getPersonGetError(state),
		getPersonGetData: getPersonGetData(state),

		isPersonPutDone: isPersonPutDone(state),
		isPersonPutPending: isPersonPutPending(state),
		isPersonPutError: isPersonPutError(state),
		getPersonPutError: getPersonPutError(state),
		getPersonPutData: getPersonPutData(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		async getPerson (id) {
			return dispatch(GET_PERSON(id))
		},
		async putPerson (id, data) {
			return dispatch(PUT_PERSON(id, data))
		},
		async postPerson (data) {
			return dispatch(POST_PERSON(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'PERSON_FORM',
	validate,
	onSubmit
})(PersonComponent))
