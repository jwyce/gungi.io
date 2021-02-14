import styled from 'styled-components';

export default styled.button<{
	backgroundColor: string;
	backgroundColorHover: string;
	selected?: boolean;
}>`
	padding: 0 1.5rem;
	height: 2.5rem;
	border: 0;
	border-radius: 0.7rem;
	color: #fff;
	background-color: ${(props) => props.backgroundColor};
	-webkit-filter: opacity(1);
	filter: opacity(1);
	outline: none;
	transition: opacity 0.6s, transform 0.6s, color 0.4s, background-color 0.4s,
		-webkit-filter 0.2s;
	transition: filter 0.2s, opacity 0.6s, transform 0.6s, color 0.4s,
		background-color 0.4s;
	transition: filter 0.2s, opacity 0.6s, transform 0.6s, color 0.4s,
		background-color 0.4s, -webkit-filter 0.2s;
	font-weight: 700;
	margin: 0 10px;
	font-size: 1.5rem;
	font-family: Montserrat, sans-serif;
	line-height: 1.4;
	display: inline-block;
	text-align: center;
	text-decoration: none;
	cursor: pointer;

	&:hover {
		background-color: ${(props) => props.backgroundColorHover};
	}
	box-shadow: ${(props) =>
		props.selected ? 'inset 0 -0.175em #9045d6' : 'none'};
`;
