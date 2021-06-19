import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { GungiStoreContext } from 'src/stores/GungiStore';
import { GameState, Move, Piece, User } from 'src/typings/types';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

enum HighlightType {
	NONE = 'none',
	HIGHLIGHT = 'highlight',
	CHECK = 'check',
}

const handleHighlightColorChange = (color: HighlightType) => {
	switch (color) {
		case HighlightType.HIGHLIGHT:
			return '#a152ff66;';
		case HighlightType.CHECK:
			return '#ff6060ab';
		default:
			return 'transparent';
	}
};

const Wrapper = styled.div<{ highlight: HighlightType; hover: boolean }>`
	background-color: ${(props) => handleHighlightColorChange(props.highlight)};
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
	const gungiStore = useContext(GungiStoreContext);

	let socketPlayerColor: string = '';
	if (props.socketPlayer?.userType === 'creator') {
		socketPlayerColor = 'w';
	} else if (props.socketPlayer?.userType === 'opponent') {
		socketPlayerColor = 'b';
	}

	const swal = withReactContent(Swal);

	const convertIdToGameSquare = (id: string) => {
		if (socketPlayerColor === 'b') {
			const rank = parseInt(id.split('-')[0]);
			const file = parseInt(id.split('-')[1]);

			return `${10 - rank}-${10 - file}`;
		}
		return id;
	};

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

	return (
		<Wrapper
			highlight={getSquareHighlightFromGameState(
				gungiStore.currentSelected,
				gungiStore.gameState
			)}
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
				let selectedPieceColor = '';
				if (src?.split('-').length !== 2) {
					src = {
						type: src ? src.substr(1) : '',
						color: src ? src.substr(0, 1) : '',
					};
				} else if (src.split('-').length === 2) {
					const currCords = gungiStore.currentSelected?.split('-');
					const srcRank = parseInt(currCords ? currCords[0] : '-1');
					const srcFile = parseInt(currCords ? currCords[1] : '-1');
					for (let i = 0; i < 3; i++) {
						let piece =
							socketPlayerColor === 'w'
								? gungiStore.gameState?.board[9 - srcRank][srcFile - 1][i]
								: gungiStore.gameState?.board[srcRank - 1][9 - srcFile][i];
						if (piece) {
							selectedPieceColor = piece.color;
						}
					}

					if (socketPlayerColor === 'b') {
						src = `${10 - srcRank}-${10 - srcFile}`;
					}
				}

				if (
					(gungiStore.currentSelected?.substr(0, 1) ===
						gungiStore.gameState?.turn ||
						selectedPieceColor === gungiStore.gameState?.turn) &&
					socketPlayerColor === gungiStore.gameState?.turn
				) {
					// check if in legal moves
					const rank = parseInt(props.id.split('-')[0]);
					const file = parseInt(props.id.split('-')[1]);
					const dst =
						socketPlayerColor === 'b' ? `${10 - rank}-${10 - file}` : props.id;

					let moveType = '';
					if (!gungiStore.squareSelected) {
						moveType = 'place';
					} else if (gungiStore.squareSelected) {
						// if mouse up on empty square => movement
						let boardCoords = convertIdToGameSquare(props.id);
						const realRank = parseInt(boardCoords.split('-')[0]);
						const realFile = parseInt(boardCoords.split('-')[1]);

						const tower =
							gungiStore.gameState.board[9 - realRank][realFile - 1];
						if (tower) {
							let top: Piece | null = null;
							for (let i = 2; i >= 0; i--) {
								if (tower[i] !== null) {
									top = tower[i];
								}
							}

							if (top === null) {
								moveType = 'move';
							} else if (gungiStore.currentSelected !== props.id) {
								if (top.color === socketPlayerColor) {
									moveType = 'stack';
								} else {
									swal
										.fire({
											title: <span>Attack or Stack?</span>,
											showConfirmButton: true,
											showDenyButton: true,
											confirmButtonText: 'Attack',
											confirmButtonColor: '#F53C5E',
											denyButtonText: 'Stack',
											denyButtonColor: '#F5AB3C',
										})
										.then((response) => {
											if (response.isConfirmed) {
												moveType = 'attack';
											} else if (response.isDenied) {
												moveType = 'stack';
											}

											const move = {
												src,
												dst,
												type: moveType,
											};

											if (
												gungiStore.gameState?.legal_moves.some(
													(x) =>
														JSON.stringify(x.src) ===
															JSON.stringify(move.src) &&
														x.dst === move.dst &&
														x.type === move.type
												)
											) {
												gungiStore.currentSelected = undefined;
												gungiStore.hints = undefined;
												props.makeMoveCallback(move);
											}
										});
								}
							}
						}
					}

					const move = {
						src,
						dst,
						type: moveType,
					};

					if (
						gungiStore.gameState.legal_moves.some(
							(x) =>
								JSON.stringify(x.src) === JSON.stringify(move.src) &&
								x.dst === move.dst &&
								x.type === move.type
						)
					) {
						gungiStore.currentSelected = undefined;
						gungiStore.hints = undefined;
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
			{props.tower && tower && <>{tower}</>}
		</Wrapper>
	);
});
