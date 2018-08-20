import styled from 'styled-components'

export const StyledFooter = styled.footer`
	width: 100%;
	display: flex;
	align-items: center;
	background-color: ${props => props.theme.primaryColorLight};
	color: ${props => props.theme.primaryTextColor};
	height: 80px;
	min-height: 80px;
	padding: 1rem;
`
