// @flow
import {authpost} from '../../api/utils'

export type LoginDataType = {
	username: string,
	password: string
}

export async function loginAPI (data: LoginDataType) {
	return authpost('/auth', data)
}
