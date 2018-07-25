import {createXMLFromPath, doIdentity, doNotes, doSources} from '../../utils/conversion_utilities'

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

	let person = xmlDoc.querySelector('person')

	doIdentity(person, 'persName', values)

	// description
	// dates
	if (values.description.dates) {
		for (let date of values.description.dates) {
			let dateTypeEl = createXMLFromPath(person, date.type)
			let dateEl = createXMLFromPath(dateTypeEl, 'date')
			if (date.cert) {
				dateEl.setAttribute('cert', date.cert)
			}
			if (date.date1 && date.qualifier1) {
				dateEl.setAttribute(date.qualifier1, date.date1)
			}
			if (date.date2 && date.qualifier2) {
				dateEl.setAttribute(date.qualifier2, date.date2)
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
	}

	doNotes(person, values)

	doSources(person, values)

	return xmlDoc
}
