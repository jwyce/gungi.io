import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';
import { Lobby } from 'src/components/game/Lobby';
import { GameState, Move, User } from 'src/typings/types';

import { GungiGame } from '../components/game/GungiGame';
import { Login } from '../components/game/Login';

export const Game: React.FC<{}> = () => {
	document.title = 'Play | Gungi.io';

	const { current: socket } = useRef(
		io('http://localhost:4001', { autoConnect: false, timeout: 60000 })
	);
	const [username, setUsername] = useState('');
	const params: any = useParams();
	const gameId = params.id;
	const [state, setState] = useState<'login' | 'lobby' | 'game'>('login');
	const [roomId, setRoomId] = useState('');
	const [players, setPlayers] = useState<User[] | undefined>(undefined);
	const [gameState, setGameState] = useState<GameState | undefined>(undefined);
	const [shouldConnect, setShouldConnect] = useState(false);

	const chooseName = () => {
		//TODO: if game already started set state to game and connect to room as spectator
		setShouldConnect(true);
		if (gameId) {
			setRoomId(gameId);
		}

		setState('lobby');
	};

	const startGame = (opponentId: string) => {
		socket.emit('init_game', { opponentId, roomId });
	};

	const makeMove = (move: Move) => {
		alert(`move: ${JSON.stringify(move, null, 2)}`);
		socket.emit('make_move', { roomId, move });
	};

	useEffect(() => {
		if (shouldConnect) {
			//@ts-ignore
			socket.auth = { username, gameId };
			socket.connect();
		}

		socket.on('users', (users: User[]) => {
			const creator = users.find((x: User) => x.userType === 'creator');
			const creatorIndex = users.findIndex(
				(x: User) => x.userType === 'creator'
			);
			users.splice(creatorIndex, 1);

			if (creator) {
				users.unshift(creator);
			}

			users.forEach((user) => {
				user.self = user.userId === socket.id;
			});

			setPlayers(users);
		});

		socket.on('roomId', (data: string) => {
			setRoomId(data);
		});

		socket.on('game', (game: { gameState: GameState; players: User[] }) => {
			console.log('socket game event', game.gameState);
			setGameState(game.gameState);

			const users = game.players;
			users.forEach((user) => {
				user.self = user.userId === socket.id;
			});

			setPlayers(users);
			setShouldConnect(false);
			setState('game');
		});

		return () => {
			console.log('clean up');
			// socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	switch (state) {
		case 'game':
			return (
				<GungiGame
					gameState={gameState}
					players={players}
					socketId={socket.id}
					makeMoveCallback={makeMove}
				/>
			);
		case 'lobby':
			return (
				<Lobby
					roomId={roomId}
					players={players}
					startGameCallback={startGame}
				/>
			);
		case 'login':
			return (
				<Login
					username={username}
					setUsername={setUsername}
					callback={chooseName}
				/>
			);
	}
};
