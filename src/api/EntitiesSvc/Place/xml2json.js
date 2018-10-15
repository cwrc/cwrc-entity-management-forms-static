// @flow
import {addIdentityJSON, addNotesJSON, addSourcesJSON} from '../../utils/conversion_utilities'

export const xml2json = (xmlDoc: XMLDocument) => {
	let values = {
		identity: {},
		description: {},
		sources: {}
	}

	let place = xmlDoc.querySelector('place')

	addIdentityJSON(place, 'placeName', values)

	values.description.dates = []
	let dates = place.querySelectorAll('event')
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
	let trait = place.querySelector('trait[type="factuality"]')
	if (trait) {
		values.description.properties.factuality = {
			value: trait.querySelector('ab').textContent,
			cert: trait.getAttribute('cert')
		}
	}

	values.description.location = {}
	let location = place.querySelector('location')
	if (location) {
		let address = location.querySelector('addrLine')
		if (address) {
			values.description.location.address = address.textContent
		}
		let country = location.querySelector('country')
		if (country) {
			values.description.location.country = {
				value: country.textContent,
				cert: country.getAttribute('cert')
			}
		}
		let region = location.querySelector('region')
		if (region) {
			values.description.location.region = {
				value: region.textContent,
				cert: region.getAttribute('cert')
			}
		}
		let geo = location.querySelector('geo')
		if (geo) {
			let latLong = geo.textContent.split(' ')
			values.description.location.latitude = latLong[0]
			values.description.location.longitude = latLong[1]
		}
	}

	addNotesJSON(place, values)

	addSourcesJSON(place, values)

	return values
}
