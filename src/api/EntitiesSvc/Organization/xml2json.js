// @flow
import {addIdentityJSON, addNotesJSON, addSourcesJSON} from '../../utils/conversion_utilities'

export const xml2json = (xmlDoc: XMLDocument) => {
	let values = {
		identity: {},
		description: {},
		sources: {}
	}

	let org = xmlDoc.querySelector('org')

	addIdentityJSON(org, 'orgName', values)

	values.description.dates = []
	let dates = org.querySelectorAll('event')
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
	let factuality = org.querySelector('trait[type="factuality"]')
	if (factuality) {
		values.description.properties.factuality = {
			value: factuality.querySelector('ab').textContent,
			cert: factuality.getAttribute('cert')
		}
	}
	let type = org.querySelector('trait[type="orgType"]')
	if (type) {
		values.description.properties.type = {
			value: type.querySelector('ab').textContent,
			cert: type.getAttribute('cert')
		}
	}

	addNotesJSON(org, values)

	addSourcesJSON(org, values)

	return values
}
