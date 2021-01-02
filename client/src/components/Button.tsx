import styled from 'styled-components';

export default styled.button<{ color: String }>`
	padding: 0 2rem;
	height: 2.5rem;
	border: 0;
	border-radius: 5rem;
	color: ${(props) => (props.color === 'primary' ? '#9045d6' : '#fff')};
	background-color: ${(props) =>
		props.color === 'primary' ? '#fff' : '#9045d6'};
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
	margin-top: 0;
	font-size: 1rem;
	font-family: Montserrat, sans-serif;
	line-height: 1.4;
	display: inline-block;
	text-align: center;
	text-decoration: none;
	cursor: pointer;
	&:hover {
		background-color: ${(props) =>
			props.color === 'primary' ? '#642BC0' : '#7E42DF'};
		color: #fff;
	}
`;
