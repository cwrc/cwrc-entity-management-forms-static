// @flow
import {get, put, post} from '../utils'

export const getPerson = async (id) => {
	console.log(`trying ${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`)
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`)
}
export const postPerson = async (data) =>
	post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person`, data)

export const putPerson = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`, data)

export const getPlace = async (id) =>
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`)

export const postPlace = async (data) =>
	post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place`, data)

export const putPlace = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`, data)

export const getOrganization = async (id) =>
	get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`)

export const postOrganization = async (data) =>
	post(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization`, data)

export const putOrganization = async (id, data) =>
	put(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`, data)
