import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';
import { Lobby } from 'src/components/game/Lobby';
import { User } from 'src/typings/types';

import { GungiGame } from '../components/game/GungiGame';
import { Login } from '../components/game/Login';

export const Game: React.FC<{}> = () => {
	document.title = 'Play | Gungi.io';

	const socket = io('http://localhost:4001', { autoConnect: false });
	const [username, setUsername] = useState('');
	const params: any = useParams();
	const gameId = params.id;
	const [state, setState] = useState<'login' | 'lobby' | 'game'>('login');
	const [roomId, setRoomId] = useState('');
	const [players, setPlayers] = useState<User[] | undefined>(undefined);

	const chooseName = () => {
		setState('lobby');

		if (gameId) {
			setRoomId(gameId);
		}
	};

	useEffect(() => {
		if (state !== 'login') {
			//@ts-ignore
			socket.auth = { username, gameId };
			socket.connect();
		}

		socket.on('users', (users: any) => {
			console.log('users', users);
			// const creator = users.find((x: User) => x.userType === 'creator');
			// const creatorIndex = users.findIndex(
			// 	(x: User) => x.userType === 'creator'
			// );
			// users.splice(creatorIndex, 1);

			// if (creator) {
			// 	users.unshift(creator);
			// }

			setPlayers(users);
		});

		socket.on('roomId', (data: string) => {
			setRoomId(data);
		});

		return () => {
			socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	switch (state) {
		case 'game':
			return <GungiGame />;
		case 'lobby':
			return <Lobby roomId={roomId} players={players} />;
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
