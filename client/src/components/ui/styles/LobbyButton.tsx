import styled from 'styled-components';

export default styled.button<{ size: 'normal' | 'small' }>`
	padding: ${(props) => (props.size === 'normal' ? '0 1.5rem' : '0 1rem')};
	height: ${(props) => (props.size === 'normal' ? '2.5rem' : '1.7rem')};
	border: 0;
	border-radius: ${(props) => (props.size === 'normal' ? '.7rem' : '.3rem')};
	color: #fff;
	background-color: #252036;
	-webkit-filter: opacity(1);
	filter: opacity(1);
	outline: none;
	transition: opacity 0.6s, transform 0.6s, color 0.4s, background-color 0.4s,
		-webkit-filter 0.2s;
	transition: filter 0.2s, opacity 0.6s, transform 0.6s, color 0.4s,
		background-color 0.4s;
	transition: filter 0.2s, opacity 0.6s, transform 0.6s, color 0.4s,
		background-color 0.4s, -webkit-filter 0.2s;
	font-size: 1rem;
	font-weight: ${(props) => (props.size === 'normal' ? '700' : '600')};
	margin: ${(props) => (props.size === 'normal' ? '10px' : '0 5px')};
	font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI',
		sans-serif;
	line-height: ${(props) => (props.size === 'normal' ? '1.4' : '1')};
	display: inline-block;
	text-align: center;
	text-decoration: none;
	cursor: pointer;
	&:hover {
		background-color: #2b234d;
	}
`;
