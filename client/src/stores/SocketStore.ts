import { observable } from 'mobx';
import { createContext } from 'react';
import { io } from 'socket.io-client';

class SocketStore {
	@observable userIsSignedIn = false;
	@observable socket = io('http://localhost:4001', { autoConnect: false });
}

export const SocketStoreContext = createContext(new SocketStore());
