import styled from 'styled-components';

export default styled.input`
	font-family: Montserrat, Sans-serif;
	font-weight: bold;
	color: #642bc0;
	font-size: 18px;
	padding: 8px 10px;
	width: 100%;
	margin: 10px;
	background: #fff;
	border: none;
	border-radius: 0.5em;
	::placeholder {
		color: #9044d6;
		opacity: 46%;
	}
	&:focus {
		outline: none;
		box-shadow: 0 0 10px #642bc0;
	}
`;
