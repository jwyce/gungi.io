import React from 'react';
import styled from 'styled-components';

import { Move, Piece as PieceType, User } from '../../typings/types';
import { flipBoard } from '../../utils/flipBoard';
import { Coordinates } from './Coordinates';
import { Empty } from './Empty';
import { Piece } from './Piece';
import { Square } from './Square';


const Wrapper = styled.div`
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	display: grid;
	grid-template-columns: repeat(9, 11.105%);
	overflow: visible;
`;

interface BoardProps {
	board: (PieceType | null)[][][];
	orientation: string;
	socketPlayer: User | undefined;
	makeMoveCallback: (move: Move) => void;
}

export const Board: React.FC<BoardProps> = ({
	board,
	orientation,
	socketPlayer,
	makeMoveCallback,
}) => {
	const squares: any[] = [];
	if (orientation === 'black') {
		board = flipBoard(board) ?? board;
	}

	for (let i = 0; i < 9; i++) {
		for (let k = 0; k < 9; k++) {
			const squareId = `${9 - i}-${k + 1}`;
			const tower = board[i][k];
			let topIndex = -1;

			for (let l = 2; l >= 0; l--) {
				if (tower[l] !== null) {
					topIndex = l;
					break;
				}
			}

			const topPiece = tower[topIndex];
			const pieceBelow = tower[topIndex - 1];
			let socketPlayerColor: string = '';
			if (socketPlayer?.userType === 'creator') {
				socketPlayerColor = 'w';
			} else if (socketPlayer?.userType === 'opponent') {
				socketPlayerColor = 'b';
			}

			if (topIndex >= 0) {
				squares.push(
					<Square
						id={squareId}
						key={squareId}
						hint={false}
						hasPiece={true}
						socketPlayer={socketPlayer}
						makeMoveCallback={makeMoveCallback}
					>
						<Piece
							squareId={squareId}
							icon={`${topPiece?.color}${topIndex + 1}${topPiece?.type}.svg`}
							orientation={orientation}
							socketPlayerColor={socketPlayerColor}
							belowIcon={
								pieceBelow
									? `${pieceBelow?.color}${topIndex}${pieceBelow?.type}.svg`
									: undefined
							}
						/>
					</Square>
				);
			} else {
				squares.push(
					<Square
						id={squareId}
						key={squareId}
						hint={false}
						hasPiece={false}
						socketPlayer={socketPlayer}
						makeMoveCallback={makeMoveCallback}
					>
						<Empty squareId={squareId} />
					</Square>
				);
			}

		}
	}

	return (
		<Wrapper>
			<Coordinates orientation={orientation} />
			{squares}
		</Wrapper>
	);
};
