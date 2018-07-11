// @flow
import {get, put, post} from '../utils'

export const getPerson = async (id) => {
	// for testing:
	return get('https://jsonplaceholder.typicode.com/posts/1')
	// REPLACE WITH THIS ONCE YOU KNOW THE CWRC API CALLS:
	// get(`http://${process.env.HOST}:${process.env.PORT}/PATH TO THE ENTITY GET GOES HERE and probably incorporate id`)
}
export const postPerson = async (data) =>
	post(`http://${process.env.HOST}:${process.env.PORT}/PATH TO THE ENTITY POST GOES HERE`, data)

export const putPerson = async (id, data) =>
	put(`http://${process.env.HOST}:${process.env.PORT}/PATH TO THE ENTITY PUT GOES HERE probably with id`, data)

export const getPlace = async (id) =>
	get(`http://${process.env.HOST}:${process.env.PORT}/PATH TO THE ENTITY GET GOES HERE and probably incorporate id`)

export const postPlace = async (data) =>
	post(`http://${process.env.HOST}:${process.env.PORT}/PATH TO THE ENTITY POST GOES HERE`, data)

export const putPlace = async (id, data) =>
	put(`http://${process.env.HOST}:${process.env.PORT}/PATH TO THE ENTITY PUT GOES HERE probably with id`, data)

export const getOrganization = async (id) =>
	get(`http://${process.env.HOST}:${process.env.PORT}/PATH TO THE ENTITY GET GOES HERE and probably incorporate id`)

export const postOrganization = async (data) =>
	post(`http://${process.env.HOST}:${process.env.PORT}/PATH TO THE ENTITY POST GOES HERE`, data)

export const putOrganization = async (id, data) =>
	put(`http://${process.env.HOST}:${process.env.PORT}/PATH TO THE ENTITY PUT GOES HERE probably with id`, data)
