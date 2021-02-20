import { action, observable } from 'mobx';
import { createContext } from 'react';
import { GameState, Move, Square } from 'src/typings/types';

class GungiStore {
	@observable state: 'loading' | 'done' | 'error' = 'loading';
	@observable gameState: GameState | undefined = undefined;
	@observable isDragging = false;
	@observable currentSelected: string | undefined = undefined;
	@observable squareSelected: Square | undefined = undefined;
	@observable prevMoveFrom: string | undefined = undefined;
	@observable prevMoveTo: string | undefined = undefined;
	@observable hints: (string | null)[] | undefined = undefined;

	@action fetchGame = async () => {
		this.state = 'loading';
		fetch('/init_game')
			.then(action('fetchSuccess', (response: any) => response.json()))
			.then(
				action('unpackJson', (data: GameState) => {
					console.log(data);
					this.gameState = {
						board: data.board,
						stockpile_black: data.stockpile_black,
						stockpile_white: data.stockpile_white,
						legal_moves: data.legal_moves,
						phase: data.phase,
						turn: data.turn,
						in_check: data.in_check,
						in_checkmate: data.in_checkmate,
						in_stalemate: data.in_stalemate,
						game_over: data.game_over,
					};
				})
			);
		this.state = 'done';
	};
	@action makeMove = (move: Move) => {
		console.log('api call');
	};
}

export const GungiStoreContext = createContext(new GungiStore());
