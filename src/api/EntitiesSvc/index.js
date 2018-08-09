// @flow
import {get, put, post, parseJSON, parseXML} from '../utils'

import {json2xml as json2xmlPerson} from './Person/json2xml'
import {xml2json as xml2jsonPerson} from './Person/xml2json'
import {json2xml as json2xmlOrganization} from './Organization/json2xml'
import {xml2json as xml2jsonOrganization} from './Organization/xml2json'
import {json2xml as json2xmlPlace} from './Place/json2xml'
import {xml2json as xml2jsonPlace} from './Place/xml2json'

export const getPerson = async (id) =>
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`)
		.then(parseXML)
		.then(res => {
			try {
				return xml2jsonPerson(res.data)
			} catch (e) {
				throw new Error(e)
			}
		})

export const postPerson = async (data) => {
	let xml = json2xmlPerson(data)
	let s = new XMLSerializer()
	let xmlStr = s.serializeToString(xml)
	console.log(xmlStr)
	return post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person`, xmlStr).then(parseJSON)
}

export const putPerson = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`, data)

export const getPlace = async (id) =>
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`)
		.then(parseXML)
		.then(res => {
			try {
				return xml2jsonPlace(res.data)
			} catch (e) {
				throw new Error(e)
			}
		})

export const postPlace = async (data) => {
	let xml = json2xmlPlace(data)
	let s = new XMLSerializer()
	let xmlStr = s.serializeToString(xml)
	console.log(xmlStr)
	return post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place`, xmlStr).then(parseJSON)
}
export const putPlace = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`, data)

export const getOrganization = async (id) =>
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`)
		.then(parseXML)
		.then(res => {
			try {
				return xml2jsonOrganization(res.data)
			} catch (e) {
				throw new Error(e)
			}
		})

export const postOrganization = async (data) => {
	let xml = json2xmlOrganization(data)
	let s = new XMLSerializer()
	let xmlStr = s.serializeToString(xml)
	console.log(xmlStr)
	return post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization`, xmlStr).then(parseJSON)
}

export const putOrganization = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`, data)
