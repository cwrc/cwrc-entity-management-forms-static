// @flow
import React from 'react'
import {Field} from 'redux-form'
import {DropdownComponent} from './FormControls'
import {get} from '../../../api/utils'

class ProjectSelector extends React.Component {
	// static propTypes = {
	// 	name: String,
	// 	label: String
	// }
	state = {
		projects: []
	}

	componentDidMount () {
		get(process.env.REACT_APP_ENTITIES_HOST + '/projects/json-lookup').then(res => {
			console.log(res)
		})
	}

	render () {
		return (
			<Field
				name={this.props.name}
				label={this.props.label}
				options={this.state.projects}
				placeholder='Select Project'
				component={DropdownComponent}/>
		)
	}
}

export default ProjectSelector
