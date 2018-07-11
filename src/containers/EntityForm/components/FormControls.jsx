// @flow
import React from 'react'
import {
	Form,
	Label,
	Dropdown,
	Input as InputComponent
} from 'semantic-ui-react'

const InputField = ({
	input,
	label,
	labelText = null,
	required,
	width,
	floated,
	inline,
	size,
	meta: {touched, error},
	...rest
}: any) => (
	<Form.Field error={!!(touched && error)} inline={inline} required={required} width={width} floated={floated}>
		<label htmlFor={rest.id || rest.name || ''}>{label}</label>
		<InputComponent
			label={labelText}
			{...input}
			{...rest}
		/>
		{touched && error ? (
			<Label basic color="red" pointing>
				{error}
			</Label>
		) : null}
	</Form.Field>
)

const DropdownComponent = ({
	input,
	label,
	meta: {touched, error},
	required,
	width,
	floated,
	...rest
}: any) => (
	<Form.Field error={!!(touched && error)} required={required} inline floated={floated} width={width}>
		<label htmlFor={rest.id || rest.name || ''}>{label}</label>
		<Dropdown
			{...input}
			{...rest}
			selection
			floated={floated}
			value={input.value}
			onChange={(param, data) => { input.onChange(data.value) }}
		/>
		{touched && error ? (
			<Label basic color="red" pointing>
				{error}
			</Label>
		) : null}
	</Form.Field>
)

/**
 * Allows for the addition of custom values
 */
class DropdownAddableComponent extends React.Component<Props, State> {
	state = {options: this.props.options}

	handleAddition = (e, {value}) => {
		this.setState({
			options: [{text: value, value}, ...this.state.options]
		})
	}

	render () {
		const {
			input,
			label,
			meta: {touched, error},
			required,
			width,
			floated,
			...rest
		} = this.props
		const options = this.state.options
		return (
			<Form.Field error={!!(touched && error)} required={required} inline floated={floated} width={width}>
				<label htmlFor={rest.id || rest.name || ''}>{label}</label>
				<Dropdown
					{...input}
					{...rest}
					selection
					search
					allowAdditions
					options={options}
					floated={floated}
					value={input.value}
					onChange={(param, data) => { input.onChange(data.value) }}
					onAddItem={this.handleAddition}
				/>
				{touched && error ? (
					<Label basic color="red" pointing>
						{error}
					</Label>
				) : null}
			</Form.Field>
		)
	}
}

export {InputField, DropdownComponent, DropdownAddableComponent}
