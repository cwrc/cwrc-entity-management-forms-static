// @flow
import React from 'react'
import marked from 'marked'
import Prism from '../../../static/prism'
import { values as valuesDecorator } from 'redux-form'

const prettify = markdown =>
	markdown.replace(/```(?:javascript|jsx?)([\s\S]+?)```/g,
		(match, code) =>
			`<pre class="language-jsx"><code class="language-jsx">${Prism.highlight(code, Prism.languages.jsx)}</code></pre>`)

const renderer = new marked.Renderer()
renderer.heading = (text, level) => {
	const id = text.toLowerCase().replace(/[^\w]+/g, '-')
	return `<h${level}  id="${id}">${text} <a href="#${id}" >#</a></h${level}>`
}

const Markdown = ({ content }: any) => {
	return <div dangerouslySetInnerHTML={{ __html: marked(prettify(content), { renderer }) }}/>
}

const Code = ({ source, language }: any) => (
	<Markdown content={'```' + language + source + '```'}/>
)

Code.defaultProps = {
	language: 'js'
}

const Values = ({ form, format = values => JSON.stringify(values, null, 2) }: any) => {
	const decorator = valuesDecorator({ form })
	const component = ({ values }: any) =>
		(
			<div>
				<h2>Values</h2>
				<Code source={format(values)}/>
			</div>
		)
	const Decorated = decorator(component)
	return <Decorated/>
}

export default Values
