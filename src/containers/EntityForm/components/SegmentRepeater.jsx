// @flow
import React from 'react'
import {
	Header,
	Grid,
	Button,
	Segment,
	Popup
} from 'semantic-ui-react'
import {FieldArray} from 'redux-form'

const SegmentRepeater = ({
	fieldArrayName,
	componentLabel,
	RepeatableComponent,
	...rest
}: any) => {
	return (
		<FieldArray
			name={fieldArrayName}
			props={{RepeatableComponent, componentLabel}}
			component={renderSegment}
			{...rest}
		/>
	)
}

const renderSegment = ({
	fields,
	RepeatableComponent,
	headerLabel,
	componentLabel,
	meta: {touched, error, submitFailed},
	...rest
}: any) => (
	<Segment secondary>
		<Segment clearing basic style={{padding: 0}}>
			<Header as="h4" floated='left'>{headerLabel}</Header>
			<Popup size='tiny' position='right center' trigger={
				<Button type="button" floated='right' size='tiny' color='olive' icon='plus' onClick={() => fields.push({})}/>
			} content={`Add ${componentLabel}`} />
		</Segment>
		{fields.map((name, index) => (
			<Segment key={index} clearing>
				<Grid>
					<Grid.Column width={15}>
						<RepeatableComponent name={name} {...rest}/>
					</Grid.Column>
					<Grid.Column width={1}>
						<Popup size='tiny' position='right center' trigger={
							<Button type="button" floated="right" size='tiny' color='red' icon='minus' onClick={() => fields.remove(index)}/>
						} content={`Remove ${componentLabel}`} />
					</Grid.Column>
				</Grid>
			</Segment>
		))}
	</Segment>
)

export default SegmentRepeater
