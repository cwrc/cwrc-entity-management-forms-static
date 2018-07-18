// @flow
export {get, post, put} from './simpleFetch'

export const parseJSON = async function (res: Response): Object {
	const data = await res.json()
	const {status, ok} = res
	return {data, ok, status}
}

export const parseXML = async function (res: Response): Object {
	let text = await res.text()
	try {
		text = JSON.parse(text)
	} catch (e) {
	}
	const parser = new DOMParser()
	const xml = parser.parseFromString(text, 'text/xml')
	const {status, ok} = res
	return {data: xml, ok, status}
}
