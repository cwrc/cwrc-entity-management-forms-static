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
import CollectionsDialog from '../../components/CollectionsDialog'
import {getCollectionId} from '../../../../api/CollectionsSvc'

import {nonPersonVariantTypeOptions, nonPersonDateTypeOptions, factualityOptions, certaintyOptions} from '../../components/options'
import countries from '../../../../static/countries'

import {latitude, longitude, dateRange} from '../../components/FieldValidation'

import Values from '../../components/Values'

import BroadcastChannel from 'broadcast-channel'

import type {FormProps} from 'redux-form'

import {
	getEntityId,

	isPlacePostDone,
	isPlacePostPending,
	isPlacePostError,
	getPlacePostError,
	getPlacePostData,

	isPlaceGetDone,
	isPlaceGetPending,
	isPlaceGetError,
	getPlaceGetError,
	getPlaceGetData,

	isPlacePutDone,
	isPlacePutPending,
	isPlacePutError,
	getPlacePutError,
	getPlacePutData} from '../../../../selectors'

import {GET_PLACE, PUT_PLACE, POST_PLACE} from '../../../../actions/entities'

type Props = FormProps

class PlaceComponent extends Component<Props, State> {
	closeForm = (id) => {
		const channel = new BroadcastChannel('cwrc-entity-management-forms')
		channel.postMessage(id)
		channel.close()
	}

	componentWillMount () {
		const entityId = this.props.entityId
		if (entityId !== undefined) {
			this.props.getPlace(entityId)
		}
	}

	render () {
		const {handleSubmit, invalid, submitting} = this.props

		return (
			<Segment basic>
				{this.props.isPlacePostDone ? (
					<MessageDialog
						header="Entity Created!"
						content={<p>New entity: <a href={process.env.REACT_APP_ENTITIES_HOST + '/islandora/object/' + this.props.getPlacePostData.data.pid + '/manage/datastreams'} target="_blank" rel="noopener noreferrer">{this.props.getPlacePostData.data.pid}</a></p>}
						onClose={this.closeForm.bind(this, this.props.getPlacePostData.data.pid)}
					/>
				) : ''}
				{this.props.isPlacePutDone ? (
					<MessageDialog
						header="Entity Edited!"
						content={<p>Entity: <a href={process.env.REACT_APP_ENTITIES_HOST + '/islandora/object/' + this.props.getPlacePutData.data.pid + '/manage/datastreams'} target="_blank" rel="noopener noreferrer">{this.props.getPlacePutData.data.pid}</a></p>}
						onClose={this.closeForm.bind(this, this.props.getPlacePutData.data.pid)}
					/>
				) : ''}
				{this.props.isPlaceGetPending ? (
					<Dimmer active inverted>
						<Loader inverted>Loading Place</Loader>
					</Dimmer>
				) : ''}
				{this.props.isPlaceGetError
					? (this.props.getPlaceGetError.message === 'locked' ? (
						<MessageDialog
							header="Entity is Locked!"
							content={<p>The entity <a href={process.env.REACT_APP_ENTITIES_HOST + '/islandora/object/' + this.props.entityId + '/manage/datastreams'} target="_blank" rel="noopener noreferrer">{this.props.entityId}</a> is locked and therefore cannot be edited.</p>}
							onClose={this.closeForm.bind(this, undefined)}
						/>
					) : (
						<MessageDialog
							header="Error Loading Entity!"
							content={<p>An error occurred when loading the entity: <a href={process.env.REACT_APP_ENTITIES_HOST + '/islandora/object/' + this.props.entityId + '/manage/datastreams'} target="_blank" rel="noopener noreferrer">{this.props.entityId}</a><br/>It is probably encoded in an unsupported format and therefore cannot be edited.</p>}
							onClose={this.closeForm.bind(this, undefined)}
						/>
					)) : ''}
				{this.props.entityId === undefined && this.props.getCollectionId === undefined ? (
					<CollectionsDialog entityType="place"/>
				) : ''}
				{/* <Rail attached position='left' size='tiny'>
					<Values form='PLACE_FORM'/>
				</Rail> */}
				<Form onSubmit={handleSubmit} error={invalid}>

					<Header as="h2">Identity</Header>

					<IdentityGroup
						entityType="place"
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
											placeholder="Optional"
											options={factualityOptions}
											component={DropdownComponent}
										/>
									</Grid.Column>
									<Grid.Column>
										<Field
											label='Certainty'
											name='description.properties.factuality.cert'
											placeholder='Optional'
											options={certaintyOptions}
											component={DropdownComponent}/>
									</Grid.Column>
								</Grid>
							</Segment>
							<Header as='h4'>Location</Header>
							<Segment basic>
								<Grid columns='equal'>
									<Grid.Column>
										<Field
											label="Country"
											name="description.location.country.value"
											placeholder="Optional"
											search
											scrolling
											options={countries}
											component={DropdownComponent}
										/>
									</Grid.Column>
									<Grid.Column>
										<Field
											label='Certainty'
											name='description.location.country.cert'
											placeholder='Optional'
											options={certaintyOptions}
											component={DropdownComponent}/>
									</Grid.Column>
								</Grid>
							</Segment>
							<Segment basic>
								<Grid columns='equal'>
									<Grid.Column>
										<Field
											inline
											label="Region"
											name="description.location.region.value"
											placeholder="Optional"
											component={InputField}
										/>
									</Grid.Column>
									<Grid.Column>
										<Field
											label='Certainty'
											name='description.location.region.cert'
											placeholder='Optional'
											options={certaintyOptions}
											component={DropdownComponent}/>
									</Grid.Column>
								</Grid>
							</Segment>
							<Segment basic>
								<Field
									inline
									label="Address"
									name="description.location.address"
									placeholder="Optional"
									component={InputField}
								/>
							</Segment>
							<Segment basic>
								<Grid>
									<Grid.Column width={3}>
										<Header as='h5'>Coordinates</Header>
									</Grid.Column>
									<Grid.Column width={6}>
										<Field
											inline
											validate={[latitude]}
											label="Latitude"
											name="description.location.latitude"
											placeholder="Optional"
											component={InputField}
										/>
									</Grid.Column>
									<Grid.Column width={7}>
										<Field
											inline
											validate={[longitude]}
											label='Longitude'
											name='description.location.longitude'
											placeholder='Optional'
											component={InputField}
										/>
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
	if (props.isPlaceGetDone && props.entityId !== undefined) {
		return props.putPlace(props.entityId, values)
	} else {
		return props.postPlace(values)
	}
}

const validate = values => {
	const errors = {}
	if (values.description && values.description.dates) {
		errors.description = {
			dates: []
		}
		for (const date of values.description.dates) {
			const error = dateRange(date)
			if (error !== undefined) {
				errors.description.dates.push(error)
			}
		}
	}
	return errors
}

// i.e. model -> view
const mapStateToProps = state => {
	return {
		initialValues: getPlaceGetData(state),
		entityId: getEntityId(state),
		getCollectionId: getCollectionId('place'),

		isPlacePostDone: isPlacePostDone(state),
		isPlacePostPending: isPlacePostPending(state),
		isPlacePostError: isPlacePostError(state),
		getPlacePostError: getPlacePostError(state),
		getPlacePostData: getPlacePostData(state),

		isPlaceGetDone: isPlaceGetDone(state),
		isPlaceGetPending: isPlaceGetPending(state),
		isPlaceGetError: isPlaceGetError(state),
		getPlaceGetError: getPlaceGetError(state),
		getPlaceGetData: getPlaceGetData(state),

		isPlacePutDone: isPlacePutDone(state),
		isPlacePutPending: isPlacePutPending(state),
		isPlacePutError: isPlacePutError(state),
		getPlacePutError: getPlacePutError(state),
		getPlacePutData: getPlacePutData(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		async getPlace (id) {
			return dispatch(GET_PLACE(id))
		},
		async putPlace (id, data) {
			return dispatch(PUT_PLACE(id, data))
		},
		async postPlace (data) {
			return dispatch(POST_PLACE(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'PLACE_FORM',
	validate,
	onSubmit
})(PlaceComponent))
