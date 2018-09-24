import React, { Component } from 'react'
import { Grid, Button, Icon, Modal, Dropdown } from 'semantic-ui-react'
import {getCollections, setCollectionId} from '../../../api/CollectionsSvc'

export default class CollectionsDialog extends Component {
	static propTypes = {
		// onClose: Function
	}
	state = {
		modalOpen: true,
		collections: [],
		value: undefined
	}

	handleOpen = () => this.setState({ modalOpen: true })

	handleChange = (e, { value }) => this.setState({value: value})

	handleClose = () => {
		if (this.state.value === undefined) {
			return false
		} else {
			this.setState({ modalOpen: false })
			setCollectionId(this.state.value)
		}
	}

	componentDidMount () {
		getCollections().then(collections => {
			this.setState({collections: collections, value: collections[0].value})
		})
	}

	render () {
		const value = this.state.value
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
								placeholder='Select collection'
								fluid
								selection
								scrolling
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
					<Button color='green' onClick={this.handleClose}>
						<Icon name='checkmark' /> Use selected collection
					</Button>
				</Modal.Actions>
			</Modal>
		)
	}
}
