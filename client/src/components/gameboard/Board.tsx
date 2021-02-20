import React from 'react';
import styled from 'styled-components';

import { Coordinates } from './Coordinates';
import { Empty } from './Empty';
import { Piece } from './Piece';
import { Square } from './Square';
import { Piece as PieceType } from '../../typings/types';
import { flipBoard } from '../../utils/flipBoard';
// import { toJS } from 'mobx';

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
}

export const Board: React.FC<BoardProps> = ({ board }) => {
	const squares: any[] = [];
	const rotatedBoard = flipBoard(board);
	console.log(rotatedBoard);
	board = rotatedBoard ?? board;

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

			if (topIndex >= 0) {
				console.log(
					squareId,
					`${topPiece?.color}${topIndex + 1}${topPiece?.type}.svg`
				);
				squares.push(
					<Square id={squareId} key={squareId} hint={false} hasPiece={true}>
						<Piece
							squareId={squareId}
							icon={`${topPiece?.color}${topIndex + 1}${topPiece?.type}.svg`}
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
					<Square id={squareId} key={squareId} hint={false} hasPiece={false}>
						<Empty squareId={squareId} />
					</Square>
				);
			}

			// console.log(squareId, toJS(tower));
		}
	}

	return (
		<Wrapper>
			<Coordinates orientation="black" />
			{squares}
		</Wrapper>
	);
};
