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
	Loader,
	Popup,
	Rail
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {
	reduxForm,
	initialize,
	Field
} from 'redux-form'

import IdentityGroup from '../../components/IdentityGroup'
import {DescriptiveNote, ProjectNote} from '../../components/NotesGroup'
import {InputField, DropdownComponent} from '../../components/FormControls'
import SegmentRepeater from '../../components/SegmentRepeater'
import DateRepeater from '../../components/DateRepeater'
import EntityLookup from '../../components/EntityLookup'
import MessageDialog from '../../components/MessageDialog'

import {personNameTypeOptions, personVariantTypeOptions, personDateTypeOptions, certaintyOptions, factualityOptions, genderOptions} from '../../components/options'

import type {FormProps} from 'redux-form'

import BroadcastChannel from 'broadcast-channel'

import Values from '../../components/Values'

import {
	getEntityId,

	isPersonPostDone,
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

import {xml2json} from '../../../../api/EntitiesSvc/Person/xml2json'
import {get, parseXML} from '../../../../api/utils'

type Props = FormProps

class PersonComponent extends Component<Props, State> {
	closeForm = (id) => {
		const channel = new BroadcastChannel('cwrc-entity-management-forms')
		channel.postMessage(id)
		channel.close()
	}

	doSampleLoad = () => {
		get(process.env.PUBLIC_URL + '/sample_person_entity.xml').then(parseXML).then(res => {
			let json = xml2json(res.data)
			console.log(json)
			if (json.identity.nameParts) {
				json.identity.nameParts.forEach(np => {
					let match = false
					for (let n of personNameTypeOptions) {
						if (n.value === np.type) {
							match = true
							break
						}
					}
					if (!match) {
						personNameTypeOptions.push({
							key: np.type, value: np.type, text: np.type
						})
					}
				})
			}
			if (json.identity.variants) {
				json.identity.variants.forEach(vr => {
					let match = false
					for (let v of personVariantTypeOptions) {
						if (v.value === vr.type) {
							match = true
							break
						}
					}
					if (!match) {
						personVariantTypeOptions.push({
							key: vr.type, value: vr.type, text: vr.type
						})
					}
				})
			}
			this.props.dispatch(initialize('PERSON_FORM', json))
		})
	}

	testGet = () => {
		console.log('triggered the testGet')
		this.props.getPerson('cwrc:7ce31c4a-d3ef-4839-95e9-984e394d31ef')
		// AFTER THE GET IS ISSUE, THE STATE WILL GO THROUGH AT LEAST TWO CHANGES:
		// 1. WHEN THE CALL IS ISSUED, THE STATE AT state.entities.person.get.status changes to 'pending' from 'none'
		// 2. after the call returns, that status changes to either 'done' or 'error'.  If 'done' then state.entities.person.get.data
		//    has the returned data.  if 'error', then data has the error.
		// To get the values from the state, use the selectors that I've mapped to props below in mapStateToProps.
	}

	componentWillMount () {
		const entityId = this.props.entityId
		if (entityId !== '') {
			this.props.getPerson(entityId)
		}
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

		const AffiliationComponent = ({name}) => (
			<div>
				<Grid verticalAlign='middle' columns='equal'>
					<Grid.Column>
						<Field
							inline
							label="Affiliation"
							name={`${name}.value`}
							placeholder="Affiliation"
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

		const {handleSubmit, invalid, submitting} = this.props

		return (
			<Segment basic>
				{this.props.isPersonPostDone ? (
					<MessageDialog
						header="Entity Created!"
						content={<p>New entity: <a href={process.env.REACT_APP_ENTITIES_HOST + '/islandora/object/' + this.props.getPersonPostData.data.pid + '/manage/datastreams'} target="_blank" rel="noopener noreferrer">{this.props.getPersonPostData.data.pid}</a></p>}
						onClose={this.closeForm.bind(this, this.props.getPersonPostData.data.pid)}
					/>
				) : ''}
				{this.props.isPersonPutDone ? (
					<MessageDialog
						header="Entity Edited!"
						content={<p>Entity: <a href={process.env.REACT_APP_ENTITIES_HOST + '/islandora/object/' + this.props.getPersonPutData.data.pid + '/manage/datastreams'} target="_blank" rel="noopener noreferrer">{this.props.getPersonPutData.data.pid}</a></p>}
						onClose={this.closeForm.bind(this, this.props.getPersonPutData.data.pid)}
					/>
				) : ''}
				{this.props.isPersonGetPending ? (
					<Dimmer active inverted>
						<Loader inverted>Loading Person</Loader>
					</Dimmer>
				) : ''}
				{/* <Rail attached position='left' size='tiny'>
					<Values form='PERSON_FORM'/>
				</Rail> */}
				<Form onSubmit={handleSubmit} error={invalid}>

					<Header as="h2">Identity</Header>

					<IdentityGroup
						entityType="person"
						nameOptions={personNameTypeOptions}
						variantOptions={personVariantTypeOptions}
						certaintyOptions={certaintyOptions}
						changeFunc={this.props.change}
					/>

					<Header as="h2">Description</Header>

					<Segment.Group>
						<DateRepeater
							fieldArrayName="description.dates"
							headerLabel="Important Date(s)"
							componentLabel="Date"
							dateTypeOptions={personDateTypeOptions}
							changeFunc={this.props.change}
						/>
						<Segment>
							<Header as='h4'>Properties</Header>
							<Segment basic>
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
							<Segment basic>
								<Grid columns='equal'>
									<Grid.Column>
										<Field
											label="Gender"
											name="description.properties.gender.value"
											placeholder="Gender"
											multiple
											scrolling
											options={genderOptions}
											component={DropdownComponent}
										/>
									</Grid.Column>
									<Grid.Column>
										<Field
											label='Certainty'
											name='description.properties.gender.cert'
											placeholder='Certainty'
											options={certaintyOptions}
											component={DropdownComponent}/>
									</Grid.Column>
								</Grid>
							</Segment>
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
						<SegmentRepeater
							fieldArrayName="description.properties.affiliation"
							headerLabel="Affiliation"
							componentLabel="Affiliation"
							RepeatableComponent={AffiliationComponent}
						/>
						<DescriptiveNote />
						<ProjectNote changeFunc={this.props.change}/>
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
						{/* <Button type="button" content="Load Sample Person (local)" icon="cloud download" onClick={this.doSampleLoad}/>
						<Button type="button" content="Load Person (remote)" icon="cloud download" onClick={this.testGet}/> */}
						{invalid ? (
							<Popup size='tiny' position='right center' trigger={
								<span><Button content="Submit" icon="sign in" disabled={true}/></span>
							} content="Please fix invalid fields before submitting"/>
						) : <Button content="Submit" icon="sign in" loading={submitting}/>}
					</div>
				</Form>
			</Segment>
		)
	}
}

const onSubmit = (values, dispatch, props) => {
	if (props.isPersonGetDone && props.entityId !== '') {
		return props.putPerson(props.entityId, values)
	} else {
		return props.postPerson(values)
	}
}

const validate = values => {
	const errors = {}
	return errors
}

// i.e. model -> view
const mapStateToProps = state => {
	return {
		initialValues: getPersonGetData(state),
		entityId: getEntityId(state),

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
