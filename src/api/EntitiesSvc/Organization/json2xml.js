import {createXMLFromPath, getDateString, addIdentityXML, addNotesXML, addSourcesXML} from '../../utils/conversion_utilities'

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
				<notesStmt><note>Organization entity record</note></notesStmt>
				<sourceDesc><p>born digital</p></sourceDesc>
			</fileDesc>
		</teiHeader>
		<text>
			<body>
				<listOrg><organization></organization></listOrg>
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

	let organization = xmlDoc.querySelector('organization')

	addIdentityXML(organization, 'orgName', values)

	// description
	if (values.description) {
		// dates
		if (values.description.dates) {
			for (let date of values.description.dates) {
				let dateEl = createXMLFromPath(organization, `event[@type="${date.type}"]`)
				if (date.cert) {
					dateEl.setAttribute('cert', date.cert)
				}
				if (date.date1 && date.qualifier1) {
					dateEl.setAttribute(date.qualifier1, getDateString(date.date1))
				}
				if (date.date2 && date.qualifier2) {
					dateEl.setAttribute(date.qualifier2, getDateString(date.date2))
				}
				let descEl = createXMLFromPath(dateEl, 'desc')
				createXMLFromPath(descEl, 'desc', date.note)
				if (date.place) {
					createXMLFromPath(descEl, `placeName[@ref="${encodeURIComponent(date.place.idno)}"]`, date.place.name)
				}
			}
		}
		// properties
		let props = values.description.properties
		if (props) {
			// factuality
			if (props.factuality) {
				let traitEl = createXMLFromPath(organization, 'trait[@type="factuality"]')
				if (props.factuality.cert) {
					traitEl.setAttribute('cert', props.factuality.cert)
				}
				createXMLFromPath(traitEl, 'ab', props.factuality.value)
			}
		}
		addNotesXML(organization, values)
	}
	// sources
	if (values.sources) {
		addSourcesXML(organization, values)
	}

	return xmlDoc
}
