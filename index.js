const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("config.json");
let spawned = false
const a = mineflayer.createBot({
	host: 'minehut.com',
	username: config.minecraft_email,
	password: config.minecraft_password
});

a.once('spawn', () => {
	console.log('Spawned!');
	if(!spawned && config.server !== null) {
		spawned = true
		a.chat(`/join ${config.server}`);
	}
});

a.on('message', (msg) => {
	console.log(msg.toString());
	if(msg.toString() === '') return;
	let message = msg.toString().replace(/(\`)/g, '');
	if(`\`${message}\`` === '``') return;
	bot.channels.cache.get(config.discord_channel_id).send(`\`${message}\``);
});

bot.on('message', (msg) => {
	if(msg.author.id !== config.your_id) return;
	a.chat(msg.content)
});

bot.login(config.bot_token);
