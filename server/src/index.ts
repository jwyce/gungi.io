import express from 'express';

const PORT = process.env.HTTP_PORT || 4001;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { Gungi } = require('gungi.js');
const gungi = new Gungi();

gungi.move(gungi.moves()[0]);
gungi.move(gungi.moves()[0]);
gungi.move({ src: null, dst: null, type: gungi.READY });
gungi.move({
	src: { type: gungi.PAWN, color: gungi.WHITE },
	dst: '1-5',
	type: gungi.PLACE,
});
gungi.move({
	src: { type: gungi.MUSKETEER, color: gungi.WHITE },
	dst: '1-5',
	type: gungi.PLACE,
});
gungi.move({
	src: { type: gungi.ARCHER, color: gungi.WHITE },
	dst: '1-5',
	type: gungi.PLACE,
});
gungi.move({ src: null, dst: null, type: gungi.READY });
console.log(gungi.ascii());

//TODO: limit number of active games per user to 5

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

io.on('connection', function (_socket: any) {
	console.log('a user connected');
});

app.listen(PORT, () => {
	console.log(`🚀 server started at http://localhost:${PORT}.`);
});
