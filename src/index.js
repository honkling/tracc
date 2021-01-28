const Terminal = require('terminal-duplex');
const ClientManager = require('./ClientManager');
const fs = require('fs');
const path = require('path');
const tags = require('./tags.json');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
let client = new ClientManager({
    host: process.env.SERVER,
    username: process.env.MINECRAFT_EMAIL,
    password: process.env.MINECRAFT_PASS,
	version: process.env.VERSION,
});
const terminal = new Terminal(true);
let exists;

const write = content => fs.writeFileSync("./tags.json", content);

const listener = input => {
	if(input.startsWith(process.env.PREFIX)) {
		const args = input.split(" ");
		const cmd = args[0].substr(process.env.PREFIX.length);
		args.shift();
		switch (cmd) {
			case 'tag':
				if(!args[1] && args[0] === ('set'||'source'||'delete')) console.log(`[CMD] Please specify a tag.`);
				switch (args[0]) {
					case 'set':
						if(!args[2]) console.log(`[CMD] Please specify a content.`);
						exists = tags.list.includes(args[1]);
						if(!exists) tags.list.push(args[1]);
						tags.tags[args[1]] = args.slice(2).join(' ');
						write(JSON.stringify(tags));
						console.log(`[CMD] Successfully set content of '${args[1]}'.`);
						return;
					case 'source':
						exists = tags.list.includes(args[1]);
						if(!exists) return console.log(`[CMD] Tag '${args[1]}' does not exist!`);
						const content = tags.tags[args[1]];
						console.log(`[CMD] ${content.replace(/\\n/g, "\n[CMD] ")}`);
						return;
					case 'delete':
						exists = tags.list.includes(args[1]);
						if(!exists) return console.log(`[CMD] Tag '${args[1]}' does not exist!`);
						delete tags.tags[args[1]];
						write(JSON.stringify(tags));
						console.log(`[CMD] Successfully deleted '${args[1]}'.`);
						return;
					default:
						console.log(`[CMD] Invalid subcommand '${args[0]}' for 'tag' command. Subcommands: set, source, delete`);
						return;
				}
			case 'tags':
				console.log(`[CMD] List of tags:\n[CMD] ${tags.list.join(', ')}`);
				return;
			case 'join':
				if(client.connectedToMCServer) return console.log(`[CMD] Bot is still connected to a server, please leave it first.`);
				if(!args[0]) return console.log(`[CMD] Please specify a server to join.`);
				client = new ClientManager({
            		host: args[0],
            		username: process.env.MINECRAFT_EMAIL,
					password: process.env.MINECRAFT_PASS,
				});
				return;
			case 'leave':
				if(!client.connectedToMCServer) return console.log(`[CMD] Bot isn't connected to a server!`);
				client.quit();
				client.connectedToMCServer = false;
				return;
			case 'switch':
				if(!args[0]) return console.log(`[CMD] Please specify a server to join.`);
				client = new ClientManager({
            		host: args[0],
            		username: process.env.MINECRAFT_EMAIL,
					password: process.env.MINECRAFT_PASS,
				});
				return;
			case 'exit':
				client.quit();
				process.exit();
				return;
			default:
				exists = tags.list.includes(cmd);
				if(!exists) client.chat(input);
				else client.chat(tags.tags[cmd]);
		}
	} else {
		client.chat(input);
	}
}

terminal.listen(listener);