// @flow
import React from 'react'
import {Grid} from 'semantic-ui-react'
import SegmentRepeater from './SegmentRepeater'
import LanguageSelector from './LanguageSelector'
import ProjectSelector from './ProjectSelector'
import {Field} from 'redux-form'

const DescriptiveNoteComponent = ({name}: String) => (
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
)

const DescriptiveNote = () => (
	<SegmentRepeater
		fieldArrayName="description.descriptiveNote"
		headerLabel="General Description(s)"
		componentLabel="Note"
		RepeatableComponent={DescriptiveNoteComponent}
	/>
)

const ProjectNoteComponent = ({name, changeFunc}: any) => (
	<Grid>
		<Grid.Row>
			<Grid.Column width={8}>
				<ProjectSelector label="Project" name={`${name}.project`} changeFunc={changeFunc}/>
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
)

const ProjectNote = ({changeFunc}: any) => (
	<SegmentRepeater
		fieldArrayName="description.projectNote"
		headerLabel="Project-Specific Note(s)"
		componentLabel="Description"
		changeFunc={changeFunc}
		RepeatableComponent={ProjectNoteComponent}
	/>
)

export {DescriptiveNote, ProjectNote}
