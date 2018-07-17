// @flow
import {get, put, post, parseJSON} from '../utils'

import {json2xml as json2xmlPerson} from './Person/json2xml'
import {xml2json as xml2jsonPerson} from './Person/xml2json'

export const getPerson = async (id) =>
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`)
		.then(parseXML)
		.then(res => {
			return {data: xml2jsonPerson(res.data)}
		})

export const postPerson = async (data) => {
	let xml = json2xmlPerson(data)
	let s = new XMLSerializer()
	let xmlStr = s.serializeToString(xml)
	return post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person`, xmlStr).then(parseJSON)
}

export const putPerson = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`, data)

export const getPlace = async (id) =>
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`).then(parseXML)

export const postPlace = async (data) =>
	post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place`, data).then(parseJSON)

export const putPlace = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`, data)

export const getOrganization = async (id) =>
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`).then(parseXML)

export const postOrganization = async (data) =>
	post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization`, data).then(parseJSON)

export const putOrganization = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`, data)

async function parseXML (res: Response): Object {
	let text = await res.text()
	text = JSON.parse(text)
	const parser = new DOMParser()
	const xml = parser.parseFromString(text, 'text/xml')
	const {status, ok} = res
	return {data: xml, ok, status}
}
