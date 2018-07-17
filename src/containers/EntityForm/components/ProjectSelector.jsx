// @flow
import React from 'react'
import {Field} from 'redux-form'
import {DropdownComponent} from './FormControls'
import {get, parseJSON} from '../../../api/utils'

class ProjectSelector extends React.Component {
	// static propTypes = {
	// 	name: String,
	// 	label: String
	// }
	state = {
		projects: []
	}

	componentDidMount () {
		get(process.env.REACT_APP_ENTITIES_HOST + '/projects/json-lookup').then(parseJSON).then(data => {
			console.log(data)
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
