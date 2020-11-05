const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const fs = require('fs');
const tags = require('./tags.json');
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
	let message = msg.toString().replace(/(\`)/g, '');
	if(msg.toString() === '' || `\`${message}\`` === '``') return;
	bot.channels.cache.get(process.env.DISCORD_CHANNEL).send(`\`${message}\``);
});

bot.on('message', (msg) => {
	if(msg.author.id !== process.env.YOUR_ID) return;
	if(msg.channel.id === process.env.DISCORD_CHANNEL) {
		a.chat(msg.content);
	} else if(msg.content.startsWith('!')) {
		let args = msg.content.split(' ');
		let cmd = args[0].substr(1);
		args.shift();
		// This'll be the minimal thing for commands, I guess. Cant be bothered with a command handler rn.
		switch (cmd) {
			case 'tag':
				switch (args[0]) {
					case 'set':
						if(!tags.list.includes(args[1])) tags.list.push(args[1]];
						tags[args[1]] = args.slice(1).join(" ");
						message.channel.send('Successfully updated tag `' + args[1] + '`!');
						fs.writeFileSync('./tags.json', JSON.stringify(tags));
						break;
					case 'delete':
						if(!tags.list.includes(args[1])) return message.channel.send('That tag doesn\'t exist!');
						tags.list.splice(tags.list.indexOf(args[1]), 1);
						fs.writeFileSync('./tags.json', JSON.stringify(tags));
						break;
					case 'list':
						message.channel.send(`Showing ${tags.list.length} tags:\n\n\`${tags.list.join("\`, \`")}\``);
						break;
					except:
						message.channel.send('Invalid command!');
						break;
				}
				break;
			except:
				message.channel.send('Invalid command!');
				break;
		}
	}
});

bot.login(process.env.BOT_TOKEN);
