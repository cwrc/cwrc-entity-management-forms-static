// @flow
import {getPerson, putPerson, postPerson, getPlace, putPlace, postPlace, getOrganization, putOrganization, postOrganization} from '../../api/EntitiesSvc'

// these are imported into the component and then mapped to dispatch
export const POST_PERSON = (data) => ({
	type: 'PERSON_POST',
	payload: postPerson(data)
})
export const PUT_PERSON = (id, data) => ({
	type: 'PERSON_PUT',
	payload: putPerson(id, data)
})
export const GET_PERSON = (id) => ({
	type: 'PERSON_GET',
	payload: getPerson(id)
})

export const POST_PLACE = (data) => ({
	type: 'PLACE_POST',
	payload: postPlace(data)
})
export const PUT_PLACE = (id, data) => ({
	type: 'PLACE_PUT',
	payload: putPlace(id, data)
})
export const GET_PLACE = (id) => ({
	type: 'PLACE_GET',
	payload: getPlace(id)
})

export const POST_ORGANIZATION = (data) => ({
	type: 'ORGANIZATION_POST',
	payload: postOrganization(data)
})
export const PUT_ORGANIZATION = (id, data) => ({
	type: 'ORGANIZATION_PUT',
	payload: putOrganization(id, data)
})
export const GET_ORGANIZATION = (id) => ({
	type: 'ORGANIZATION_GET',
	payload: getOrganization(id)
})
