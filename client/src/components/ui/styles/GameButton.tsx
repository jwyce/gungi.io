import styled from 'styled-components';

export default styled.button<{
	size: 'small' | 'normal';
	backgroundColor: string;
	backgroundColorHover: string;
	selected?: boolean;
}>`
	padding: ${(props) => (props.size === 'normal' ? '0 1.5rem' : '0 1rem')};
	height: ${(props) => (props.size === 'normal' ? '2.5rem' : '1.7rem')};
	border: 0;
	border-radius: ${(props) => (props.size === 'normal' ? '.7rem' : '.3rem')};
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
	font-weight: ${(props) => (props.size === 'normal' ? '700' : '600')};
	margin: ${(props) => (props.size === 'normal' ? '0 10px' : '0 5px')};
	font-size: ${(props) => (props.size === 'normal' ? '1.5rem' : '1rem')};
	font-family: Montserrat, sans-serif;
	line-height: ${(props) => (props.size === 'normal' ? '1.4' : '1')};
	display: inline-block;
	text-align: center;
	text-decoration: none;
	cursor: pointer;

	&:hover {
		background-color: ${(props) => props.backgroundColorHover};
	}
	box-shadow: ${(props) =>
		props.selected ? 'inset 0 -0.175em #9045d6' : 'none'};

	@media (max-width: 400px) {
		font-size: 1rem;
		padding: 0 1rem;
		height: 2rem;
		border-radius: 0.5rem;
	}
`;
