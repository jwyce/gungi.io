import express from 'express';
import cors from 'cors';
import { getOnlineUsers, userJoin, userLeave } from './utils/users';

const PORT = process.env.HTTP_PORT || 4001;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const { Gungi } = require('gungi.js');
const gungi = new Gungi();
console.log(gungi.ascii());

//TODO: limit number of active games per user to 5

const main = async () => {
	io.on('connection', function (socket: any) {
		console.log('a user connected', socket.id);
		socket.on('joinLobby', (username: string) => {
			userJoin(socket.id, username);
			socket.join('lobby');
			io.to('lobby').emit('onlineUsers', getOnlineUsers());
		});

		socket.on('disconnect', () => {
			const user = userLeave(socket.id);

			if (user) {
				// Send users and room info
				io.to('lobby').emit('onlineUsers', getOnlineUsers());
			}
		});
	});

	app.use(
		cors({
			origin: 'http://172.18.238.246:3000',
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
