const mineflayer = require('mineflayer');
const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '../.env') });

let client = mineflayer.createBot({
	host: process.env.SERVER,
	username: process.env.EMAIL,
	password: process.env.PASSWORD,
});
const ws = new require('socket.io')(8080, { origins: ["http://localhost:*","http://127.0.0.1:*"], path: "/" });

const conns = [];

const emitGlobally = (event, data) => conns.forEach(c => c.emit(event, data));

ws.on('connection', (conn) => {
	conns.push(conn);

	conn.on('disconnect', () => {
		conns.splice(1, conns.indexOf(conn));
	});
});

const events = (bot) => {
	bot.on('spawn', () => {
		console.log('Bot spawned!');
	});

	bot.on('message', (msg) => {
		console.log(msg.toString());
		emitGlobally("message", msg);
		const stripped = msg.toString();
		if(stripped.startsWith('[AD]')) {
			let replaced = stripped.replace('[AD]', '');
			const rank = (replaced.match(/\[[A-Z]{3,8}\]/) || ['default'])[0].replace(/(\[|\])/g, '').toLowerCase();
			const username = replaced.replace(/\[[A-Z]{3,8}\]\ /, '').replace(/\:/, '').split(' ')[0].replace(/\:/, '');
			replaced = replaced.replace(/^(.*?)\:\ \/join\ /g, '');
			const server = replaced.split(' ')[0];
			const message = replaced.split(' ').slice(1).join(' ');
			emitGlobally("ad", { rank, username, server, message });
		} else if(stripped.startsWith('The lobby you are in is shutting down for an automatic restart! Prepare to be kicked.')) {
			bot.chat(`/find ${bot.username}`);
		} else if(stripped.replace(/^(.*?)\ /g, '').startsWith(bot.username) && !stripped.startsWith('[AD]')) {
			emitGlobally("restart", parseInt(stripped.replace(/^(.*?)\ \[Lobby\ /g, '').replace(/\]/g, '')));
		}
	});

	bot.on('chat', (username, message, translate, msg) => {
		if(!msg.toString().startsWith('[AD]'))
			emitGlobally("chat", { username, message, raw: msg });
	});

	bot.on('kicked', (reason) => {
		console.log(`Bot was kicked: ${JSON.parse(reason).text}\nRejoining in 10 seconds.`);
		setTimeout(() => {
			client = mineflayer.createBot({
				host: process.env.SERVER,
				username: process.env.EMAIL,
				password: process.env.PASSWORD,
			});
			events(client);
		}, 10000);
	});
}

events(client);
