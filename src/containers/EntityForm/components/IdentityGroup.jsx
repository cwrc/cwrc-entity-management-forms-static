// @flow
import React from 'react'
import {Segment} from 'semantic-ui-react'
import SegmentRepeater from './SegmentRepeater'
import NameParts from './NameParts'
import VariantNames from './VariantNames'
import LanguageSelector from './LanguageSelector'
import EntityLookup from './EntityLookup'
import {InputField} from './FormControls'
import {Field} from 'redux-form'
import {required} from './FieldValidation'

const IdentityGroup = ({
	entityType,
	nameOptions,
	variantOptions,
	certaintyOptions,
	changeFunc
}: any) => (
	<Segment.Group>
		<Segment>
			<Field
				required
				validate={[required]}
				placeholder="e.g. Last Name, First Name (for indexing purposes)"
				name="identity.standardName"
				label="Standard Name"
				component={InputField}
			/>
			<Segment basic>
				<LanguageSelector label="Language" name="identity.namePartsLang"/>
				<SegmentRepeater
					fieldArrayName="identity.nameParts"
					headerLabel="Components"
					componentLabel="Component"
					nameOptions={nameOptions}
					RepeatableComponent={NameParts}
				/>
			</Segment>
		</Segment>
		<SegmentRepeater
			fieldArrayName="identity.variants"
			headerLabel="Variant Name(s)"
			componentLabel="Variant Name"
			RepeatableComponent={VariantNames}
			nameOptions={nameOptions}
			variantOptions={variantOptions}
		/>
		<SegmentRepeater
			fieldArrayName="identity.sameAs"
			headerLabel="Same As"
			componentLabel="Same As"
			RepeatableComponent={EntityLookup}
			buttonLabel={'Add ' + entityType.charAt(0).toUpperCase() + entityType.substring(1)}
			includeCertainty={true}
			certaintyOptions={certaintyOptions}
			entityType={entityType}
			changeFunc={changeFunc}
		/>
	</Segment.Group>
)

export default IdentityGroup
