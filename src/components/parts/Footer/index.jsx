/**
 * @flow
 */
import React from 'react'
import {LogoLarge} from '../../elements/Logo'
import {StyledFooter} from './style'

const Footer = () => {
	return (
		<StyledFooter>
			<a href='https://cwrc.ca' target='_blank' rel='noopener noreferrer'>
				<LogoLarge alt='CWRC / CSÉC: Canadian Writing Research Collaboratory' />
			</a>
		</StyledFooter>
	)
}

export default Footer
