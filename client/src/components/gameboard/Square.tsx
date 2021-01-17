import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ highlight: boolean; hover: boolean }>`
	background-color: ${(props) =>
		props.highlight ? '#a152ff66' : 'transparent'};
	z-index: 3;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	position: relative;
	border: ${(props) => (props.hover ? '4px solid #b683ca' : 'none')};
`;

const Hint = styled.div<{ show: boolean; capture: boolean }>`
	height: 40%;
	left: 0;
	position: absolute;
	top: 0;
	width: 40%;
	background-color: ${(props) =>
		props.capture ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
	padding: 4.2%;
	background-clip: content-box;
	border-radius: 50%;
	box-sizing: border-box;
	pointer-events: none;
	transform: translate(75%, 75%);
	opacity: ${(props) => (props.show ? '1' : '0')};
`;

interface SquareProps {
	children: React.ReactNode;
	highlight: boolean;
	hasPiece: boolean;
	hint: boolean;
	hover: boolean;
}

export const Square: React.FC<SquareProps> = (props) => {
	return (
		<Wrapper highlight={props.highlight} hover={props.hover}>
			{props.children}
			<Hint show={props.hint} capture={props.hasPiece} />
		</Wrapper>
	);
};
