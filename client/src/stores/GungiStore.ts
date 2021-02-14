import { observable } from 'mobx';
import { createContext } from 'react';

class GungiStore {
	@observable isDragging = false;
}

export const GungiStoreContext = createContext(new GungiStore());
