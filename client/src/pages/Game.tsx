import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import { io } from 'socket.io-client';
import { Lobby } from 'src/components/game/Lobby';
import { GameState, Move, User } from 'src/typings/types';

import { GungiGame } from '../components/game/GungiGame';
import { Login } from '../components/game/Login';

export const Game: React.FC<RouteComponentProps> = ({ history }) => {
	document.title = 'Play | Gungi.io';

	const { current: socket } = useRef(
		io('http://localhost:4001', { autoConnect: false, timeout: 60000 })
	);
	const [username, setUsername] = useState('');
	const params: any = useParams();
	const gameId = params.id;
	const [state, setState] = useState<'login' | 'lobby' | 'game'>('login');
	const [roomId, setRoomId] = useState('');
	const [readied, setReadied] = useState<string[]>([]);
	const [players, setPlayers] = useState<User[] | undefined>(undefined);
	const [gameState, setGameState] = useState<GameState | undefined>(undefined);
	const [shouldConnect, setShouldConnect] = useState(false);

	const chooseName = () => {
		//TODO: if game already started set state to game and connect to room as spectator
		setShouldConnect(true);
		if (gameId) {
			setRoomId(gameId);
		}

		fetch('http://localhost:4001/current_rooms')
			.then((response) => response.json())
			.then((data) => {
				if (data.find((x: any) => x.roomId === gameId)?.gameStarted) {
					//@ts-ignore
					socket.auth = { username, gameId };
					socket.connect();
					socket.emit('spectate_active_game', { gameId });
				} else {
					setState('lobby');
				}
			});
	};

	const startGame = (opponentId: string) => {
		socket.emit('init_game', { opponentId, roomId });
	};

	const makeMove = (move: Move) => {
		socket.emit('make_move', { roomId, move });
	};

	const forfeit = () => {
		socket.disconnect();
		history.push('/');
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

		socket.on('readied', (data: any) => {
			setReadied([...readied, data.userId]);
		});

		socket.on('game', (game: { gameState: GameState; players: User[] }) => {
			if (game.gameState) {
				setGameState(game.gameState);

				const users = game.players;
				users.forEach((user) => {
					user.self = user.userId === socket.id;
				});

				setPlayers(users);
				setShouldConnect(false);
				setState('game');
			}
		});

		socket.on('game_updated', (game: any) => {
			setGameState(game.gameState);
		});
		socket.on('users_updated', (data: any) => {
			const users: User[] = data.users;
			users.forEach((user) => {
				user.self = user.userId === socket.id;
			});
			setPlayers(users);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	useEffect(() => {
		socket.on('game_destroyed', () => {
			alert('opponent disconnected, game destroyed!');
			socket.disconnect();
			history.push('/');
		});

		return () => {
			socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	switch (state) {
		case 'game':
			return (
				<GungiGame
					gameState={gameState}
					players={players}
					socketId={socket.id}
					playersReadied={readied}
					makeMoveCallback={makeMove}
					forfeitCallback={forfeit}
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
