// @flow
import moment from 'moment'

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

export const isDate = value => {
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

export const dateRange = (dateRange: Object) => {
	if (dateRange.isRange) {
		const q1 = dateRange.qualifier1
		const q2 = dateRange.qualifier2
		if (q1 !== undefined && q2 !== undefined) {
			if (q1 === q2) return {qualifier2: 'No duplicate qualifiers'}
			const d1 = dateRange.date1
			const d2 = dateRange.date2
			if (d1 !== undefined && d2 !== undefined && isDate(d1) === undefined && isDate(d2) === undefined) {
				const m1 = moment(d1.replace(/-/g, '/'))
				const m2 = moment(d2.replace(/-/g, '/'))
				if (q1 === 'from-iso' && q2 === 'to-iso' && m1.isSameOrAfter(m2)) return {date2: 'To date must occur after From date'}
				if (q2 === 'from-iso' && q1 === 'to-iso' && m2.isSameOrAfter(m1)) return {date2: 'From date must occur before To date'}
				if (q1 === 'from-iso' && q2 === 'notAfter-iso' && m1.isAfter(m2)) return {date2: 'Not After date must occur after From date'}
				if (q2 === 'from-iso' && q1 === 'notAfter-iso' && m2.isAfter(m1)) return {date2: 'From date must occur before Not After date'}
				if (q1 === 'from-iso' && q2 === 'notBefore-iso' && m1.isBefore(m2)) return {date2: 'Not Before date must occur before From date'}
				if (q2 === 'from-iso' && q1 === 'notBefore-iso' && m2.isBefore(m1)) return {date2: 'From date must occur after Not Before date'}
				if (q1 === 'notBefore-iso' && q2 === 'notAfter-iso' && m1.isAfter(m2)) return {date2: 'Not After date must occur after Not Before date'}
				if (q2 === 'notBefore-iso' && q1 === 'notAfter-iso' && m2.isAfter(m1)) return {date2: 'Not Before date must occur before Not After date'}
				if (q1 === 'notBefore-iso' && q2 === 'to-iso' && m1.isAfter(m2)) return {date2: 'To date must occur after Not Before date'}
				if (q2 === 'notBefore-iso' && q1 === 'to-iso' && m2.isAfter(m1)) return {date2: 'Not Before date must occur before To date'}
				if (q1 === 'notAfter-iso' && q2 === 'to-iso' && m1.isAfter(m2)) return {date2: 'To date must occur before Not After date'}
				if (q2 === 'notAfter-iso' && q1 === 'to-iso' && m2.isAfter(m1)) return {date2: 'Not After date must occur after To date'}
			}
		}
	}
	return undefined
}
