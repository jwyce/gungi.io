import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import { io } from 'socket.io-client';
import { Lobby } from 'src/components/game/Lobby';
import { GameState, Move, User } from 'src/typings/types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { GungiGame } from '../components/game/GungiGame';
import { Login } from '../components/game/Login';

export const Game: React.FC<RouteComponentProps> = ({ history }) => {
	document.title = 'Play | Gungi.io';

	const { current: socket } = useRef(
		io(`${process.env.REACT_APP_API_URL}`, {
			autoConnect: false,
			timeout: 60000,
		})
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
	const swal = withReactContent(Swal);

	const chooseName = () => {
		setShouldConnect(true);
		if (gameId) {
			setRoomId(gameId);
		}

		fetch(`${process.env.REACT_APP_API_URL}/current_rooms`)
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
		socket.emit('game_over', { forfeit: true });
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

			if (game.gameState.game_over) {
				socket.emit('game_over', { forfeit: false });
			}
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
		socket.on('game_over_notification', (notif: any) => {
			swal
				.fire({
					title: <span>Game Over</span>,
					html: <div>{notif.message}!</div>,
					icon: 'warning',
					showConfirmButton: true,
					confirmButtonColor: '#9045d6',
				})
				.then((response) => {
					if (response.isConfirmed) {
						socket.disconnect();
						history.push('/');
					}
				});
		});
		socket.on('game_destroyed', () => {
			swal
				.fire({
					title: <span>Game Over</span>,
					html: (
						<div>Opponent disconnected! Kicking everyone from the room</div>
					),
					icon: 'warning',
					showConfirmButton: true,
					confirmButtonColor: '#9045d6',
				})
				.then((response) => {
					if (response.isConfirmed) {
						socket.disconnect();
						history.push('/');
					}
				});
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
