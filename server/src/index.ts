import express from 'express';
import { v4 } from 'uuid';
import { InMemorySessionStore, User } from './sessionStore';

const PORT = process.env.HTTP_PORT || 4001;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
	cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
});

const { Gungi } = require('gungi.js');
const gungi = new Gungi();
console.log(gungi.ascii());

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

		console.log('users', users);
		console.log(
			'rooms',
			sessionStore.findAllSessions().map((x) => x.roomId)
		);

		io.to(roomId).emit('roomId', roomId);
		io.to(roomId).emit('users', users);
	});

	app.get('/', (_req, res) => {
		res.send('<h1>hello world</h1>');
	});

	app.get('/init_game', (_req, res) => {
		res.json({
			stockpile_black: gungi.stockpile(gungi.BLACK),
			stockpile_white: gungi.stockpile(gungi.WHITE),
			legal_moves: gungi.moves(),
			phase: gungi.phase(),
			turn: gungi.turn(),
			in_check: gungi.in_check(),
			in_checkmate: gungi.in_checkmate(),
			in_stalemate: gungi.in_stalemate(),
			game_over: gungi.game_over(),
			board: gungi.board(),
		});
	});

	http.listen(PORT, () => {
		console.log(`🚀 server started at http://localhost:${PORT}.`);
	});
};

main();
