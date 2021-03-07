export type Piece = {
	type: string;
	color: string;
};

export type Square = {
	rank: number;
	file: number;
};

export type Move = {
	src: Piece | string | null;
	dst: string | null;
	type: string;
};

export type StockPiece = {
	piece: Piece;
	amount: number;
};

export type User = {
	userID: string;
	username: string;
	self: boolean;
	connected: boolean;
};

export type GameState = {
	board: (Piece | null)[][][];
	stockpile_black: StockPiece[];
	stockpile_white: StockPiece[];
	legal_moves: Move[];
	phase: string;
	turn: string;
	in_check: boolean;
	in_checkmate: boolean;
	in_stalemate: boolean;
	game_over: boolean;
};
