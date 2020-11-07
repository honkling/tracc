const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const tags = require('./tags.json');
let envpath = '';
let current = path.resolve();
// kinda weird solution, it'll do though.
while(envpath === '' || current === '/') {
	let files = fs.readdirSync(current);
	if(files.includes('.env')) {
		envpath = current + '/.env';
	} else {
		current = path.resolve('..');
	}
}
if(envpath === '') throw new Error('Couldn\'t locate a .env file!');
require('dotenv').config({"path":envpath});
const bot = new Discord.Client();
const client = mineflayer.createBot({
	host: process.env.SERVER,
	username: process.env.MINECRAFT_EMAIL,
	password: process.env.MINECRAFT_PASS
});

client.once('spawn', () => {
    console.log('Minecraft bot spawned!');
});

bot.on('ready', () => {
    console.log('Discord bot ready!');
    if(!tags.managers.includes(process.env.YOUR_ID)) {
        tags.managers.push(process.env.YOUR_ID);
        fs.writeFileSync('./tags.json', JSON.stringify(tags));
    }
});

client.on('message', (msg) => {
	console.log(msg.toString());
	let message = msg.toString().replace(/(\`)/g, '');
	if(msg.toString() === '' || `\`${message}\`` === '``') return;
	bot.channels.cache.get(process.env.DISCORD_CHANNEL).send(`\`${message}\``);
});

bot.on('message', (msg) => {
	if(msg.channel.id === process.env.DISCORD_CHANNEL) {
		if(msg.author.id !== process.env.YOUR_ID) return;
		if(!msg.content.startsWith('!')) {
        	client.chat(msg.content);
        } else {
        	for(const i of tags.list) {
                if(msg.content === '!' + i) return client.chat(tags.tags[i]);
            }
		}
	} else if(msg.content.startsWith('!')) {
        if(!tags.managers.includes(msg.author.id)) return;
		let args = msg.content.split(' ');
		let cmd = args[0].substr(1);
		args.shift();
		// This'll be the minimal thing for commands, I guess. Cant be bothered with a command handler rn.
		switch (cmd) {
			case 'tag':
				switch (args[0]) {
					case 'set':
						if(!tags.list.includes(args[1])) tags.list.push(args[1]);
						tags.tags[args[1]] = args.slice(2).join(" ");
						msg.channel.send('Successfully updated tag `' + args[1] + '`!');
						fs.writeFileSync('./tags.json', JSON.stringify(tags));
						break;
					case 'delete':
						if(!tags.list.includes(args[1])) return msg.channel.send('That tag doesn\'t exist!');
                        tags.list.splice(tags.list.indexOf(args[1]), 1);
                        delete tags.tags[args[1]];
                        fs.writeFileSync('./tags.json', JSON.stringify(tags));
                        msg.channel.send('Successfully deleted tag `' + args[1] + '`!');
						break;
					case 'list':
						msg.channel.send(`Showing ${tags.list.length} tags:\n\n\`${tags.list.join("\`, \`")}\``);
						break;
					case 'source':
						if(!tags.list.includes(args[1])) return msg.channel.send('That tag doesn\'t exist!');
						msg.channel.send('```\n' + tags.tags[args[1]] + '\n```');
						break;
					case 'manager':
                        if(msg.author.id !== process.env.YOUR_ID) return;
                        let member = bot.users.cache.get(args[2].replace(/[^0-9]/g, ''));
						switch (args[1]) {
							case 'add':
								if(!member) return msg.channel.send('Couldn\'t find that user!');
								tags.managers.push(member.id);
								fs.writeFileSync('./tags.json', JSON.stringify(tags));
								msg.channel.send('Successfully added ' + member.tag + ' to the list of managers!');
								break;
							case 'del':
								if(!member) return msg.channel.send('Couldn\'t find that user!');
                                if(!tags.managers.includes(member.id)) return msg.channel.send('That user isn\'t a manager!');
                                tags.managers.splice(tags.managers.indexOf(member.id), 1);
                                fs.writeFileSync('./tags.json', JSON.stringify(tags));
								msg.channel.send('Successfully removed ' + member.tag + ' from the list of managers!');
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
				break;
			default:
				msg.channel.send('Invalid command!');
				break;
		}
	}
});

bot.login(process.env.BOT_TOKEN);
