// @flow

export function createXMLFromPath (parent: Element, path: String, childText?: String) {
	let currParent = parent
	if (path !== undefined && path !== '') {
		let tags = path.split('/')
		for (let tag of tags) {
			let hasAtt = tag.indexOf('[') !== -1
			let tagName
			if (hasAtt) {
				tagName = tag.slice(0, tag.indexOf('['))
			} else {
				tagName = tag
			}
			let el = parent.ownerDocument.createElementNS('http://www.tei-c.org/ns/1.0', tagName)
			if (hasAtt) {
				let attName = tag.slice(tag.indexOf('@') + 1, tag.indexOf('='))
				let attValue = tag.slice(tag.indexOf('"') + 1, tag.lastIndexOf('"'))
				attValue = decodeURIComponent(attValue)
				el.setAttribute(attName, attValue)
			}
			currParent.appendChild(el)

			currParent = el
		}
	}
	if (childText !== undefined) {
		currParent.appendChild(currParent.ownerDocument.createTextNode(childText))
	}

	return currParent
}

export function getDateString (date: String) {
	let d
	if (typeof date === 'string') {
		// handling for weird date stuff
		// see https://stackoverflow.com/a/31732581
		// d = new Date(date.replace(/-/g, '/'))
		return date
	} else {
		d = date
	}

	let month = '' + (d.getMonth() + 1)
	let day = '' + d.getDate()
	let year = '' + d.getFullYear()

	year = year.padStart(4, '0')
	month = month.padStart(2, '0')
	day = day.padStart(2, '0')

	return [year, month, day].join('-')
}

export function addIdentityXML (parentEl: Element, identityEl: String, values: Object) {
	let title = parentEl.ownerDocument.querySelector('fileDesc > titleStmt > title')
	createXMLFromPath(title, '', values.identity.standardName)
	// standard name
	createXMLFromPath(parentEl, `${identityEl}[@type="standard"]/name`, values.identity.standardName)
	// name components
	if (values.identity.nameParts) {
		let namePartEl = createXMLFromPath(parentEl, `${identityEl}[@type="preferred"]`)
		for (let namePart of values.identity.nameParts) {
			if (values.identity.namePartsLang) {
				namePartEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', values.identity.namePartsLang)
			}
			if (namePart.type === 'role') {
				createXMLFromPath(namePartEl, 'roleName', namePart.value)
			} else if (namePart.type === 'generational') {
				createXMLFromPath(namePartEl, 'genName', namePart.value)
			} else {
				let namePartType = namePart.type
				if (namePartType === undefined || namePartType === '') {
					namePartType = 'undefined'
				}
				namePartType = namePartType.replace(/\s+/g, '_')
				createXMLFromPath(namePartEl, `name[@type="${namePartType}"]`, namePart.value)
			}
		}
	}
	// name variants
	if (values.identity.variants) {
		for (let variant of values.identity.variants) {
			let variantEl = createXMLFromPath(parentEl, `${identityEl}[@type="variant"]`)
			if (variant.lang) {
				variantEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', variant.lang)
			}

			let variantType = variant.type
			if (variantType === undefined || variantType === '') {
				variantType = 'undefined'
			}
			variantType = variantType.replace(/\s+/g, '_')
			variantEl.setAttribute('role', variantType)

			if (variant.project) {
				let noteEl = createXMLFromPath(variantEl, 'note')
				createXMLFromPath(noteEl, 'label', 'Name preferred by')
				createXMLFromPath(noteEl, `desc/orgName[@ref="${encodeURIComponent(process.env.REACT_APP_ENTITIES_HOST + '/' + variant.project.value)}"]`, variant.project.title)
			}
			if (variant.parts) {
				for (let part of variant.parts) {
					if (part.type === 'role') {
						createXMLFromPath(variantEl, 'roleName', part.value)
					} else if (part.type === 'generational') {
						createXMLFromPath(variantEl, 'genName', part.value)
					} else {
						let namePartType = part.type
						if (namePartType === undefined || namePartType === '') {
							namePartType = 'undefined'
						}
						namePartType = namePartType.replace(/\s+/g, '_')
						createXMLFromPath(variantEl, `name[@type="${namePartType}"]`, part.value)
					}
				}
			}
		}
	}
	// same as
	if (values.identity.sameAs) {
		for (let sameAs of values.identity.sameAs) {
			let sameAsEl = createXMLFromPath(parentEl, `idno[@type="${sameAs.type}"]`, sameAs.idno)
			if (sameAs.cert) {
				sameAsEl.setAttribute('cert', sameAs.cert)
			}
		}
	}
}

export function addNotesXML (parentEl: Element, values: Object) {
	// description
	if (values.description.descriptiveNote) {
		for (let note of values.description.descriptiveNote) {
			let noteEl = createXMLFromPath(parentEl, 'note[@type="general"]', note.value)
			if (note.lang) {
				noteEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', note.lang)
			}
		}
	}
	// project note
	if (values.description.projectNote) {
		for (let note of values.description.projectNote) {
			let noteEl = createXMLFromPath(parentEl, 'note[@type="project-specific"]', note.value)
			if (note.lang) {
				noteEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', note.lang)
			}
			if (note.project) {
				createXMLFromPath(noteEl, `respons[@locus="value"]/desc/orgName[@ref="${encodeURIComponent(process.env.REACT_APP_ENTITIES_HOST + '/' + note.project.value)}"]`, note.project.title)
			}
		}
	}
}

export function addSourcesXML (parentEl: Element, values: Object) {
	// sources
	if (values.sources.bibl) {
		let listBibl = createXMLFromPath(parentEl, 'listBibl')
		for (let bibl of values.sources.bibl) {
			let biblEl = createXMLFromPath(listBibl, 'bibl', bibl.name)
			let ref = createXMLFromPath(biblEl, 'ref')
			ref.setAttribute('source', bibl.type)
			ref.setAttribute('target', bibl.idno)
		}
	}
}

export function addIdentityJSON (parentEl: Element, identityEl: String, values: Object) {
	values.identity.standardName = parentEl.querySelector(`${identityEl}[type="standard"]`).firstElementChild.textContent

	let prefName = parentEl.querySelector(`${identityEl}[type="preferred"]`)
	if (prefName) {
		values.identity.namePartsLang = prefName.getAttribute('xml:lang').toLowerCase()
		values.identity.nameParts = []
		prefName.querySelectorAll('name').forEach((el, index) => {
			values.identity.nameParts.push({
				type: el.getAttribute('type'),
				value: el.textContent
			})
		})
	}
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
	parentEl.querySelectorAll(`${identityEl}[type="variant"]`).forEach((variantEl, index) => {
		let ref = ''
		let title = ''
		let orgName = variantEl.querySelector('orgName')
		if (orgName) {
			ref = orgName.getAttribute('ref').match(/node\/\d+$/)
			if (ref !== null) {
				ref = ref[0]
			} else {
				ref = ''
			}
			title = orgName.textContent
		}
		let variant = {
			project: {
				value: ref,
				title
			},
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
	parentEl.querySelectorAll('idno').forEach((el, index) => {
		values.identity.sameAs.push({
			type: el.getAttribute('type'),
			cert: el.getAttribute('cert'),
			idno: el.textContent
		})
	})
}

export function addNotesJSON (parentEl: Element, values: Object) {
	values.description.descriptiveNote = []
	parentEl.querySelectorAll('note[type="general"]').forEach((el, index) => {
		values.description.descriptiveNote.push({
			value: el.textContent,
			lang: el.getAttribute('xml:lang').toLowerCase()
		})
	})

	values.description.projectNote = []
	parentEl.querySelectorAll('note[type="project-specific"]').forEach((el, index) => {
		let ref = ''
		let title = ''
		let orgName = el.querySelector('orgName')
		if (orgName) {
			ref = orgName.getAttribute('ref').match(/node\/\d+$/)
			if (ref !== null) {
				ref = ref[0]
			} else {
				ref = ''
			}
			title = orgName.textContent
		}

		values.description.projectNote.push({
			value: el.firstChild.textContent,
			lang: el.getAttribute('xml:lang').toLowerCase(),
			project: {
				value: ref,
				title
			}
		})
	})
}

export function addSourcesJSON (parentEl: Element, values: Object) {
	let listBibl = parentEl.querySelector('listBibl')
	if (listBibl) {
		values.sources.bibl = []
		listBibl.querySelectorAll('bibl').forEach((el, index) => {
			values.sources.bibl.push({
				name: el.textContent,
				idno: el.querySelector('ref').getAttribute('target')
			})
		})
	}
}
