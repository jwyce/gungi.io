import cors from 'cors';
import express from 'express';
import { v4 } from 'uuid';

import { Session, InMemorySessionStore } from './sessionStore';

const sessionStore = new InMemorySessionStore();
const PORT = process.env.HTTP_PORT || 4001;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
	cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
});

const { Gungi } = require('gungi.js');
const gungi = new Gungi();
console.log(gungi.ascii());

//TODO: user can only have 1 active game

const main = async () => {
	io.use((socket: any, next: any) => {
		const sessionID = socket.handshake.auth.sessionID as string;
		if (sessionID) {
			// find existing session
			const session = sessionStore.findSession(sessionID);
			console.log('found session: ', session);
			if (session) {
				socket.sessionID = sessionID;
				socket.userID = session.userID;
				socket.username = session.username;
				return next();
			}
		}
		const username = socket.handshake.auth.username;
		if (!username) {
			return next(new Error('invalid username'));
		}
		// create new session
		socket.sessionID = v4();
		socket.userID = v4();
		socket.username = username;
		next();
	});

	io.on('connection', (socket: any) => {
		console.log('a user connected', socket.sessionID);
		socket.on('disconnect', () => {
			console.log('user disconnected', socket.sessionID);
		});

		// persist session
		sessionStore.saveSession(socket.sessionID, {
			userID: socket.userID,
			username: socket.username,
			connected: true,
		});

		console.log(JSON.stringify(sessionStore.findAllSessions()));

		// emit session details
		socket.emit('session', {
			sessionID: socket.sessionID,
			userID: socket.userID,
		});

		// fetch existing users
		const users: Session[] = [];
		sessionStore.findAllSessions().forEach((session) => {
			users.push({
				userID: session.userID,
				username: session.username,
				connected: session.connected,
			});
		});
		socket.emit('users', users);

		// notify existing users
		socket.broadcast.emit('user connected', {
			userID: socket.userID,
			username: socket.username,
			connected: true,
		});

		// notify users upon disconnection
		socket.on('disconnect', async () => {
			const matchingSockets = await io.in(socket.userID).allSockets();
			const isDisconnected = matchingSockets.size === 0;
			if (isDisconnected) {
				// notify other users
				socket.broadcast.emit('user disconnected', socket.userID);
				// update the connection status of the session
				sessionStore.saveSession(socket.sessionID, {
					userID: socket.userID,
					username: socket.username,
					connected: false,
				});
			}
		});
	});

	app.use(
		cors({
			origin: 'http://localhost:3000',
		})
	);

	app.get('/', (_req, res) => {
		res.send('just gonna send it');
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
