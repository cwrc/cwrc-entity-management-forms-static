// @flow
import {addIdentityJSON, addNotesJSON, addSourcesJSON} from '../../utils/conversion_utilities'

export const xml2json = (xmlDoc: XMLDocument) => {
	let values = {
		identity: {},
		description: {},
		sources: {}
	}

	let organization = xmlDoc.querySelector('organization')

	addIdentityJSON(organization, 'orgName', values)

	values.description.dates = []
	let dates = organization.querySelectorAll('event')
	dates.forEach((date, index) => {
		let date1 = date.getAttribute('when-iso')
		let date2
		let qualifier1
		let qualifier2
		if (date1 === null) {
			date1 = date.getAttribute('from-iso')
			date2 = date.getAttribute('to-iso')
			qualifier1 = 'from-iso'
			qualifier2 = 'to-iso'
			if (date1 === null) {
				date1 = date.getAttribute('notBefore-iso')
				qualifier1 = 'notBefore-iso'
			}
			if (date2 === null) {
				date2 = date.getAttribute('notAfter-iso')
				qualifier2 = 'notAfter-iso'
			}
		} else {
			qualifier1 = 'when-iso'
		}
		let note = date.querySelector('desc > desc')
		if (note) {
			note = note.textContent
		}
		let place = date.querySelector('desc > placeName')
		if (place) {
			let name = place.textContent
			let idno = place.getAttribute('ref')
			place = {name, idno}
		}
		values.description.dates.push({
			type: date.getAttribute('type'),
			date1,
			date2,
			qualifier1,
			qualifier2,
			note,
			place,
			cert: date.getAttribute('cert')
		})
	})

	values.description.properties = {}
	let trait = organization.querySelector('trait[type="factuality"]')
	if (trait) {
		values.description.properties.factuality = {
			value: trait.querySelector('ab').textContent,
			cert: trait.getAttribute('cert')
		}
	}

	addNotesJSON(organization, values)

	addSourcesJSON(organization, values)

	return values
}
