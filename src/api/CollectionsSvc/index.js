// @flow
import Cookies from 'js-cookie'
import {get, parseJSON} from '../utils'
import {getCollectionId as getCollectionIdFromURL} from '../../selectors'

const IS_NODE = navigator.userAgent.toLowerCase().indexOf('node.js') !== -1

export const getCollectionId = (entityType) => {
	if (IS_NODE) { // can't access cookies when using react-snapshot
		return ''
	} else {
		// collectionId in URL overrides any set cookie
		const collectionId = getCollectionIdFromURL()
		if (collectionId !== undefined) {
			return collectionId
		} else {
			return Cookies.get(`${process.env.REACT_APP_COLLECTIONS_COOKIE_BASE}-${entityType}`)
		}
	}
}

export const setCollectionId = (entityType, id) => {
	const expiry = 1 / 12 // 2 hours
	Cookies.set(`${process.env.REACT_APP_COLLECTIONS_COOKIE_BASE}-${entityType}`, id, { expires: expiry, path: '/' })
}

export const getCollections = async () => {
	return get(`${process.env.REACT_APP_ENTITIES_HOST}/${process.env.REACT_APP_COLLECTIONS_BASE}`)
		.then(parseJSON)
		.catch(err => {
			console.warn('error fetching collections!', err)
			if (process.env.NODE_ENV === 'development') {
				return {
					data: {
						response: {
							docs: [
								{PID: 'cwrc:personEntityCollection', fgs_label_s: 'CWRC Person Entity Collection'},
								{PID: 'cwrc:organizationEntityCollection', fgs_label_s: 'CWRC Organization Entity Collection'},
								{PID: 'cwrc:placeEntityCollection', fgs_label_s: 'CWRC Place Entity Collection'},
								{PID: 'reed:personEntityCollection', fgs_label_s: 'Reed Person Entity Collection'},
								{PID: 'reed:organizationEntityCollection', fgs_label_s: 'Reed Organization Entity Collection'},
								{PID: 'reed:placeEntityCollection', fgs_label_s: 'Reed Place Entity Collection'}
							]
						}
					}
				}
			} else {
				return {
					data: {
						response: {
							docs: []
						}
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
