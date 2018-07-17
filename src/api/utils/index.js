// @flow
export {get, post, put} from './simpleFetch'

export const parseJSON = async function (res: Response): Object {
	const data = await res.json()
	const {status, ok} = res
	return {data, ok, status}
}
