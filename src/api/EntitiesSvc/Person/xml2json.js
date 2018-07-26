// @flow
import {addIdentityJSON, addNotesJSON, addSourcesJSON} from '../../utils/conversion_utilities'

export const xml2json = (xmlDoc: XMLDocument) => {
	let values = {
		identity: {},
		description: {},
		sources: {}
	}

	let person = xmlDoc.querySelector('person')

	addIdentityJSON(person, 'persName', values)

	values.description.dates = []
	let dates = person.querySelectorAll('birth, death, floruit')
	dates.forEach((el, index) => {
		let date = el.querySelector('date')
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
		let note = el.querySelector('note')
		if (note) {
			note = note.textContent
		}
		let place = el.querySelector('placeName')
		if (place) {
			let name = place.textContent
			let idno = place.getAttribute('ref')
			place = {name, idno}
		}
		values.description.dates.push({
			type: el.nodeName,
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
	let trait = person.querySelector('trait[type="factuality"]')
	if (trait) {
		values.description.properties.factuality = {
			value: trait.querySelector('ab').textContent,
			cert: trait.getAttribute('cert')
		}
	}

	values.description.properties.gender = {}
	let sex = person.querySelector('sex')
	if (sex) {
		values.description.properties.gender.cert = sex.getAttribute('cert')
		values.description.properties.gender.value = sex.getAttribute('value').split(' ')
	}

	values.description.properties.occupation = []
	person.querySelectorAll('occupation').forEach((el, index) => {
		values.description.properties.occupation.push({
			value: el.textContent,
			cert: el.getAttribute('cert')
		})
	})

	values.description.properties.nationality = []
	person.querySelectorAll('nationality').forEach((el, index) => {
		values.description.properties.nationality.push({
			value: el.textContent,
			cert: el.getAttribute('cert')
		})
	})

	values.description.properties.affiliation = []
	person.querySelectorAll('affiliation').forEach((el, index) => {
		values.description.properties.affiliation.push({
			value: el.textContent,
			cert: el.getAttribute('cert')
		})
	})

	addNotesJSON(person, values)

	addSourcesJSON(person, values)

	return values
}
