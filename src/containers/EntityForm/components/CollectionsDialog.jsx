import React, { Component } from 'react'
import { Grid, Button, Icon, Modal, Dropdown } from 'semantic-ui-react'
import {getCollections, setCollectionId} from '../../../api/CollectionsSvc'

export default class CollectionsDialog extends Component {
	static propTypes = {
		entityType: String
	}
	state = {
		modalOpen: true,
		collections: [],
		value: undefined,
		loading: true,
		error: false
	}

	handleOpen = () => this.setState({ modalOpen: true })

	handleChange = (e, { value }) => this.setState({value: value})

	handleClose = () => {
		if (this.state.value === undefined) {
			return false
		} else {
			this.setState({ modalOpen: false })
			setCollectionId(this.props.entityType, this.state.value)
		}
	}

	handleCancel = () => window.close()

	componentDidMount () {
		const entityType = this.props.entityType
		getCollections().then(collections => {
			if (collections.length > 0) {
				const filteredCollections = collections.filter(collection => collection.value.indexOf(`:${entityType}`) !== -1)
				this.setState({loading: false, collections: filteredCollections, value: collections[0].value})
			} else {
				this.setState({loading: false, error: true, collections: []})
			}
		})
	}

	render () {
		const value = this.state.value
		const loading = this.state.loading
		const error = this.state.error
		return (
			<Modal
				open={this.state.modalOpen}
				closeOnEscape={false}
				closeOnDocumentClick={false}
				closeOnDimmerClick={false}
				onClose={this.handleClose}
				style={{position: 'relative', overflow: 'visible'}} // overflow visible needed for dropdown
			>
				<Modal.Header>CWRC Collections</Modal.Header>
				<Modal.Content>
					<Grid>
						<Grid.Column width={6}>
							<Dropdown
								placeholder={error ? 'You do not have access to any CWRC collections' : 'Select collection'}
								fluid
								selection
								scrolling
								loading={loading}
								error={error}
								options={this.state.collections}
								value={value}
								onChange={this.handleChange}
								
							/>
						</Grid.Column>
						<Grid.Column width={8}>
							<p>Please choose a CWRC collection in which to create the entity.<br/>
							Your choice will be used for all new entities created in this editing session.</p>
						</Grid.Column>
					</Grid>
				</Modal.Content>
				<Modal.Actions>
					<Button onClick={this.handleCancel}>
						Cancel
					</Button>
					<Button color='green' onClick={this.handleClose}>
						<Icon name='checkmark' /> Use selected collection
					</Button>
				</Modal.Actions>
			</Modal>
		)
	}
}
