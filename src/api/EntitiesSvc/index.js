// @flow
import {get, put, post, parseJSON, parseXML} from '../utils'

import {json2xml as json2xmlPerson} from './Person/json2xml'
import {xml2json as xml2jsonPerson} from './Person/xml2json'

export const getPerson = async (id) =>
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`)
		.then(parseXML)
		.then(res => {
			return xml2jsonPerson(res.data)
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
