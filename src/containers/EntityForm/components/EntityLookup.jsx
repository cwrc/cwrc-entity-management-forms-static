// @flow
import React from 'react'
import {
	Grid, Button, Popup, Icon, Header
} from 'semantic-ui-react'
import {Field} from 'redux-form'
import {DropdownComponent} from '../components/FormControls'

import '../../../static/bootstrap/bootstrap-scoped.css'

import cwrc from 'cwrc-tei-entities-lookup'
import viaf from 'viaf-entity-lookup'
import dbpedia from 'dbpedia-entity-lookup'
import wikidata from 'wikidata-entity-lookup'
import getty from 'getty-entity-lookup'
import geonames from 'geonames-entity-lookup'

import PublicEntityDialog from 'cwrc-public-entity-dialogs'

cwrc.setEntityRoot('https://dev-02.cwrc.ca/islandora/object')
cwrc.setSearchRoot('https://dev-02.cwrc.ca/islandora/cwrc_entities/v1')

PublicEntityDialog.showCreateNewButton(false)
PublicEntityDialog.showNoLinkButton(false)
PublicEntityDialog.registerEntitySources({
	person: (new Map()).set('cwrc', cwrc).set('viaf', viaf).set('wikidata', wikidata).set('getty', getty).set('dbpedia', dbpedia),
	place: (new Map()).set('geonames', geonames).set('cwrc', cwrc).set('viaf', viaf).set('dbpedia', dbpedia).set('wikidata', wikidata),
	organization: (new Map()).set('cwrc', cwrc).set('viaf', viaf).set('wikidata', wikidata).set('dbpedia', dbpedia),
	title: (new Map()).set('cwrc', cwrc).set('viaf', viaf).set('wikidata', wikidata).set('dbpedia', dbpedia)
})

class EntityLookup extends React.Component<Props, State> {
	state = { hasLookup: false }

	handleSearchClick = () => {
		const name = this.props.name
		const entityType = this.props.entityType
		const changeFunc = this.props.changeFunc

		PublicEntityDialog.popSearch[entityType]({
			query: '',
			parentEl: document.querySelector('body'),
			success: (result) => {
				changeFunc(`${name}.name`, result.name)
				changeFunc(`${name}.idno`, result.uri)
				changeFunc(`${name}.type`, result.repository)
				this.setState({ hasLookup: true })
			},
			error: (error) => {
				console.log(error)
			}
		})
	}

	handleClearClick = () => {
		const name = this.props.name
		const changeFunc = this.props.changeFunc
		changeFunc(`${name}.name`, '')
		changeFunc(`${name}.idno`, '')
		changeFunc(`${name}.type`, '')
		this.setState({ hasLookup: false })
	}

	renderName = (field) => (
		<Header as='h5' style={{marginBottom: '0.2em'}}>{field.input.value}</Header>
	)

	renderURI = (field) => {
		if (field.input.value !== undefined) {
			return <a href={field.input.value} style={{display: 'block', overflow: 'hidden', textOverflow: 'ellipsis'}} target='_blank' rel="noopener noreferrer">{field.input.value}</a>
		} else {
			return ''
		}
	}

	render () {
		const name = this.props.name
		const buttonLabel = this.props.buttonLabel
		const includeCertainty = this.props.includeCertainty
		const certaintyOptions = this.props.certaintyOptions
		const includeClear = this.props.includeClear
		const entityType = this.props.entityType
		const entityLabel = entityType.charAt(0).toUpperCase() + entityType.slice(1)
		return (
			<div>
				<Grid columns='equal'>
					<Grid.Row verticalAlign='top'>
						{this.state.hasLookup === false &&
						<Grid.Column width={4}>
							<Button type="button" size='tiny' color='grey' onClick={() => this.handleSearchClick()}>
								<Icon name='search' />{buttonLabel}
							</Button>
						</Grid.Column>
						}
						<Grid.Column>
							<Field name={`${name}.name`} component={this.renderName} />
							<Field name={`${name}.idno`} component={this.renderURI} />
						</Grid.Column>
						{includeCertainty &&
						<Grid.Column>
							<Field name={`${name}.cert`}
								label='Certainty' placeholder='Certainty' component={DropdownComponent} options={certaintyOptions}
							/>
						</Grid.Column>
						}
						{(includeClear && this.state.hasLookup) &&
						<Grid.Column width={1}>
							<Popup size='tiny' position='right center' trigger={
								<Button type="button" size='tiny' color='red' icon='minus' onClick={() => this.handleClearClick()} />
							} content={`Clear ${entityLabel}`} />
						</Grid.Column>
						}
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}

export default EntityLookup
