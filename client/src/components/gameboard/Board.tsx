import React from 'react';
import styled from 'styled-components';

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

interface BoardProps {}

export const Board: React.FC<BoardProps> = () => {
	const squares: any[] = [];

	squares.push(
		<Square key={0} highlight={false} hint={false} hasPiece={false}>
			<Piece icon="b2帥.svg" belowIcon="w1帥.svg" />
		</Square>
	);
	for (let i = 1; i < 81; i++) {
		squares.push(
			<Square key={i} highlight={false} hint={false} hasPiece={false}>
				<Empty />
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
