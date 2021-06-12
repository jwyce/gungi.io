export interface User {
	userId: string;
	username: string;
	userType: 'creator' | 'opponent' | 'spectator';
}

export type Piece = {
	type: string;
	color: string;
};
export type StockPiece = {
	piece: Piece;
	amount: number;
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

export interface GameState {
	board: (Piece | null)[][][];
	stockpile_black: StockPiece[];
	stockpile_white: StockPiece[];
	legal_moves: Move[];
	phase: string;
	turn: string;
	check_square: string;
	in_check: boolean;
	in_checkmate: boolean;
	in_stalemate: boolean;
	game_over: boolean;
	armysize_black: number;
	armysize_white: number;
	captured: StockPiece[];
	history: MoveHistory[];
}
export interface Session {
	roomId: string;
	users: User[];
	game: any;
	gameStarted: boolean;
}

interface SessionStore {
	findSession(id: string): Session | undefined;
	saveSession(id: string, session: Session): void;
	destroySession(id: string): void;
	findAllSessions(): Session[];
	getUsers(id: string): User[];
	addUser(id: string, user: User): void;
	editUserType(
		id: string,
		userId: string,
		type: 'opponent' | 'spectator'
	): void;
	removeUser(id: string, userId: string): void;
	getGameState(id: string): GameState | undefined;
	makeGameMove(id: string, move: Move): GameState | undefined;
	getCurrentRoom(socketId: string): string | undefined;
}

export class InMemorySessionStore implements SessionStore {
	sessions: Map<string, Session>;

	constructor() {
		this.sessions = new Map();
	}

	findSession(id: string): Session | undefined {
		return this.sessions.get(id);
	}
	saveSession(id: string, session: Session): void {
		this.sessions.set(id, session);
	}
	destroySession(id: string): void {
		this.sessions.delete(id);
	}
	findAllSessions(): Session[] {
		return [...this.sessions.values()];
	}
	getUsers(id: string): User[] {
		const session = this.findSession(id);
		if (session) {
			return [...session.users];
		}

		return [];
	}
	addUser(id: string, user: User): void {
		const session = this.findSession(id);
		if (session) {
			session.users.push(user);
		}
	}
	editUserType(
		id: string,
		userId: string,
		type: 'opponent' | 'spectator'
	): void {
		const session = this.findSession(id);
		if (session) {
			session.users.forEach((x) => {
				if (x.userId === userId) {
					x.userType = type;
				}
			});
		}
	}
	removeUser(id: string, userId: string): void {
		const session = this.findSession(id);
		if (session) {
			const index = session.users.findIndex((x) => x.userId === userId);
			session.users.splice(index, 1);
		}
	}
	getGameState(id: string): GameState | undefined {
		const session = this.findSession(id);
		if (session) {
			const gungi = session.game;
			let check_square = '';
			if (gungi.in_check()) {
				for (let i = 0; i < 9; i++) {
					for (let k = 0; k < 9; k++) {
						const tower = gungi.get_board()[i][k];
						if (
							tower.some(
								(x: Piece) =>
									x?.color === gungi.turn && x?.type === gungi.MARSHAL
							)
						) {
							check_square = `${9 - i}-${k + 1}`;
						}
					}
				}
			}
			return {
				stockpile_black: gungi.get_stockpile(gungi.BLACK),
				stockpile_white: gungi.get_stockpile(gungi.WHITE),
				legal_moves: gungi.moves(),
				phase: gungi.phase,
				turn: gungi.turn,
				check_square,
				in_check: gungi.in_check(),
				in_checkmate: gungi.in_checkmate(),
				in_stalemate: gungi.in_stalemate(),
				game_over: gungi.game_over(),
				board: gungi.get_board(),
				armysize_black: gungi.get_army_size(gungi.BLACK),
				armysize_white: gungi.get_army_size(gungi.WHITE),
				captured: gungi.get_captured(),
				history: gungi.get_history(),
			};
		}

		return undefined;
	}
	makeGameMove(id: string, move: Move): GameState | undefined {
		const session = this.findSession(id);
		if (session) {
			const gungi = session.game;
			gungi.move(move);

			let check_square = '';
			if (gungi.in_check()) {
				for (let i = 0; i < 9; i++) {
					for (let k = 0; k < 9; k++) {
						const tower = gungi.get_board()[i][k];
						if (
							tower.some(
								(x: Piece) =>
									x?.color === gungi.turn && x?.type === gungi.MARSHAL
							)
						) {
							check_square = `${9 - i}-${k + 1}`;
						}
					}
				}
			}

			return {
				stockpile_black: gungi.get_stockpile(gungi.BLACK),
				stockpile_white: gungi.get_stockpile(gungi.WHITE),
				legal_moves: gungi.moves(),
				phase: gungi.phase,
				turn: gungi.turn,
				check_square,
				in_check: gungi.in_check(),
				in_checkmate: gungi.in_checkmate(),
				in_stalemate: gungi.in_stalemate(),
				game_over: gungi.game_over(),
				board: gungi.get_board(),
				armysize_black: gungi.get_army_size(gungi.BLACK),
				armysize_white: gungi.get_army_size(gungi.WHITE),
				captured: gungi.get_captured(),
				history: gungi.get_history(),
			};
		}

		return undefined;
	}
	getCurrentRoom(socketId: string): string | undefined {
		for (let [key, value] of this.sessions.entries()) {
			if (value.users.find((x) => x.userId === socketId)) {
				return key;
			}
		}
		return undefined;
	}
}
