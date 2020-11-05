const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const bot = new Discord.Client();
const a = mineflayer.createBot({
	host: process.env.SERVER,
	username: process.env.MINECRAFT_EMAIL,
	password: process.env.MINECRAFT_PASS
});

a.once('spawn', () => {
	console.log('Spawned!');
});

a.on('message', (msg) => {
	console.log(msg.toString());
	if(msg.toString() === '') return;
	let message = msg.toString().replace(/(\`)/g, '');
	if(`\`${message}\`` === '``') return;
	bot.channels.cache.get(process.env.DISCORD_CHANNEL).send(`\`${message}\``);
});

bot.on('message', (msg) => {
	if(msg.author.id !== process.env.YOUR_ID) return;
	a.chat(msg.content)
});

bot.login(process.env.BOT_TOKEN);
