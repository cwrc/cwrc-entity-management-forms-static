// @flow
import React from 'react'
import {Field, FieldArray} from 'redux-form'
import {Grid, Divider} from 'semantic-ui-react'
import {DropdownAddableComponent} from '../components/FormControls'
import NameParts from '../components/NameParts'
import LanguageSelector from '../components/LanguageSelector'
import ProjectSelector from '../components/ProjectSelector'
import {required} from '../components/FieldValidation'

const VariantNames = ({
	name,
	variantOptions,
	nameOptions
}: any) => (
	<div>
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
					label='Project'/>
			</Grid.Column>
			<Grid.Column width={5}>
				<LanguageSelector
					name={`${name}.lang`}
					label="Language"/>
			</Grid.Column>
		</Grid>
		<Divider/>
		<FieldArray name={`${name}.parts`} nameOptions={nameOptions} component={NameParts}/>
	</div>
)

export default VariantNames
