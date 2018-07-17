import React, { Component } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

export default class MessageDialog extends Component {
	static propTypes = {
		header: String,
		content: String,
		onClose: Function
	}
	state = { modalOpen: true }

	handleOpen = () => this.setState({ modalOpen: true })

	handleClose = () => {
		this.setState({ modalOpen: false })
		this.props.onClose.call()
	}

	render () {
		return (
			<Modal
				open={this.state.modalOpen}
				onClose={this.handleClose}
				style={{position: 'relative'}}
			>
				<Modal.Header>{this.props.header}</Modal.Header>
				<Modal.Content>{this.props.content}</Modal.Content>
				<Modal.Actions>
					<Button color='green' onClick={this.handleClose}>
						<Icon name='checkmark' /> Ok!
					</Button>
				</Modal.Actions>
			</Modal>
		)
	}
}
