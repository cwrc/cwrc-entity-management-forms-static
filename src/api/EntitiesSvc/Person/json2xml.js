import {createXMLFromPath, getDateString} from '../../utils/conversion_utilities'

export const json2xml = (values) => {
	let xml = `<?xml version="1.0" encoding="UTF-8"?>
	<?xml-model href="http://www.tei-c.org/release/xml/tei/custom/schema/relaxng/tei_all.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?>
	<?xml-model href="http://www.tei-c.org/release/xml/tei/custom/schema/relaxng/tei_all.rng" type="application/xml"
		schematypens="http://purl.oclc.org/dsdl/schematron"?>
	<TEI xmlns="http://www.tei-c.org/ns/1.0">
		<teiHeader>
			<fileDesc>
				<titleStmt><title></title></titleStmt>
				<publicationStmt>
					<publisher>Canadian Writing Research Collaboratory (CWRC)</publisher>
					<availability><licence target="https://creativecommons.org/licenses/by/4.0/legalcode"><p/></licence></availability>
				</publicationStmt>
				<notesStmt><note>Person entity record</note></notesStmt>
				<sourceDesc><p>born digital</p></sourceDesc>
			</fileDesc>
		</teiHeader>
		<text>
			<body>
				<listPerson><person></person></listPerson>
			</body>
		</text>
	</TEI>`
	let xmlDoc
	if (window.DOMParser) {
		const parser = new DOMParser()
		xmlDoc = parser.parseFromString(xml, 'text/xml')
	} else {
		return null
	}

	let title = xmlDoc.querySelector('title')
	createXMLFromPath(title, '', values.identity.standardName)

	let person = xmlDoc.querySelector('person')
	// identity
	if (values.identity) {
		// standard name
		createXMLFromPath(person, 'persName[@type="standard"]/name', values.identity.standardName)
		// name components
		if (values.identity.nameParts) {
			for (let namePart of values.identity.nameParts) {
				let namePartEl = createXMLFromPath(person, 'persName[@type="prefered"]')
				if (values.identity.namePartsLang) {
					namePartEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', values.identity.namePartsLang)
				}
				if (namePart.type === 'role') {
					createXMLFromPath(namePartEl, 'roleName', namePart.value)
				} else {
					let nameEl = createXMLFromPath(namePartEl, 'name', namePart.value)
					let namePartType = namePart.type.replace(/\s+/g, '_')
					nameEl.setAttribute('type', namePartType)
				}
			}
		}
		// name variants
		if (values.identity.variants) {
			for (let variant of values.identity.variants) {
				let variantEl = createXMLFromPath(person, 'persName[@type="variant"]')
				if (variant.lang) {
					variantEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', variant.lang)
				}
				if (variant.type) {
					let variantType = variant.type.replace(/\s+/g, '_')
					variantEl.setAttribute('role', variantType)
				}
				if (variant.project) {
					createXMLFromPath(variantEl, `note/desc/orgName[@ref="${encodeURIComponent(process.env.REACT_APP_ENTITIES_HOST + '/' + variant.project)}"]`)
				}
				if (variant.parts) {
					for (let part of variant.parts) {
						createXMLFromPath(variantEl, `name[@type="${part.type}"]`, part.value)
					}
				}
			}
		}
		// same as
		if (values.identity.sameAs) {
			for (let sameAs of values.identity.sameAs) {
				let sameAsEl = createXMLFromPath(person, `idno[@type="${sameAs.type}"]`, sameAs.idno)
				if (sameAs.cert) {
					sameAsEl.setAttribute('cert', sameAs.cert)
				}
			}
		}
	}
	// description
	if (values.description) {
		// dates
		if (values.description.dates) {
			for (let date of values.description.dates) {
				let dateTypeEl = createXMLFromPath(person, date.type)
				let dateEl = createXMLFromPath(dateTypeEl, 'date')
				if (date.cert) {
					dateEl.setAttribute('cert', date.cert)
				}
				if (date.date1 && date.qualifier1) {
					dateEl.setAttribute(date.qualifier1, getDateString(date.date1))
				}
				if (date.date2 && date.qualifier2) {
					dateEl.setAttribute(date.qualifier2, getDateString(date.date2))
				}
				if (date.note) {
					createXMLFromPath(dateEl, 'note', date.note)
				}
				if (date.place) {
					createXMLFromPath(dateTypeEl, `placeName[@ref="${encodeURIComponent(date.place.idno)}"]`, date.place.name)
				}
			}
		}
		// properties
		let props = values.description.properties
		if (props) {
			// factuality
			if (props.factuality) {
				let traitEl = createXMLFromPath(person, 'trait[@type="factuality"]')
				if (props.factuality.cert) {
					traitEl.setAttribute('cert', props.factuality.cert)
				}
				createXMLFromPath(traitEl, 'ab', props.factuality.value)
			}
			// gender
			if (props.gender) {
				let sex = props.gender.join(' ')
				person.setAttribute('sex', sex)
			}
			// occupation
			if (props.occupation) {
				for (let occ of props.occupation) {
					let occEl = createXMLFromPath(person, 'occupation', occ.value)
					if (occ.cert) {
						occEl.setAttribute('cert', occ.cert)
					}
				}
			}
			// nationality
			if (props.nationality) {
				for (let nat of props.nationality) {
					let natEl = createXMLFromPath(person, 'nationality', nat.value)
					if (nat.cert) {
						natEl.setAttribute('cert', nat.cert)
					}
				}
			}
			// affiliation
			if (props.affiliation) {
				for (let aff of props.affiliation) {
					let affEl = createXMLFromPath(person, 'affiliation', aff.value)
					if (aff.cert) {
						affEl.setAttribute('cert', aff.cert)
					}
				}
			}
		}
		// description
		if (values.description.descriptiveNote) {
			for (let note of values.description.descriptiveNote) {
				let noteEl = createXMLFromPath(person, 'note[@type="general"]', note.value)
				if (note.lang) {
					noteEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', note.lang)
				}
			}
		}
		// project note
		if (values.description.projectNote) {
			for (let note of values.description.projectNote) {
				let noteEl = createXMLFromPath(person, 'note[@type="project-specific"]', note.value)
				if (note.lang) {
					noteEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', note.lang)
				}
				if (note.project) {
					createXMLFromPath(noteEl, `respons[@locus="value"]/desc/orgName[@ref="${encodeURIComponent(process.env.REACT_APP_ENTITIES_HOST + '/' + note.project)}"]`)
				}
			}
		}
	}
	// sources
	if (values.sources) {
		if (values.sources.bibl) {
			let listBibl = createXMLFromPath(person, 'listBibl')
			for (let bibl of values.sources.bibl) {
				let biblEl = createXMLFromPath(listBibl, 'bibl')
				createXMLFromPath(biblEl, 'title', bibl.name)
				let ref = createXMLFromPath(biblEl, 'ref')
				ref.setAttribute('source', bibl.type)
				ref.setAttribute('target', bibl.idno)
			}
		}
	}
	return xmlDoc
}
