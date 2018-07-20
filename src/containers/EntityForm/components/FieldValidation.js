const required = value => {
	if (value === '' || value === null || value === undefined) {
		return 'Required'
	} else {
		return undefined
	}
}

export {required}
