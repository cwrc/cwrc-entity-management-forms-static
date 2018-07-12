// @flow
import {get, put, post} from '../utils'

export const getPerson = async (id) => {
	get(`http://${process.env.HOST}:${process.env.PORT}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`)
}
export const postPerson = async (data) =>
	post(`http://${process.env.HOST}:${process.env.PORT}/${process.env.REACT_APP_ENTITIES_BASE}/person`, data)

export const putPerson = async (id, data) =>
	put(`http://${process.env.HOST}:${process.env.PORT}/${process.env.REACT_APP_ENTITIES_BASE}/person/${id}`, data)

export const getPlace = async (id) =>
	get(`http://${process.env.HOST}:${process.env.PORT}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`)

export const postPlace = async (data) =>
	post(`http://${process.env.HOST}:${process.env.PORT}/${process.env.REACT_APP_ENTITIES_BASE}/place`, data)

export const putPlace = async (id, data) =>
	put(`http://${process.env.HOST}:${process.env.PORT}/${process.env.REACT_APP_ENTITIES_BASE}/place/${id}`, data)

export const getOrganization = async (id) =>
	get(`http://${process.env.HOST}:${process.env.PORT}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`)

export const postOrganization = async (data) =>
	post(`http://${process.env.HOST}:${process.env.PORT}/${process.env.REACT_APP_ENTITIES_BASE}/organization`, data)

export const putOrganization = async (id, data) =>
	put(`http://${process.env.HOST}:${process.env.PORT}/${process.env.REACT_APP_ENTITIES_BASE}/organization/${id}`, data)
