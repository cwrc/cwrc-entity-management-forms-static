// @flow
import {get, put, post} from '../utils'

const options = {
	credentials: 'same-origin'
}

export const getPerson = async (id) => {
	console.log(`trying ${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`)
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`, null, options)
}
export const postPerson = async (data) =>
	post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person`, data, options)

export const putPerson = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`, data, options)

export const getPlace = async (id) =>
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`, null, options)

export const postPlace = async (data) =>
	post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place`, data, options)

export const putPlace = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`, data, options)

export const getOrganization = async (id) =>
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`, null, options)

export const postOrganization = async (data) =>
	post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization`, data, options)

export const putOrganization = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`, data, options)
