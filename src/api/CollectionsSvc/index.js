// @flow
import Cookies from 'js-cookie'
import {get, parseJSON} from '../utils'

const COOKIE_NAME = 'cwrc-entity-collection'

const IS_NODE = navigator.userAgent.toLowerCase().indexOf('node.js') !== -1

export const getCollectionId = () => {
	if (IS_NODE) { // can't access cookies when using react-snapshot
		return ''
	}
	return Cookies.get(COOKIE_NAME)
}

export const setCollectionId = (id) => {
	Cookies.set(COOKIE_NAME, id, { expires: 1 })
}

export const getCollections = async () => {
	return get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_COLLECTIONS_BASE}`)
		.then(parseJSON)
		.catch(err => {
			console.warn('error fetching collections!', err)
			return {
				data: {
					response: {
						docs: [
							{PID: 'cwrc:test1', fgs_label_s: 'CWRC Test Entity Collection 1'},
							{PID: 'cwrc:test2', fgs_label_s: 'CWRC Test Entity Collection 2'},
							{PID: 'cwrc:test3', fgs_label_s: 'CWRC Test Entity Collection 3'}
						]
					}
				}
			}
		})
		.then(res => {
			const collections = []
			for (let d of res.data.response.docs) {
				collections.push({
					value: d.PID,
					text: d.fgs_label_s
				})
			}
			return collections
		})
}
