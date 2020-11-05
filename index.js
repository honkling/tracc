const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const fs = require('fs');
const tags = require('./tags.json');
const envy = require('envy');
const env = envy();
const bot = new Discord.Client();
const a = mineflayer.createBot({
	host: env.server,
	username: env.minecraftEmail,
	password: env.minecraftPass
});

console.log(env);

a.once('spawn', () => {
	console.log('Spawned!');
});

a.on('message', (msg) => {
	console.log(msg.toString());
	let message = msg.toString().replace(/(\`)/g, '');
	if(msg.toString() === '' || `\`${message}\`` === '``') return;
	bot.channels.cache.get(env.discordChannel).send(`\`${message}\``);
});

bot.on('message', (msg) => {
	if(msg.author.id !== env.yourId) return;
	if(msg.channel.id === env.discordChannel) {
		if(!msg.content.startsWith('!')) {
            a.chat(msg.content);
        } else {
            for(const i of tags.list) {
                if(msg.content.startsWith('!' + i)) return a.chat(tags[i]);
            }
        }
	} else if(msg.content.startsWith('!')) {
		let args = msg.content.split(' ');
		let cmd = args[0].substr(1);
		args.shift();
		// This'll be the minimal thing for commands, I guess. Cant be bothered with a command handler rn.
		switch (cmd) {
			case 'tag':
				switch (args[0]) {
					case 'set':
						if(!tags.list.includes(args[1])) tags.list.push(args[1]);
						tags[args[1]] = args.slice(2).join(" ");
						msg.channel.send('Successfully updated tag `' + args[1] + '`!');
						fs.writeFileSync('./tags.json', JSON.stringify(tags));
						break;
					case 'delete':
						if(!tags.list.includes(args[1])) return msg.channel.send('That tag doesn\'t exist!');
                        tags.list.splice(tags.list.indexOf(args[1]), 1);
                        delete tags[args[1]];
                        fs.writeFileSync('./tags.json', JSON.stringify(tags));
                        msg.channel.send('Successfully deleted tag `' + args[1] + '`!');
						break;
					case 'list':
						msg.channel.send(`Showing ${tags.list.length} tags:\n\n\`${tags.list.join("\`, \`")}\``);
						break;
					default:
						msg.channel.send('Invalid command!');
						break;
				}
				break;
			default:
				msg.channel.send('Invalid command!');
				break;
		}
	}
});

bot.login(env.botToken);
