// @flow
import {get, put, post} from '../utils'

export const getPerson = async (id) => {
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`).then(parseXML)
}
export const postPerson = async (data) =>
	post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person`, data).then(parseJSON)

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

async function parseJSON (res: Response): Object {
	const data = await res.json()
	const {status, ok} = res
	return {data, ok, status}
}
