import { observable } from 'mobx';
import { createContext } from 'react';
import { GameState, Square } from 'src/typings/types';

class GungiStore {
	@observable gameState: GameState | undefined = undefined;
	@observable isDragging = false;
	@observable currentSelected: string | undefined = undefined;
	@observable squareSelected: Square | undefined = undefined;
	@observable prevMoveFrom: string | undefined = undefined;
	@observable prevMoveTo: string | undefined = undefined;
	@observable moveTypeSelected: 'place' | 'attack' | 'move' | 'stack' = 'place';
	@observable hints: (string | null)[] | undefined = undefined;
}

export const GungiStoreContext = createContext(new GungiStore());
