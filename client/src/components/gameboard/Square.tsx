import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { GungiStoreContext } from 'src/stores/GungiStore';
import { GameState, Move, Piece, User } from 'src/typings/types';
import styled from 'styled-components';
import { useGetMove } from '../hooks/useGetMove';

enum HighlightType {
	NONE = 'none',
	HIGHLIGHT = 'highlight',
	CHECK = 'check',
	HINT = 'hint'
}

const handleHighlightColorChange = (color: HighlightType) => {
	switch (color) {
		case HighlightType.HIGHLIGHT:
			return '#a152ff66;';
		case HighlightType.CHECK:
			return '#ff6060ab';
		case HighlightType.HINT:
			return "rgba(0, 0, 0, 0.2)"
		default:
			return 'transparent';
	}
};

const Wrapper = styled.div<{ highlight: HighlightType; hover: boolean }>`
	background-color: ${(props) => props.hover && props.highlight === HighlightType.HINT ? 'transparent' : handleHighlightColorChange(props.highlight)};
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	position: relative;
	border: ${(props) => (props.hover ? '5px solid #b683ca' : 'none')};
	border-offset: ${(props) => (props.hover ? '-4.5px' : '0')};
	cursor: ${(props) => (props.hover ? '-webkit-grabbing' : '0')};
	${(props) => props.highlight === HighlightType.HINT && !props.hover ? `
		padding: 32.2%;
		background-clip: content-box;
		border-radius: 50%;
		box-sizing: border-box;` : ''
	}
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

const TowerIndicator = styled.div<{ color: string; tier: number }>`
	height: 7%;
	right: 0;
	position: absolute;
	top: 0;
	width: 7%;
	background-color: ${(props) => (props.color === 'b' ? '#565352' : '#fff')};
	background-clip: content-box;
	border-radius: 50%;
	box-sizing: border-box;
	pointer-events: none;
	transform: ${(props) =>
		props.tier === 1 ? 'translate(-75%, 75%);' : 'translate(-200%, 75%);'};
`;

interface SquareProps {
	children: React.ReactNode;
	hasPiece: boolean;
	hint: boolean;
	id: string;
	socketPlayer?: User;
	tower?: (Piece | null)[];
	makeMoveCallback: (move: Move) => void;
}

export const Square: React.FC<SquareProps> = observer((props) => {
	const [isOver, setIsOver] = useState(false);
	const [legalSquare, setLegalSquare] = useState(false)
	const gungiStore = useContext(GungiStoreContext);
	const { getMove } = useGetMove()
	let socketPlayerColor: string = '';
	if (props.socketPlayer?.userType === 'creator') {
		socketPlayerColor = 'w';
	} else if (props.socketPlayer?.userType === 'opponent') {
		socketPlayerColor = 'b';
	}

	const convertIdToGameSquare = (id: string) => {
		if (socketPlayerColor === 'b') {
			const rank = parseInt(id.split('-')[0]);
			const file = parseInt(id.split('-')[1]);

			return `${10 - rank}-${10 - file}`;
		}
		return id;
	};

	useEffect(() => {
		console.log('dragging')
		console.log(gungiStore.isDragging)
		if (gungiStore.isDragging) {
			const move = getMove(socketPlayerColor, convertIdToGameSquare(props.id), props.id, true)
			const isLegalSquare = (gungiStore.gameState?.legal_moves.some(
				(x) =>
					JSON.stringify(x.src) === JSON.stringify(move?.src) &&
					x.dst === move?.dst &&
					x.type === move?.type
			))
			setLegalSquare(isLegalSquare || false)
		} else {
			setLegalSquare(false)
		}
	}, [gungiStore.isDragging, gungiStore.gameState?.legal_moves, props.id, legalSquare])

	const getSquareHighlightFromGameState = (
		currentSelected?: string,
		gameState?: GameState
	) => {
		if (
			currentSelected === props.id ||
			gameState?.history.slice(-1)[0]?.src ===
			convertIdToGameSquare(props.id) ||
			gameState?.history.slice(-1)[0]?.dst === convertIdToGameSquare(props.id)
		) {
			return HighlightType.HIGHLIGHT;
		} else if (
			gameState?.in_check &&
			convertIdToGameSquare(props.id) === gameState.check_square
		) {
			return HighlightType.CHECK;
		} else {
			return HighlightType.NONE;
		}
	};

	let tower: any[] = [];
	if (props.tower) {
		for (let i = 0; i < 3; i++) {
			let piece = props.tower[i];
			if (piece) {
				tower.push(<TowerIndicator color={piece.color} tier={i + 1} />);
			}
		}
		tower.splice(-1, 1);
	}

	const curHighlight = getSquareHighlightFromGameState(
		gungiStore.currentSelected,
		gungiStore.gameState
	)


	return (
		<Wrapper
			highlight={legalSquare && (curHighlight === HighlightType.NONE) ? HighlightType.HINT : curHighlight}
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
				const move = getMove(socketPlayerColor, convertIdToGameSquare(props.id), props.id, false)
				if (
					gungiStore.gameState?.legal_moves.some(
						(x) =>
							JSON.stringify(x.src) === JSON.stringify(move?.src) &&
							x.dst === move?.dst &&
							x.type === move.type
					) && move
				) {
					gungiStore.currentSelected = undefined;
					gungiStore.hints = undefined;
					props.makeMoveCallback(move);
				}
			}}
			onMouseLeave={() => {
				setIsOver(false);
			}}
		>
			{props.children}
			< Hint
				show={
					gungiStore.hints === undefined
						? false
						: gungiStore.hints?.includes(props.id)
				}
				capture={props.hasPiece}
			/>
			{props.tower && tower && <>{tower}</>}
		</Wrapper >
	);
});
