// @flow
import React from 'react'
import {Field} from 'redux-form'
import {DropdownComponent} from './FormControls'
import {get, parseJSON} from '../../../api/utils'

let isFetched = false
let fetchedProjects = []

class ProjectSelector extends React.Component {
	// static propTypes = {
	// 	name: String,
	// 	label: String
	// }
	state = {
		projects: []
	}

	static isFetched = false

	componentDidMount () {
		if (!isFetched) {
			get(process.env.REACT_APP_ENTITIES_HOST + '/projects/json-lookup').then(parseJSON).then(res => {
				const projects = []
				for (let key in res.data) {
					const obj = res.data[key]
					projects.push({
						key: obj.field_top_level_collection.und[0].pid,
						value: obj.field_top_level_collection.und[0].pid,
						text: obj.title
					})
				}
				this.setState({projects})
				isFetched = true
				fetchedProjects = projects
			})
		} else {
			this.setState({projects: fetchedProjects})
		}
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
