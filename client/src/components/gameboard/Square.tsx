import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { GungiStoreContext } from 'src/stores/GungiStore';
import { Move, Piece, User } from 'src/typings/types';
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
	cursor: ${(props) => (props.hover ? '-webkit-grabbing' : '0')};
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
	hasPiece: boolean;
	hint: boolean;
	id: string;
	socketPlayer: User | undefined;
	makeMoveCallback: (move: Move) => void;
}

export const Square: React.FC<SquareProps> = observer((props) => {
	const [isOver, setIsOver] = useState(false);
	const gungiStore = useContext(GungiStoreContext);

	let socketPlayerColor: string = '';
	if (props.socketPlayer?.userType === 'creator') {
		socketPlayerColor = 'w';
	} else if (props.socketPlayer?.userType === 'opponent') {
		socketPlayerColor = 'b';
	}

	return (
		<Wrapper
			highlight={gungiStore.currentSelected === props.id}
			hover={isOver}
			onClick={() => {
				if (!props.hasPiece) {
					gungiStore.currentSelected = undefined;
					gungiStore.squareSelected = undefined;
					gungiStore.hints = undefined;
				}
			}}
			onMouseOver={() => {
				setIsOver(gungiStore.isDragging);
			}}
			onMouseUp={() => {
				setIsOver(false);
				let src: string | Piece | null = gungiStore.currentSelected ?? null;
				if (src?.split('-').length !== 2) {
					src = {
						type: src ? src.substr(1) : '',
						color: src ? src.substr(0, 1) : '',
					};
				}

				if (
					gungiStore.currentSelected?.substr(0, 1) ===
						gungiStore.gameState?.turn &&
					socketPlayerColor === gungiStore.gameState?.turn
				) {
					// check if in legal moves
					const rank = parseInt(props.id.split('-')[0]);
					const file = parseInt(props.id.split('-')[1]);
					const dst =
						socketPlayerColor === 'b' ? `${10 - rank}-${10 - file}` : props.id;

					const move = {
						src,
						dst,
						type: gungiStore.moveTypeSelected,
					};

					console.log(JSON.stringify(move, null, 2));
					console.log('legal moves', toJS(gungiStore.gameState.legal_moves));

					if (
						gungiStore.gameState.legal_moves.some(
							(x) => JSON.stringify(x) === JSON.stringify(move)
						)
					) {
						props.makeMoveCallback(move);
					}
				}
			}}
			onMouseLeave={() => {
				setIsOver(false);
			}}
		>
			{props.children}
			<Hint
				show={
					gungiStore.hints === undefined
						? false
						: gungiStore.hints?.includes(props.id)
				}
				capture={props.hasPiece}
			/>
		</Wrapper>
	);
});
