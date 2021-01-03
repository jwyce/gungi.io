import React from 'react';
import { Piece } from './Piece';
import { Square } from './Square';

interface BoardProps {}

export const Board: React.FC<BoardProps> = () => {
	return (
		<Square>
			<Piece></Piece>
		</Square>
	);
};
