import { action, observable } from 'mobx';
import { createContext } from 'react';
import { GameState, Move } from 'src/typings/types';

class GungiStore {
	@observable gameState: GameState | null = null;
	@observable isDragging = false;
	@observable currentSelected: string | null = null;
	@observable prevMoveFrom: string | null = null;
	@observable prevMoveTo: string | null = null;
	@observable hints: string[] = [];

	@action updateGameState = (move: Move) => {
		console.log('api call');
	};
}

export const GungiStoreContext = createContext(new GungiStore());
