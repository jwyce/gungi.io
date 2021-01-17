import React from 'react';
import { Piece } from './Piece';
import { Square } from './Square';
import styled from 'styled-components';
import { Coordinates } from './Coordinates';

const Wrapper = styled.div`
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	display: grid;
	grid-template-columns: repeat(9, 11.105%);
	overflow: hidden;
`;

interface BoardProps {}

export const Board: React.FC<BoardProps> = () => {
	const squares: any[] = [];

	squares.push(
		<Square highlight={false} hint={true} hover={true} hasPiece={false}>
			<></>
		</Square>
	);
	for (let i = 1; i < 81; i++) {
		squares.push(
			<Square highlight={false} hint={true} hover={false} hasPiece={true}>
				<Piece></Piece>
			</Square>
		);
	}
	return (
		<Wrapper>
			<Coordinates orientation="white" />
			{squares}
		</Wrapper>
	);
};
