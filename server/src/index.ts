import 'dotenv-safe/config';

import cors from 'cors';
import express from 'express';
import { v4 } from 'uuid';

import { InMemorySessionStore, Move, User } from './sessionStore';

const PORT = process.env.PORT;
const app = express();
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

const http = require('http').Server(app);
const io = require('socket.io')(http, {
	cors: { origin: process.env.CORS_ORIGIN, methods: ['GET', 'POST'] },
	upgradeTimeout: 30000,
	pingInterval: 10000,
	pingTimeout: 60000,
});

const { Gungi } = require('gungi.js');

const main = async () => {
	const sessionStore = new InMemorySessionStore();

	io.use((socket: any, next: any) => {
		const username = socket.handshake.auth.username;
		const gameId = socket.handshake.auth.gameId;
		socket.username = username;
		socket.gameId = gameId;
		next();
	});

	io.on('connection', (socket: any) => {
		let users: User[] = [];
		let roomId = '';

		if (!socket.gameId) {
			roomId = v4();

			sessionStore.saveSession(roomId, {
				roomId,
				game: new Gungi(),
				users: [],
				gameStarted: false,
			});
			sessionStore.addUser(roomId, {
				userId: socket.id,
				username: socket.username,
				userType: 'creator',
			});
		} else {
			roomId = socket.gameId;

			sessionStore.addUser(roomId, {
				userId: socket.id,
				username: socket.username,
				userType: 'spectator',
			});
		}

		users = sessionStore.getUsers(roomId);
		socket.join(roomId);

		io.to(roomId).emit('roomId', roomId);
		io.to(roomId).emit('users', users);

		socket.on(
			'init_game',
			({ opponentId, roomId }: { opponentId: string; roomId: string }) => {
				// emit game to all clients in room
				const session = sessionStore.findSession(roomId);
				if (session) {
					session.gameStarted = true;
				}
				sessionStore.editUserType(roomId, opponentId, 'opponent');

				const updatedUsers = sessionStore.getUsers(roomId);
				io.to(roomId).emit('game', {
					gameState: sessionStore.getGameState(roomId),
					players: updatedUsers,
				});
			}
		);

		socket.on('spectate_active_game', ({ gameId }: { gameId: string }) => {
			const updatedUsers = sessionStore.getUsers(gameId);
			io.to(roomId).emit('game', {
				gameState: sessionStore.getGameState(gameId),
				players: updatedUsers,
			});
		});

		socket.on(
			'make_move',
			({ roomId, move }: { roomId: string; move: Move }) => {
				sessionStore.makeGameMove(roomId, move);

				if (move.type === 'ready') {
					io.to(roomId).emit('readied', {
						userId: socket.id,
					});
				}

				// emit updated game to all clients in room
				io.to(roomId).emit('game_updated', {
					gameState: sessionStore.getGameState(roomId),
				});
			}
		);

		socket.on('disconnect', () => {
			const roomId = sessionStore.getCurrentRoom(socket.id) ?? '';
			const roomUsers = sessionStore.getUsers(roomId);
			const user = roomUsers.find((x) => x.userId === socket.id);

			if (user?.userType === 'spectator') {
				// update players and emit event
				sessionStore.removeUser(roomId, socket.id);
				io.to(roomId).emit('users_updated', {
					users: sessionStore.getUsers(roomId),
				});
			} else {
				// destory room and emit event
				sessionStore.destroySession(roomId);
				io.to(roomId).emit('game_destroyed');
			}
		});
	});

	app.get('/', (_req: any, res: any) => {
		res.send('hello world!');
	});

	app.get('/current_rooms', (_req: any, res: any) => {
		const sessions = sessionStore.findAllSessions();
		res.send(
			sessions.map((x) => {
				return {
					roomId: x.roomId,
					users: x.users,
					gameStarted: x.gameStarted,
				};
			})
		);
	});

	http.listen(PORT, () => {
		console.log(`🚀 server started at http://localhost:${PORT}.`);
	});
};

main();
