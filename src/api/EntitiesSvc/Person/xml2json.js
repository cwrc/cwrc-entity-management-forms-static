// @flow

export const xml2json = (xmlDoc: XMLDocument) => {
	let values = {
		identity: {},
		description: {},
		sources: {}
	}

	let person = xmlDoc.querySelector('person')

	values.identity.standardName = person.querySelector('persName[type="standard"]').firstElementChild.textContent

	let prefName = person.querySelector('persName[type="prefered"]')
	values.identity.namePartsLang = prefName.getAttribute('xml:lang').toLowerCase()
	values.identity.nameParts = []
	prefName.querySelectorAll('name').forEach((el, index) => {
		values.identity.nameParts.push({
			type: el.getAttribute('type'),
			value: el.textContent
		})
	})
	prefName.querySelectorAll('roleName').forEach((el, index) => {
		values.identity.nameParts.push({
			type: 'role',
			value: el.textContent
		})
	})
	prefName.querySelectorAll('genName').forEach((el, index) => {
		values.identity.nameParts.push({
			type: 'generational',
			value: el.textContent
		})
	})

	values.identity.variants = []
	person.querySelectorAll('persName[type="variant"]').forEach((variantEl, index) => {
		let project = ''
		let orgName = variantEl.querySelector('orgName')
		if (orgName) {
			project = orgName.getAttribute('ref').match(/node\/\d+$/)
			if (project !== null) {
				project = project[0]
			} else {
				project = ''
			}
		}
		let variant = {
			project,
			lang: variantEl.getAttribute('xml:lang').toLowerCase(),
			type: variantEl.getAttribute('role'),
			parts: []
		}

		variantEl.querySelectorAll('name').forEach((namePartEl, index2) => {
			variant.parts.push({
				type: namePartEl.getAttribute('type'),
				value: namePartEl.textContent
			})
		})
		variantEl.querySelectorAll('roleName').forEach((namePartEl, index2) => {
			variant.parts.push({
				type: 'role',
				value: namePartEl.textContent
			})
		})
		variantEl.querySelectorAll('genName').forEach((namePartEl, index2) => {
			variant.parts.push({
				type: 'generational',
				value: namePartEl.textContent
			})
		})

		values.identity.variants.push(variant)
	})

	values.identity.sameAs = []
	person.querySelectorAll('idno').forEach((el, index) => {
		values.identity.sameAs.push({
			type: el.getAttribute('type'),
			cert: el.getAttribute('cert'),
			idno: el.textContent
		})
	})

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

	values.description.descriptiveNote = []
	person.querySelectorAll('note[type="general"]').forEach((el, index) => {
		values.description.descriptiveNote.push({
			value: el.textContent,
			lang: el.getAttribute('xml:lang').toLowerCase()
		})
	})

	values.description.projectNote = []
	person.querySelectorAll('note[type="project-specific"]').forEach((el, index) => {
		let project = ''
		let orgName = el.querySelector('orgName')
		if (orgName) {
			project = orgName.getAttribute('ref').match(/node\/\d+$/)
			if (project !== null) {
				project = project[0]
			} else {
				project = ''
			}
		}

		values.description.projectNote.push({
			value: el.firstChild.textContent,
			lang: el.getAttribute('xml:lang').toLowerCase(),
			project: project
		})
	})

	let listBibl = person.querySelector('listBibl')
	if (listBibl) {
		values.sources.bibl = []
		listBibl.querySelectorAll('bibl').forEach((el, index) => {
			values.sources.bibl.push({
				name: el.querySelector('title').textContent,
				idno: el.querySelector('ref').getAttribute('target')
			})
		})
	}

	return values
}
