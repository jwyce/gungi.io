import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { GungiStoreContext } from 'src/stores/GungiStore';
import styled from 'styled-components';

const Wrapper = styled.div<{ highlight: boolean; hover: boolean }>`
	background-color: ${(props) =>
		props.highlight ? '#a152ff66' : 'transparent'};
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	position: relative;
	outline: ${(props) => (props.hover ? '5px solid #b683ca' : 'none')};
	outline-offset: ${(props) => (props.hover ? '-4.5px' : '0')};
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
	z-index: 5;
	opacity: ${(props) => (props.show ? '1' : '0')};
`;

interface SquareProps {
	children: React.ReactNode;
	highlight: boolean;
	hasPiece: boolean;
	hint: boolean;
}

export const Square: React.FC<SquareProps> = observer((props) => {
	const [isOver, setIsOver] = useState(false);
	const gungiStore = useContext(GungiStoreContext);

	return (
		<Wrapper
			highlight={props.highlight}
			hover={isOver}
			onMouseOver={() => {
				setIsOver(gungiStore.isDragging);
			}}
			onMouseUp={() => {
				setIsOver(false);
			}}
			onMouseLeave={() => {
				setIsOver(false);
			}}
		>
			{props.children}
			<Hint show={props.hint} capture={props.hasPiece} />
		</Wrapper>
	);
});
