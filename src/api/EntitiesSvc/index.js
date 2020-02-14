// @flow
import {get, put, post, parseJSON, parseXML} from '../utils'

import {json2xml as json2xmlPerson} from './Person/json2xml'
import {xml2json as xml2jsonPerson} from './Person/xml2json'
import {json2xml as json2xmlOrganization} from './Organization/json2xml'
import {xml2json as xml2jsonOrganization} from './Organization/xml2json'
import {json2xml as json2xmlPlace} from './Place/json2xml'
import {xml2json as xml2jsonPlace} from './Place/xml2json'

import {getCollectionId} from '../CollectionsSvc'

const getXmlFromJson = (type, data) => {
	let xml
	if (type === 'person') {
		xml = json2xmlPerson(data)
	} else if (type === 'place') {
		xml = json2xmlPlace(data)
	} else if (type === 'organization') {
		xml = json2xmlOrganization(data)
	}
	const s = new XMLSerializer()
	const xmlStr = s.serializeToString(xml)
	console.log(xmlStr)
	return xmlStr
}

export const isEntityLocked = async (id) => {
	if (process.env.NODE_ENV === 'development') {
		return false;
	} else {
		return get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_LOCK_TEMPLATE}/${id}`)
			.then(parseJSON)
			.catch(err => {
				console.warn('error fetching lock status!', err)
				// if we can't determine if it's locked, best err on the side of caution
				return true
			})
			.then(res => {
				return res.data.locked
			})
	}
}

export const getPerson = async (id) => {
	return isEntityLocked(id).then(res => {
		if (res === true) {
			throw new Error('locked')
		} else {
			if (process.env.NODE_ENV === 'development') {
				return get(`${process.env.REACT_APP_ENTITIES_HOST}/sample_person_entity.xml`)
					.then(parseXML)
					.then(res => {
						try {
							return xml2jsonPerson(res.data)
						} catch (e) {
							throw new Error(e)
						}
					})
			} else {
				return get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`)
					.then(parseXML)
					.then(res => {
						try {
							return xml2jsonPerson(res.data)
						} catch (e) {
							throw new Error(e)
						}
					})
			}
		}
	})
}

export const postPerson = async (data) => {
	const xmlStr = getXmlFromJson('person', data)
	const collectionId = getCollectionId('person')
	return post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person`, {collectionPID: collectionId, tei: xmlStr}).then(parseJSON)
}

export const putPerson = async (id, data) => {
	const xmlStr = getXmlFromJson('person', data)
	return put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`, xmlStr).then(parseJSON)
}

export const getPlace = async (id) => {
	return isEntityLocked(id).then(res => {
		if (res === true) {
			throw new Error('locked')
		} else {
			if (process.env.NODE_ENV === 'development') {
				return get(`${process.env.REACT_APP_ENTITIES_HOST}/sample_place_entity.xml`)
					.then(parseXML)
					.then(res => {
						try {
							return xml2jsonPlace(res.data)
						} catch (e) {
							throw new Error(e)
						}
					})
			} else {
				return get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`)
					.then(parseXML)
					.then(res => {
						try {
							return xml2jsonPlace(res.data)
						} catch (e) {
							throw new Error(e)
						}
					})
			}
		}
	})
}

export const postPlace = async (data) => {
	const xmlStr = getXmlFromJson('place', data)
	const collectionId = getCollectionId('place')
	return post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place`, {collectionPID: collectionId, tei: xmlStr}).then(parseJSON)
}
export const putPlace = async (id, data) => {
	const xmlStr = getXmlFromJson('place', data)
	return put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`, xmlStr).then(parseJSON)
}

export const getOrganization = async (id) => {
	return isEntityLocked(id).then(res => {
		if (res === true) {
			throw new Error('locked')
		} else {
			return get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`)
				.then(parseXML)
				.then(res => {
					try {
						return xml2jsonOrganization(res.data)
					} catch (e) {
						throw new Error(e)
					}
				})
		}
	})
}

export const postOrganization = async (data) => {
	const xmlStr = getXmlFromJson('organization', data)
	const collectionId = getCollectionId('organization')
	return post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization`, {collectionPID: collectionId, tei: xmlStr}).then(parseJSON)
}

export const putOrganization = async (id, data) => {
	const xmlStr = getXmlFromJson('organization', data)
	return put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`, xmlStr).then(parseJSON)
}
