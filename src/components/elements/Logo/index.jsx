// @flow
import React from 'react'
import {Image as ImageComponent} from 'semantic-ui-react'

const LogoSmall = ({
	white,
	...rest
}: any) => {
	let logoImg
	if (white === true) {
		logoImg = require('../../../static/images/Logo_White.png')
	} else {
		logoImg = require('../../../static/images/Logo.png')
	}
	return <ImageComponent src={logoImg} {...rest} />
}

const LogoLarge = ({
	...rest
}: any) => {
	const logoImg = require('../../../static/images/cwrc_logo_full_white_300.png')
	return <ImageComponent src={logoImg} {...rest} />
}

export {LogoSmall, LogoLarge}
