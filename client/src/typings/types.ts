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

export type MoveHistory = {
	turn: string;
	moveNumber: number;
	src: Piece | string | null;
	srcTier?: number;
	srcPiece?: Piece;
	dst: string | null;
	dstTier?: number;
	dstPiece?: Piece;
	type: string;
};

export type StockPiece = {
	piece: Piece;
	amount: number;
};

export function IsPiece(src: string | Piece | null): src is Piece {
	return (src as Piece).type !== undefined;
}

export type User = {
	userId: string;
	username: string;
	userType: 'creator' | 'spectator' | 'opponent';
	self: boolean;
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
	armysize_black: number;
	armysize_white: number;
	captured: StockPiece[];
	history: MoveHistory[];
};
