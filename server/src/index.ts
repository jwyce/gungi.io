import express from 'express';

const PORT = process.env.HTTP_PORT || 4001;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { Gungi } = require('gungi.js');
const gungi = new Gungi();

console.log(gungi.ascii());

//TODO: limit number of active games per user to 5

app.get('/', (_req, res) => {
	res.send('just gonna send it');
});

app.get('/init_game', (_req, res) => {
	res.json({
		board: gungi.board(),
		stockpile_black: gungi.stockpile(gungi.BLACK),
		stockpile_white: gungi.stockpile(gungi.WHITE),
		legal_moves: gungi.moves(),
		phase: gungi.phase(),
		turn: gungi.turn(),
		in_check: gungi.in_check(),
		in_checkmate: gungi.in_checkmate(),
		in_stalemate: gungi.in_stalemate(),
		game_over: gungi.game_over(),
	});
});

io.on('connection', function (_socket: any) {
	console.log('a user connected');
});

app.listen(PORT, () => {
	console.log(`🚀 server started at http://localhost:${PORT}.`);
});
