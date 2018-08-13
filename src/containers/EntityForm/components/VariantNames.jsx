// @flow
import React from 'react'
import {Field} from 'redux-form'
import {Grid, Header, Divider} from 'semantic-ui-react'
import {DropdownAddableComponent} from '../components/FormControls'
import SegmentRepeater from '../components/SegmentRepeater'
import NameParts from '../components/NameParts'
import LanguageSelector from '../components/LanguageSelector'
import ProjectSelector from '../components/ProjectSelector'
import {required} from '../components/FieldValidation'

const VariantNames = ({
	name,
	variantOptions,
	nameOptions,
	changeFunc
}: any) => (
	<div>
		<Header as="h4">Variant Name</Header>
		<Grid stackable>
			<Grid.Column width={6}>
				<Field
					name={`${name}.type`}
					required
					validate={[required]}
					label='Variant Type'
					options={variantOptions}
					placeholder='Select Type'
					component={DropdownAddableComponent}/>
			</Grid.Column>
			<Grid.Column width={5}>
				<ProjectSelector
					name={`${name}.project`}
					label='Project'
					changeFunc={changeFunc}
				/>
			</Grid.Column>
			<Grid.Column width={5}>
				<LanguageSelector
					name={`${name}.lang`}
					label="Language"/>
			</Grid.Column>
		</Grid>
		<Divider/>
		<SegmentRepeater
			fieldArrayName={`${name}.parts`}
			headerLabel="Components"
			componentLabel="Component"
			nameOptions={nameOptions}
			RepeatableComponent={NameParts}
		/>
	</div>
)

export default VariantNames
