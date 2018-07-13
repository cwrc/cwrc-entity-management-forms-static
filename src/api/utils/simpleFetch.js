/**
 * @flow
 * @file Simple fetch wrapper
 */
import fetch from 'isomorphic-fetch'

// USAGE:
export const get = requestWrapper('GET')
// get('https://www.google.com')
export const post = requestWrapper('POST')
// post('https://www.google.com', data)
export const put = requestWrapper('PUT')
// put('https://www.google.com', data)

// Create request wrapper for certain method
function requestWrapper (method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH') {
	// Creates request to `url` with `data`
	return async (url: string, data: any = null) => {
		const body = data ? {body: JSON.stringify(data)} : {}

		const request = {
			method,
			headers: {},
			mode: process.env.NODE_ENV === 'development' ? 'cors' : 'same-origin',
			credentials: 'same-origin',
			...body
		}

		return fetch(url, request)
			.then(parseJSON)
			.catch((err: any) => err)
	}
}

async function parseJSON (res: Response): Object {
	const data = await res.json()
	const {status, ok} = res
	return {data, ok, status}
}
