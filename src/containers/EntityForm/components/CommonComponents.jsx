// @flow
import React from 'react'
import {
	Grid
} from 'semantic-ui-react'
import {Field} from 'redux-form'
import LanguageSelector from './LanguageSelector'
import ProjectSelector from './ProjectSelector'

const DescriptiveNote = ({name}: String) => (
	<div>
		<Grid>
			<Grid.Row>
				<Grid.Column width={16}>
					<LanguageSelector label="Language" name={`${name}.lang`}/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column width={16}>
					<Field
						width={10}
						name={`${name}.value`}
						component='textarea'
						rows={3}
						placeholder="Add your note here."/>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</div>
)

const ProjectNote = ({name}: String) => (
	<div>
		<Grid>
			<Grid.Row>
				<Grid.Column width={8}>
					<ProjectSelector label="Project" name={`${name}.project`}/>
				</Grid.Column>
				<Grid.Column width={8}>
					<LanguageSelector label="Language" name={`${name}.lang`}/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column width={16}>
					<Field
						width={10}
						name={`${name}.value`}
						component='textarea'
						rows={3}
						placeholder="Add your note here."/>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</div>
)

export {DescriptiveNote, ProjectNote}
