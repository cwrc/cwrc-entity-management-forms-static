// @flow
import React from 'react'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import {DateTimePicker} from 'react-widgets'

import 'react-widgets/dist/css/react-widgets.css'

moment.locale('en')
momentLocalizer()

const DateFormat = {
	'YMD': 'YYYY-MM-DD',
	'YM': 'YYYY-MM',
	'Y': 'YYYY'
}

const getDateString = (date: Date, dateFormat: DateFormat = 'YMD') => {
	console.log('getDateString', date, dateFormat)
	let month = '' + (date.getMonth() + 1)
	let day = '' + date.getDate()
	let year = '' + date.getFullYear()

	year = year.padStart(4, '0')
	month = month.padStart(2, '0')
	day = day.padStart(2, '0')

	switch (dateFormat) {
	case DateFormat.Y:
		return year
	case DateFormat.YM:
		return [year, month].join('-')
	default:
		return [year, month, day].join('-')
	}
}

class DateComponent extends React.Component<Props, State> {
	currentDate = undefined
	dateFormat = DateFormat.YMD

	setCurrentDate = (value) => {
		let dateFormat = DateFormat.YMD
		if (value !== undefined && value !== '') {
			let splits = value.match(/-/g)
			if (splits === null) {
				dateFormat = DateFormat.Y
			} else if (splits.length === 1) {
				dateFormat = DateFormat.YM
			}
			this.currentDate = value
		}
		this.dateFormat = dateFormat
		console.log('setCurrentDate', value, dateFormat)
	}

	handleSelect = (value) => {
		console.log('select')
		// const dateStr = getDateString(value, this.dateFormat)
		this.dateFormat = DateFormat.YMD
	}

	handleFocus = (ev) => {
		console.log('focus')
		// this.setCurrentDate(ev.target.value)
	}

	// parse only happens after text input
	parseDate = (value) => {
		console.log('parse')
		this.setCurrentDate(value)
		if (this.dateFormat === DateFormat.Y) {
			value += '/01/01'
		}
		const date = new Date(value.replace(/-/g, '/'))
		return date
	}

	formatDate = (value, culture, localizer) => {
		console.log('format', this.dateFormat, value)
		const result = localizer.format(value, this.dateFormat, culture)
		console.log('format result', result)
		return result
	}

	render () {
		const name = this.props.input.name
		let value = this.props.input.value
		if (typeof value === 'string') {
			value = new Date(value.replace(/-/g, '/'))
			if (isNaN(value.getDate())) {
				value = null
			}
		}
		const changeFunc = this.props.changeFunc
		return (
			<DateTimePicker
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onSelect={this.handleSelect}
				onChange={(date, str) => {
					// TODO change not fired when day is added/removed and is '01'
					const val = getDateString(date, this.dateFormat)
					console.log('change', name, date, val)
					changeFunc.call(this, name, val)
				}}
				value={value}
				min={new Date(-3000, 1, 1)}
				max={new Date(3000, 12, 31)}
				// format='YYYY-MM-DD'
				// parse={['YYYY', 'YYYY-MM', 'YYYY-MM-DD']}
				format={this.formatDate}
				parse={this.parseDate}
				placeholder='YYYY-MM-DD'
				time={false}
			/>
		)
	}
}

export default DateComponent
