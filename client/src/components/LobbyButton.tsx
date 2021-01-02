import styled from 'styled-components';

export default styled.button`
	padding: 0 2rem;
	height: 2.5rem;
	border: 0;
	border-radius: 0.7rem;
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
	font-weight: 700;
	margin: 10px;
	font-size: 1rem;
	font-family: Montserrat, sans-serif;
	line-height: 1.4;
	display: inline-block;
	text-align: center;
	text-decoration: none;
	cursor: pointer;
	&:hover {
		background-color: #2b234d;
	}
`;
