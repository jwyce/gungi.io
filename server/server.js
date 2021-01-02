import express from 'express';

const PORT = process.env.HTTP_PORT || 4000;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { Gungi } = require('gungi.js');

app.get('/', (req, res) => {
	res.send('just gonna send it');
});

app.get('/flower', (req, res) => {
	res.json({
		name: 'Dandelion',
		color: 'purple',
	});
});

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}.`);
});
