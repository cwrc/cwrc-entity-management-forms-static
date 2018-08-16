export const required = value => {
	if (value === '' || value === null || value === undefined) {
		return 'Required'
	} else {
		return undefined
	}
}

export const latitude = value => {
	if (value !== undefined) {
		let latFloat = parseFloat(value)
		if (isNaN(latFloat)) {
			return 'Not a number'
		} else if (latFloat < 0 || latFloat > 90) {
			return 'Out of bounds (0 <= x <= 90)'
		}
	}
	return undefined
}

export const longitude = value => {
	if (value !== undefined) {
		let longFloat = parseFloat(value)
		if (isNaN(longFloat)) {
			return 'Not a number'
		} else if (longFloat < -180 || longFloat > 180) {
			return 'Out of bounds (-180 <= x <= 180)'
		}
	}
	return undefined
}

export const date = value => {
	if (value !== undefined) {
		if (value.match(/^\d{4}-\d{2}-\d{2}$/) !== null) {
			return undefined
		}
		if (value.match(/^\d{4}-\d{2}$/) !== null) {
			return undefined
		}
		if (value.match(/^\d{4}$/) !== null) {
			return undefined
		}
		return 'Not a valid date'
	}
	return undefined
}
