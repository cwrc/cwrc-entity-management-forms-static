// @flow
import React from 'react'
import {Field} from 'redux-form'
import {DropdownComponent} from './FormControls'
import {get, parseJSON} from '../../../api/utils'

let isFetched = false
let fetchedProjects = []

class ProjectSelector extends React.Component<Props, State> {
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
						key: 'node/' + obj.nid,
						value: 'node/' + obj.nid,
						text: obj.title
					})
				}
				this.setState({projects})
				isFetched = true
				fetchedProjects = projects
			}).catch(err => {
				console.warn('error fetching projects!', err)
			})
		} else {
			this.setState({projects: fetchedProjects})
		}
	}

	render () {
		const name = this.props.name
		const label = this.props.label
		const changeFunc = this.props.changeFunc
		return (
			<Field
				name={`${name}.value`}
				label={label}
				options={this.state.projects}
				placeholder='Select Project'
				component={DropdownComponent}
				onChange={(event, newVal, prevVal) => {
					const match = fetchedProjects.find(project => {
						return project.value === newVal
					})
					changeFunc(`${name}.title`, match.text)
				}}
			/>
		)
	}
}

export default ProjectSelector
