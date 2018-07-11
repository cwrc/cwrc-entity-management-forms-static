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
			let el = parent.ownerDocument.createElement(tagName)
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
