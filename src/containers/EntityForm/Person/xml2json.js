// @flow

const xml2json = (xmlDoc: XMLDocument) => {
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

	values.identity.variants = []
	person.querySelectorAll('persName[type="variant"]').forEach((el, index) => {
		let parts = []
		el.querySelectorAll('name').forEach((el2, index2) => {
			parts.push({
				type: el2.getAttribute('type'),
				value: el2.textContent
			})
		})
		let project = ''
		let orgName = el.querySelector('orgName')
		if (orgName) {
			project = orgName.getAttribute('ref')
		}
		values.identity.variants.push({
			lang: el.getAttribute('xml:lang').toLowerCase(),
			type: el.getAttribute('role'),
			project,
			parts
		})
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
		let date1 = date.getAttribute('when')
		let date2
		if (date1 === null) {
			date1 = date.getAttribute('from')
			date2 = date.getAttribute('to')
		}
		let note = el.querySelector('note')
		if (note) {
			note = note.textContent
		}
		values.description.dates.push({
			type: el.nodeName,
			date1,
			date2,
			note,
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

	let sex = person.getAttribute('sex')
	if (sex) {
		values.description.properties.gender = sex.split(' ')
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

	values.description.descriptiveNote = []
	person.querySelectorAll('note[type="general"]').forEach((el, index) => {
		values.description.descriptiveNote.push({
			value: el.textContent,
			lang: el.getAttribute('xml:lang').toLowerCase()
		})
	})

	values.description.projectNote = []
	person.querySelectorAll('note[type="project-specific"]').forEach((el, index) => {
		values.description.projectNote.push({
			value: el.querySelector('note').textContent,
			lang: el.getAttribute('xml:lang').toLowerCase(),
			project: el.querySelector('orgName').getAttribute('ref')
		})
	})

	let listBibl = person.querySelector('listBibl')
	if (listBibl) {
		values.sources.bibl = []
		listBibl.querySelectorAll('bibl').forEach((el, index) => {
			values.sources.bibl.push({
				name: el.querySelector('title').textContent
			})
		})
	}

	return values
}

export default xml2json
