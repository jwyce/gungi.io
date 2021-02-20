import { Piece } from '../typings/types';

export const flipBoard = (board: (Piece | null)[][][]): Piece[][][] | null => {
	if (board === null) {
		return null;
	}

	let rotatedBoard = Array(9)
		.fill(null)
		.map((e) =>
			Array(9)
				.fill(null)
				.map((e) =>
					Array(3)
						.fill(null)
						.map((e) => e)
				)
		);

	for (let i = 8; i >= 0; i--) {
		for (let k = 8; k >= 0; k--) {
			const tower: (Piece | null)[] = board[i][k];
			rotatedBoard[8 - i][8 - k] = tower;
		}
	}
	return rotatedBoard;
};
