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
import {DropdownComponent, InputField} from '../../components/FormControls'
import SegmentRepeater from '../../components/SegmentRepeater'
import DateRepeater from '../../components/DateRepeater'
import EntityLookup from '../../components/EntityLookup'
import MessageDialog from '../../components/MessageDialog'

import {nonPersonVariantTypeOptions, nonPersonDateTypeOptions, factualityOptions, certaintyOptions} from '../../components/options'

import Values from '../../components/Values'

import BroadcastChannel from 'broadcast-channel'

import type {FormProps} from 'redux-form'

import {
	getEntityId,

	isOrganizationPostDone,
	isOrganizationPostPending,
	isOrganizationPostError,
	getOrganizationPostError,
	getOrganizationPostData,

	isOrganizationGetDone,
	isOrganizationGetPending,
	isOrganizationGetError,
	getOrganizationGetError,
	getOrganizationGetData,

	isOrganizationPutDone,
	isOrganizationPutPending,
	isOrganizationPutError,
	getOrganizationPutError,
	getOrganizationPutData} from '../../../../selectors'

import {GET_ORGANIZATION, PUT_ORGANIZATION, POST_ORGANIZATION} from '../../../../actions/entities'

type Props = FormProps

class OrganizationComponent extends Component<Props, State> {
	closeForm = (id) => {
		const channel = new BroadcastChannel('cwrc-entity-management-forms')
		channel.postMessage(id)
		channel.close()
	}

	componentWillMount () {
		const entityId = this.props.entityId
		if (entityId !== '') {
			this.props.getOrganization(entityId)
		}
	}

	render () {
		const {handleSubmit, invalid, submitting} = this.props

		return (
			<Segment basic>
				{this.props.isOrganizationPostDone ? (
					<MessageDialog
						header="Entity Created!"
						content={<p>New entity: <a href={process.env.REACT_APP_ENTITIES_HOST + '/islandora/object/' + this.props.getOrganizationPostData.data.pid + '/manage/datastreams'} target="_blank" rel="noopener noreferrer">{this.props.getOrganizationPostData.data.pid}</a></p>}
						onClose={this.closeForm.bind(this, this.props.getOrganizationPostData.data.pid)}
					/>
				) : ''}
				{this.props.isOrganizationPutDone ? (
					<MessageDialog
						header="Entity Edited!"
						content={<p>Entity: <a href={process.env.REACT_APP_ENTITIES_HOST + '/islandora/object/' + this.props.getOrganizationPutData.data.pid + '/manage/datastreams'} target="_blank" rel="noopener noreferrer">{this.props.getOrganizationPutData.data.pid}</a></p>}
						onClose={this.closeForm.bind(this, this.props.getOrganizationPutData.data.pid)}
					/>
				) : ''}
				{this.props.isOrganizationGetPending ? (
					<Dimmer active inverted>
						<Loader inverted>Loading Organization</Loader>
					</Dimmer>
				) : ''}
				{/* <Rail attached position='left' size='tiny'>
					<Values form='ORG_FORM'/>
				</Rail> */}
				<Form onSubmit={handleSubmit} error={invalid}>

					<Header as="h2">Identity</Header>

					<IdentityGroup
						entityType="organization"
						nameOptions={null}
						variantOptions={nonPersonVariantTypeOptions}
						certaintyOptions={certaintyOptions}
						changeFunc={this.props.change}
					/>

					<Header as="h2">Description</Header>

					<Segment.Group>
						<DateRepeater
							fieldArrayName="description.dates"
							headerLabel="Important Date(s)"
							componentLabel="Date"
							dateTypeOptions={nonPersonDateTypeOptions}
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
											label="Organization Type"
											name="description.properties.type.value"
											placeholder="Type"
											inline
											component={InputField}
										/>
									</Grid.Column>
									<Grid.Column>
										<Field
											label='Certainty'
											name='description.properties.type.cert'
											placeholder='Certainty'
											options={certaintyOptions}
											component={DropdownComponent}/>
									</Grid.Column>
								</Grid>
							</Segment>
						</Segment>
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
	if (props.isOrganizationGetDone && props.entityId !== '') {
		return props.putOrganization(props.entityId, values)
	} else {
		return props.postOrganization(values)
	}
}

const validate = values => {
	const errors = {}
	return errors
}

// i.e. model -> view
const mapStateToProps = state => {
	return {
		initialValues: getOrganizationGetData(state),
		entityId: getEntityId(state),

		isOrganizationPostDone: isOrganizationPostDone(state),
		isOrganizationPostPending: isOrganizationPostPending(state),
		isOrganizationPostError: isOrganizationPostError(state),
		getOrganizationPostError: getOrganizationPostError(state),
		getOrganizationPostData: getOrganizationPostData(state),

		isOrganizationGetDone: isOrganizationGetDone(state),
		isOrganizationGetPending: isOrganizationGetPending(state),
		isOrganizationGetError: isOrganizationGetError(state),
		getOrganizationGetError: getOrganizationGetError(state),
		getOrganizationGetData: getOrganizationGetData(state),

		isOrganizationPutDone: isOrganizationPutDone(state),
		isOrganizationPutPending: isOrganizationPutPending(state),
		isOrganizationPutError: isOrganizationPutError(state),
		getOrganizationPutError: getOrganizationPutError(state),
		getOrganizationPutData: getOrganizationPutData(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		async getOrganization (id) {
			return dispatch(GET_ORGANIZATION(id))
		},
		async putOrganization (id, data) {
			return dispatch(PUT_ORGANIZATION(id, data))
		},
		async postOrganization (data) {
			return dispatch(POST_ORGANIZATION(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'ORG_FORM',
	validate,
	onSubmit
})(OrganizationComponent))
